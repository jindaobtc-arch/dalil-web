import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { ChatInterface } from './components/Chat/ChatInterface';
import { PricingCards } from './components/Subscription/PricingCards';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { AuthModal } from './components/Auth/AuthModal';
import { supabase, signIn, signUp, signOut } from './lib/supabase';
import type { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        
        // Essayer de créer le profil utilisateur s'il n'existe pas
        const { data: { user } } = await supabase.auth.getUser();
        if (user && error.code === 'PGRST116') { // Pas de ligne trouvée
          const { error: createError } = await supabase.rpc('ensure_user_profile', {
            user_id: user.id,
            user_email: user.email || ''
          });
          
          if (!createError) {
            // Réessayer de récupérer le profil
            setTimeout(() => fetchUserProfile(userId), 1000);
          } else {
            console.error('Erreur lors de la création du profil:', createError);
          }
        }
        return;
      }

      if (data) {
        setUser({
          id: data.id,
          email: data.email,
          plan: data.plan,
          questionsUsed: data.questions_used,
          questionsLimit: data.questions_limit,
          createdAt: data.created_at
        });
      }
    } catch (err) {
      console.error('Error in fetchUserProfile:', err);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    if (error) throw error;
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const { data, error } = await signUp(email, password);
      if (error) {
        console.error('Signup error:', error);
        throw error;
      }
      
      // Si l'inscription réussit, essayer de récupérer le profil utilisateur
      if (data.user) {
        // Attendre un peu pour que le trigger de création de profil s'exécute
        setTimeout(() => {
          fetchUserProfile(data.user!.id);
        }, 1000);
      }
    } catch (error) {
      console.error('Error in handleSignUp:', error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setCurrentPage('chat');
  };

  const handleSubscribe = (plan: 'pro' | 'supporter') => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    
    // Simulate subscription - in real app, integrate with Stripe
    alert(`Redirection vers le paiement pour le plan ${plan}...`);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'chat':
        return <ChatInterface user={user} onAuthModalOpen={() => setAuthModalOpen(true)} />;
      case 'search':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Recherche</h2>
              <p className="text-gray-600">Fonctionnalité de recherche en développement</p>
            </div>
          </div>
        );
      case 'bookmarks':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Favoris</h2>
              <p className="text-gray-600">Vos questions favorites apparaîtront ici</p>
            </div>
          </div>
        );
      case 'subscription':
        return (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Choisissez votre plan</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Dalil propose différents plans pour répondre aux besoins de chaque musulman. 
                  Toutes nos réponses sont basées sur le Coran et la Sunnah authentique.
                </p>
              </div>
              <PricingCards 
                onSubscribe={handleSubscribe}
                currentPlan={user?.plan}
              />
            </div>
          </div>
        );
      case 'admin':
        return user?.email === 'admin' ? <AdminDashboard /> : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Accès non autorisé</p>
          </div>
        );
      default:
        return <ChatInterface user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-sm font-bold">د</span>
          </div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onSignOut={handleSignOut}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onAuthModalOpen={() => setAuthModalOpen(true)}
      />
      
      <div className="flex pt-16">
        <Sidebar 
          isOpen={sidebarOpen}
          user={user}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            setSidebarOpen(false);
          }}
        />
        
        <main className="flex-1 lg:ml-64">
          <div className="h-screen-minus-header">
            {renderCurrentPage()}
          </div>
        </main>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />

      {/* Click outside to close sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;