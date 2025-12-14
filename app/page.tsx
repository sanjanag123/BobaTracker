'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserData } from '@/utils/storage';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';
import AddBobaForm from '@/components/AddBobaForm';
import Confetti from '@/components/Confetti';
import BobaCupIcon from '@/components/BobaCupIcon';
import HappyFaceIcon from '@/components/HappyFaceIcon';
import SassyFaceIcon from '@/components/SassyFaceIcon';
import { Mode, BobaEntry } from '@/types';

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const loadUserName = async () => {
      if (user) {
        const userData = await getUserData(user);
        setUserName(userData.name || user.email || 'Guest User');
      }
    };
    loadUserName();
  }, [user]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editEntry, setEditEntry] = useState<BobaEntry | null>(null);
  const [mode, setMode] = useState<Mode>('nice');
  const [refreshKey, setRefreshKey] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  const handleSave = () => {
    setRefreshKey(prev => prev + 1);
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 100);
  };

  // Show login page if not authenticated
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-boba-cream">
        <div className="text-center">
          <div className="animate-bounce-slow flex justify-center mb-4">
            <BobaCupIcon size={48} />
          </div>
          <p className="text-boba-dark">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="animate-float">
                <BobaCupIcon size={40} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-boba-dark">Boba Book</h1>
                <p className="text-sm text-gray-600">Your boba journey, tracked</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* User Info / Sign Out */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{userName || 'Guest User'}</span>
                <button
                  onClick={async () => {
                    // Warn guest users that their data won't persist after sign out
                    if (!user.email) {
                      const confirmSignOut = confirm(
                        'Are you sure you want to sign out? As a guest user, your data will not be accessible if you sign in as guest again. Consider creating an account to keep your data safe!'
                      );
                      if (!confirmSignOut) return;
                    }
                    await signOut();
                  }}
                  className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                >
                  Sign Out
                </button>
              </div>
              {/* Mode Toggle */}
              <div className="flex items-center gap-2 bg-boba-cream rounded-full p-1">
                <button
                  onClick={() => setMode('nice')}
                  className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                    mode === 'nice'
                      ? 'bg-boba-rose text-white shadow-md'
                      : 'text-boba-dark hover:text-boba-rose'
                  }`}
                >
                  <HappyFaceIcon size={18} />
                  Nice
                </button>
                <button
                  onClick={() => setMode('sassy')}
                  className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                    mode === 'sassy'
                      ? 'bg-boba-rose text-white shadow-md'
                      : 'text-boba-dark hover:text-boba-rose'
                  }`}
                >
                  <SassyFaceIcon size={18} />
                  Sassy
                </button>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-boba-rose text-white rounded-full font-medium hover:bg-boba-dark transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span className="text-xl">+</span>
                Add Boba
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div key={refreshKey}>
          <Dashboard mode={mode} onEditEntry={(entry) => {
            setShowAddForm(true);
            setEditEntry(entry);
          }} />
        </div>
      </main>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <AddBobaForm
          entry={editEntry}
          onClose={() => {
            setShowAddForm(false);
            setEditEntry(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Confetti Animation */}
      <Confetti trigger={confettiTrigger} />
    </div>
  );
}

