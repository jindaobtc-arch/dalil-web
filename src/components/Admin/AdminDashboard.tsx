import React, { useState } from 'react';
import { Users, MessageCircle, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';

export const AdminDashboard: React.FC = () => {
  const [stats] = useState({
    totalUsers: 1247,
    activeSubscriptions: 89,
    questionsThisMonth: 3456,
    revenue: 267,
    growthRate: 12.5
  });

  const recentUsers = [
    { email: 'user1@example.com', plan: 'pro', joinDate: '2024-01-15' },
    { email: 'user2@example.com', plan: 'gratuit', joinDate: '2024-01-14' },
    { email: 'user3@example.com', plan: 'supporter', joinDate: '2024-01-13' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Administration</h1>
        <p className="text-gray-600">Tableau de bord de gestion de Dalil</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Abonnements actifs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Questions ce mois</p>
                <p className="text-2xl font-bold text-gray-900">{stats.questionsThisMonth}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus (€)</p>
                <p className="text-2xl font-bold text-gray-900">{stats.revenue}€</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Utilisateurs récents</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.email}</p>
                  <p className="text-sm text-gray-600">Inscrit le {new Date(user.joinDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.plan === 'supporter' ? 'bg-amber-100 text-amber-800' :
                    user.plan === 'pro' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.plan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};