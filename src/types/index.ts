export interface User {
  id: string;
  email: string;
  plan: 'gratuit' | 'pro' | 'supporter';
  questionsUsed: number;
  questionsLimit: number;
  createdAt: string;
  subscriptionEnd?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  question: string;
  response: string;
  timestamp: string;
  bookmarked?: boolean;
}

export interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  city: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'pro' | 'supporter';
  status: 'active' | 'canceled' | 'expired';
  currentPeriodEnd: string;
  stripeSubscriptionId?: string;
}