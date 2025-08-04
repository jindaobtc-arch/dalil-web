import React from 'react';
import { MessageCircle, BookOpen, Star, Crown, Settings, BarChart3 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  user?: any;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  user,
  currentPage,
  onPageChange
}) => {
  const menuItems = [
    { id: 'chat', label: 'Discussion', icon: MessageCircle },
    { id: 'search', label: 'Recherche', icon: BookOpen },
    { id: 'bookmarks', label: 'Favoris', icon: Star, requiresAuth: true },
    { id: 'subscription', label: 'Abonnement', icon: Crown },
  ];

  if (user?.email === 'admin') {
    menuItems.push({ id: 'admin', label: 'Administration', icon: BarChart3 });
  }

  return (
    <aside className={`fixed top-16 left-0 h-full bg-white border-r border-gray-200 transition-transform duration-300 z-40 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 w-64`}>
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            if (item.requiresAuth && !user) return null;
            
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {user && (
          <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm">
              <p className="font-medium text-green-900">Questions ce mois</p>
              <p className="text-green-700">
                {user.questionsUsed || 0} / {user.questionsLimit || 15}
              </p>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ 
                    width: `${((user.questionsUsed || 0) / (user.questionsLimit || 15)) * 100}%` 
                  }}
                ></div>
              </div>
              {user.questionsUsed >= user.questionsLimit && (
                <p className="text-xs text-red-600 mt-1">
                  Limite atteinte - Upgradez votre plan
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};