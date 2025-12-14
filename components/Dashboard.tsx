'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getEntries, deleteEntry } from '@/utils/storage';
import { useAuth } from '@/contexts/AuthContext';
import { calculateAnalytics, Analytics } from '@/utils/analytics';
import { getEncouragementMessage } from '@/utils/messages';
import { BobaEntry } from '@/types';
import { Mode } from '@/types';
import { format } from 'date-fns';
import CupStatCard from './CupStatCard';
import BobaCupIcon from './BobaCupIcon';
import BobaPieChart from './BobaPieChart';
import BobaBarChartWithPearls from './BobaBarChartWithPearls';
import MedalIcon from './MedalIcon';
import StarIcon from './StarIcon';
import MoneyIcon from './MoneyIcon';
import SugarCubeIcon from './SugarCubeIcon';
import CalendarIcon from './CalendarIcon';
import RatingStarIcon from './RatingStarIcon';
import ShopRoofIcon from './ShopRoofIcon';
import MiniShopIcon from './MiniShopIcon';
import JellyIcon from './JellyIcon';

interface DashboardProps {
  mode: Mode;
  onEditEntry?: (entry: BobaEntry) => void;
}

const CHART_COLORS = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#C7BAFF', '#FFBAE7'];

export default function Dashboard({ mode, onEditEntry }: DashboardProps) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<BobaEntry[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  const loadData = async () => {
    if (!user) {
      setEntries([]);
      setAnalytics(calculateAnalytics([]));
      return;
    }

    try {
      const data = await getEntries(user);
      setEntries(data);
      setAnalytics(calculateAnalytics(data));
    } catch (error) {
      console.error('Failed to load entries:', error);
      setEntries([]);
      setAnalytics(calculateAnalytics([]));
    }
  };

  useEffect(() => {
    loadData();
    // Refresh every 2 seconds to check for updates (could be optimized with websockets/events)
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!user) {
      alert('You must be logged in to delete entries.');
      return;
    }

    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry(user, id);
        await loadData();
      } catch (error) {
        console.error('Failed to delete entry:', error);
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <div className="mb-4 animate-bounce-slow flex justify-center">
          <BobaCupIcon size={48} />
        </div>
        <p className="text-boba-dark text-lg">Loading your boba stats...</p>
      </div>
    );
  }

  const message = getEncouragementMessage(analytics, mode);

  return (
    <div className="space-y-6">
      {/* Encouragement Message */}
      <div className={`p-6 rounded-2xl shadow-lg ${
        mode === 'nice' ? 'bg-gradient-to-r from-boba-pink to-boba-cream' : 'bg-gradient-to-r from-rose-200 to-pink-200'
      }`}>
        <p className="text-boba-dark text-lg font-medium text-center">{message}</p>
      </div>

      {/* Stats Grid - Cup Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <CupStatCard
            title="Total Purchases"
            value={analytics.totalPurchases}
            maxValue={Math.max(analytics.totalPurchases, 50)}
            color="#FFB3BA"
            icon={<BobaCupIcon size={20} />}
          />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <CupStatCard
            title="Total Spent"
            value={`$${analytics.totalSpent.toFixed(2)}`}
            maxValue={Math.max(analytics.totalSpent, 200)}
            color="#D4A574"
            icon={<MoneyIcon size={20} />}
          />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <CupStatCard
            title="Avg Sweetness"
            value={`${Math.round(analytics.averageSweetness)}%`}
            maxValue={100}
            color="#FFE5E8"
            icon={<SugarCubeIcon size={20} />}
          />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <CupStatCard
            title="This Week"
            value={analytics.thisWeekCount}
            maxValue={Math.max(analytics.thisWeekCount, 10)}
            color="#C7BAFF"
            icon={<CalendarIcon size={20} />}
          />
        </div>
      </div>

      {/* Top Shops */}
      {analytics.topShops.length > 0 && (
        <div className="relative">
          {/* Roof on top */}
          <div className="-mb-1 w-full">
            <ShopRoofIcon />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 relative">
            <div className="absolute top-4 right-4">
              <MiniShopIcon size={30} />
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-boba-dark">Top 5 Shops</h3>
            </div>
          <div className="space-y-2">
            {analytics.topShops.map((shop, index) => (
              <div key={shop.shop} className="flex items-center justify-between p-3 bg-boba-cream rounded-xl">
                <div className="flex items-center gap-3">
                  {index === 0 ? (
                    <MedalIcon type="gold" size={24} />
                  ) : index === 1 ? (
                    <MedalIcon type="silver" size={24} />
                  ) : index === 2 ? (
                    <MedalIcon type="bronze" size={24} />
                  ) : (
                    <StarIcon size={24} />
                  )}
                  <span className="font-medium text-boba-dark">{shop.shop}</span>
                </div>
                <span className="text-boba-rose font-bold">{shop.count} visits</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Purchases Bar Chart */}
        {analytics.monthlyPurchases.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 relative">
            <div className="absolute top-6 right-6">
              <BobaCupIcon size={40} />
            </div>
            <h3 className="text-xl font-bold text-boba-dark mb-4">Boba Per Month</h3>
            <BobaBarChartWithPearls 
              data={analytics.monthlyPurchases} 
              dataKey="count" 
              color="#FFB3BA" 
            />
          </div>
        )}

        {/* Toppings Pie Chart */}
        {analytics.toppingDistribution.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 relative">
            <div className="absolute top-6 right-6">
              <JellyIcon size={40} />
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-boba-dark">Topping Distribution</h3>
            </div>
            <BobaPieChart data={analytics.toppingDistribution} />
          </div>
        )}
      </div>

      {/* Monthly Spending */}
      {analytics.monthlySpending.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 relative">
          <div className="absolute top-6 right-6">
            <MoneyIcon size={32} />
          </div>
          <h3 className="text-xl font-bold text-boba-dark mb-4">Monthly Spending</h3>
          <BobaBarChartWithPearls 
            data={analytics.monthlySpending} 
            dataKey="amount" 
            color="#D4A574" 
          />
        </div>
      )}

      {/* Recent Entries */}
      {entries.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 relative">
          <div className="absolute top-4 right-4">
            <BobaCupIcon size={30} />
          </div>
          <h3 className="text-xl font-bold text-boba-dark mb-4">Recent Entries</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {entries.slice(-10).reverse().map((entry) => (
              <div key={entry.id} className="p-4 bg-boba-cream rounded-xl border-l-4 border-boba-rose relative group">
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {onEditEntry && (
                    <button
                      onClick={() => onEditEntry(entry)}
                      className="text-boba-dark hover:text-boba-rose text-sm font-medium px-2 py-1 rounded bg-white shadow hover:shadow-md transition-all"
                      title="Edit entry"
                    >
                      ✏️ Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-400 hover:text-red-600 text-lg font-bold"
                    title="Delete entry"
                  >
                    ×
                  </button>
                </div>
                <div className="flex justify-between items-start mb-2 pr-20">
                  <div>
                    <h4 className="font-bold text-boba-dark">{entry.drink}</h4>
                    <p className="text-sm text-gray-600">{entry.shop}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-boba-rose">${entry.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-0.5">
                      {Array.from({ length: entry.rating }).map((_, i) => (
                        <RatingStarIcon key={i} filled={true} size={14} />
                      ))}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-boba-pink rounded-full text-boba-dark">
                    {format(new Date(entry.date), 'MMM d, yyyy')}
                  </span>
                  <span className="text-xs px-2 py-1 bg-boba-pink rounded-full text-boba-dark">
                    {entry.sweetnessLevel}% sweet
                  </span>
                  {entry.toppings.length > 0 && (
                    <span className="text-xs px-2 py-1 bg-boba-pink rounded-full text-boba-dark">
                      {entry.toppings.join(', ')}
                    </span>
                  )}
                </div>
                {entry.notes && (
                  <p className="text-sm text-gray-600 italic">"{entry.notes}"</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


