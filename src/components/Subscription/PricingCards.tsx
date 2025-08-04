import React from 'react';
import { Check, Crown, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';

interface PricingCardsProps {
  onSubscribe: (plan: 'pro' | 'supporter') => void;
  currentPlan?: string;
}

export const PricingCards: React.FC<PricingCardsProps> = ({ onSubscribe, currentPlan }) => {
  const plans = [
    {
      id: 'gratuit',
      name: 'Gratuit',
      price: '0€',
      period: '/mois',
      description: 'Pour découvrir Dalil',
      features: [
        '15 questions par mois',
        'Recherche publique',
        'Réponses basées sur le Coran et la Sunnah',
        'Interface claire et respectueuse'
      ],
      color: 'gray',
      icon: Check,
      current: currentPlan === 'gratuit' || !currentPlan
    },
    {
      id: 'pro',
      name: 'Dalil Pro',
      price: '3€',
      period: '/mois',
      yearlyPrice: '30€/an',
      description: 'Pour les musulmans réguliers',
      features: [
        '300 questions par mois',
        'Sauvegarde des favoris',
        'Historique des conversations',
        'Recherche avancée',
        'Support prioritaire'
      ],
      color: 'green',
      icon: Crown,
      popular: true,
      current: currentPlan === 'pro'
    },
    {
      id: 'supporter',
      name: 'Dalil Supporter',
      price: '10€',
      period: '/mois',
      yearlyPrice: '99€/an',
      description: 'Soutenez la Oumma',
      features: [
        'Questions illimitées',
        'Accès aux nouvelles fonctionnalités',
        'Badge de supporter',
        'Contribution au développement',
        'Impact positif sur la communauté'
      ],
      color: 'amber',
      icon: Heart,
      current: currentPlan === 'supporter'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {plans.map((plan) => {
        const Icon = plan.icon;
        const isActive = plan.current;
        
        return (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? 'ring-2 ring-green-500 scale-105' : ''} ${
              isActive ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Populaire
                </span>
              </div>
            )}
            
            {isActive && (
              <div className="absolute -top-3 right-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Actuel
                </span>
              </div>
            )}

            <CardHeader className="text-center">
              <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-4 ${
                plan.color === 'green' ? 'bg-green-100' :
                plan.color === 'amber' ? 'bg-amber-100' : 'bg-gray-100'
              }`}>
                <Icon className={`w-6 h-6 ${
                  plan.color === 'green' ? 'text-green-600' :
                  plan.color === 'amber' ? 'text-amber-600' : 'text-gray-600'
                }`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              {plan.yearlyPrice && (
                <p className="text-sm text-green-600 mt-1">{plan.yearlyPrice}</p>
              )}
              <p className="text-gray-600 mt-2">{plan.description}</p>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              {plan.id === 'gratuit' ? (
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled
                >
                  Plan actuel
                </Button>
              ) : isActive ? (
                <Button 
                  variant="secondary" 
                  className="w-full"
                  disabled
                >
                  Plan actuel
                </Button>
              ) : (
                <Button 
                  className="w-full"
                  onClick={() => onSubscribe(plan.id as 'pro' | 'supporter')}
                  variant={plan.color === 'green' ? 'primary' : 'outline'}
                >
                  {plan.id === 'supporter' ? 'Soutenir' : 'Choisir ce plan'}
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};