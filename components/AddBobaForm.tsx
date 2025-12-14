'use client';

import { useState, useEffect } from 'react';
import { saveEntry, updateEntry } from '@/utils/storage';
import { BobaEntry } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import BobaCupIcon from './BobaCupIcon';
import RatingStarIcon from './RatingStarIcon';

interface AddBobaFormProps {
  entry?: BobaEntry | null;
  onClose: () => void;
  onSave: () => void;
}

const COMMON_TOPPINGS = [
  'Tapioca Pearls',
  'Pudding',
  'Lychee Jelly',
  'Grass Jelly',
  'Coconut Jelly',
  'Aloe Vera',
  'Red Bean',
  'Taro Balls',
  'Mango Popping Pearls',
  'Strawberry Popping Pearls',
  'None',
  'Other',
];

export default function AddBobaForm({ entry, onClose, onSave }: AddBobaFormProps) {
  const { user } = useAuth();
  const isEditMode = !!entry;
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    shop: '',
    drink: '',
    sweetnessLevel: 50,
    toppings: [] as string[],
    otherTopping: '',
    price: '',
    rating: 5,
    notes: '',
  });

  useEffect(() => {
    if (entry) {
      // Check if any toppings are not in COMMON_TOPPINGS (they're custom "Other" toppings)
      const commonToppings = entry.toppings.filter(t => COMMON_TOPPINGS.includes(t));
      const customToppings = entry.toppings.filter(t => !COMMON_TOPPINGS.includes(t));
      
      // If "None" is in common toppings, just use that
      const hasNone = commonToppings.includes('None');
      const toppings = hasNone 
        ? ['None']
        : customToppings.length > 0 
        ? [...commonToppings, 'Other']
        : commonToppings;
      
      setFormData({
        date: new Date(entry.date).toISOString().split('T')[0],
        shop: entry.shop,
        drink: entry.drink,
        sweetnessLevel: entry.sweetnessLevel,
        toppings: toppings,
        otherTopping: hasNone ? '' : customToppings.join(', '),
        price: entry.price.toString(),
        rating: entry.rating,
        notes: entry.notes || '',
      });
    } else {
      // Reset form when no entry (switching from edit to add mode)
      setFormData({
        date: new Date().toISOString().split('T')[0],
        shop: '',
        drink: '',
        sweetnessLevel: 50,
        toppings: [],
        otherTopping: '',
        price: '',
        rating: 5,
        notes: '',
      });
    }
  }, [entry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process toppings - if "None" is selected, only use that
    let finalToppings: string[];
    if (formData.toppings.includes('None')) {
      finalToppings = ['None'];
    } else {
      // If "Other" is selected, add the custom topping text
      finalToppings = formData.toppings.filter(t => t !== 'Other');
      if (formData.toppings.includes('Other') && formData.otherTopping.trim()) {
        // Handle multiple custom toppings separated by commas
        const customToppings = formData.otherTopping.split(',').map(t => t.trim()).filter(t => t);
        finalToppings.push(...customToppings);
      }
    }
    
    const entryData: Omit<BobaEntry, 'id'> = {
      date: new Date(formData.date).toISOString(),
      shop: formData.shop.trim(),
      drink: formData.drink.trim(),
      sweetnessLevel: formData.sweetnessLevel,
      toppings: finalToppings,
      price: parseFloat(formData.price),
      rating: formData.rating,
      notes: formData.notes.trim() || undefined,
    };

    if (!user) {
      alert('You must be logged in to save entries.');
      return;
    }

    try {
      if (isEditMode && entry) {
        await updateEntry(user, entry.id, entryData);
      } else {
        await saveEntry(user, entryData);
      }
      
      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to save entry:', error);
      alert('Failed to save entry. Please try again.');
    }
  };

  const toggleTopping = (topping: string) => {
    setFormData(prev => {
      const wasSelected = prev.toppings.includes(topping);
      let newToppings: string[];
      
      if (topping === 'None') {
        // If "None" is being selected, clear all other toppings
        // If "None" is being deselected, just remove it
        newToppings = wasSelected 
          ? prev.toppings.filter(t => t !== 'None')
          : ['None'];
      } else if (wasSelected) {
        // Removing a topping
        newToppings = prev.toppings.filter(t => t !== topping);
      } else {
        // Adding a topping - remove "None" if it exists
        newToppings = [...prev.toppings.filter(t => t !== 'None'), topping];
      }
      
      // Clear otherTopping if "Other" is being deselected
      const shouldClearOther = topping === 'Other' && wasSelected;
      
      // Clear otherTopping if "None" is being selected
      const shouldClearOtherForNone = topping === 'None' && !wasSelected;
      
      return {
        ...prev,
        toppings: newToppings,
        otherTopping: (shouldClearOther || shouldClearOtherForNone) ? '' : prev.otherTopping,
      };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Notebook Container */}
      <div className="bg-boba-cream rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] relative flex overflow-hidden">
        {/* Pink Binding - No spiral holes */}
        <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-boba-pink to-boba-rose border-r-2 border-boba-rose z-10">
        </div>

        <div className="ml-12 pr-6 pl-8 py-6 flex-1 overflow-y-auto">
          <div className="flex justify-center items-center mb-6 relative">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-boba-dark">
                {isEditMode ? 'Edit Boba Entry' : 'Add Boba Entry'}
              </h2>
              <BobaCupIcon size={28} />
            </div>
            <button
              onClick={onClose}
              className="absolute right-0 text-boba-dark hover:text-boba-rose text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-boba-dark mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border-2 border-boba-pink focus:border-boba-rose focus:outline-none bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-boba-dark mb-1">
                Shop *
              </label>
              <input
                type="text"
                value={formData.shop}
                onChange={(e) => setFormData({ ...formData, shop: e.target.value })}
                placeholder="e.g., Sharetea, Gong Cha, Boba Guys"
                className="w-full px-4 py-2 rounded-xl border-2 border-boba-pink focus:border-boba-rose focus:outline-none bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-boba-dark mb-1">
                Drink *
              </label>
              <input
                type="text"
                value={formData.drink}
                onChange={(e) => setFormData({ ...formData, drink: e.target.value })}
                placeholder="e.g., Brown Sugar Milk Tea"
                className="w-full px-4 py-2 rounded-xl border-2 border-boba-pink focus:border-boba-rose focus:outline-none bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-boba-dark mb-1">
                Sweetness Level: {formData.sweetnessLevel}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.sweetnessLevel}
                onChange={(e) => setFormData({ ...formData, sweetnessLevel: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-boba-dark mb-2">
                Toppings
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {COMMON_TOPPINGS.map((topping) => (
                  <button
                    key={topping}
                    type="button"
                    onClick={() => toggleTopping(topping)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      formData.toppings.includes(topping)
                        ? 'bg-boba-rose text-white'
                        : 'bg-boba-pink text-boba-dark hover:bg-boba-rose hover:text-white'
                    }`}
                  >
                    {topping}
                  </button>
                ))}
              </div>
              {formData.toppings.includes('Other') && (
                <input
                  type="text"
                  value={formData.otherTopping}
                  onChange={(e) => setFormData({ ...formData, otherTopping: e.target.value })}
                  placeholder="Enter custom topping..."
                  className="w-full px-4 py-2 rounded-xl border-2 border-boba-pink focus:border-boba-rose focus:outline-none bg-white mt-2"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-boba-dark mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., 6.50"
                className="w-full px-4 py-2 rounded-xl border-2 border-boba-pink focus:border-boba-rose focus:outline-none bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-boba-dark mb-1">
                <div className="flex items-center gap-2">
                  <span>Rating: {formData.rating}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <RatingStarIcon key={i} filled={i < formData.rating} size={18} />
                    ))}
                  </div>
                </div>
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-boba-dark mb-1">
                Notes (optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g., Got it at Valley Fair during finals meltdown"
                className="w-full px-4 py-2 rounded-xl border-2 border-boba-pink focus:border-boba-rose focus:outline-none bg-white resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-boba-rose text-white font-medium hover:bg-boba-dark transition-colors shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  {isEditMode ? 'Save Changes' : 'Add Entry'}
                  <BobaCupIcon size={20} />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

