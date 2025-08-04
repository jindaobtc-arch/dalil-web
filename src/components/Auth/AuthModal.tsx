import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string) => Promise<void>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSignIn,
  onSignUp
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        await onSignIn(email, password);
        onClose();
      } else {
        await onSignUp(email, password);
        // Inscription réussie, fermer la modal
        onClose();
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      
      // Gestion des erreurs spécifiques
      if (err.message?.includes('User already registered') || err.message?.includes('already been registered')) {
        setError('Cet email est déjà utilisé. Essayez de vous connecter.');
      } else if (err.message?.includes('Invalid email') || err.message?.includes('invalid_email')) {
        setError('Adresse email invalide.');
      } else if (err.message?.includes('Password') || err.message?.includes('password')) {
        setError('Le mot de passe doit contenir au moins 6 caractères.');
      } else if (err.message?.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect.');
      } else if (err.message?.includes('Email not confirmed')) {
        setError('Veuillez vérifier votre email pour confirmer votre compte.');
      } else {
        setError(mode === 'signin' ? 'Erreur de connexion. Vérifiez vos identifiants.' : 'Erreur d\'inscription. Vérifiez votre email et mot de passe.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'signin' ? 'Connexion' : 'Inscription'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Chargement...' : mode === 'signin' ? 'Se connecter' : 'S\'inscrire'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-green-600 hover:text-green-700 text-sm"
            >
              {mode === 'signin' 
                ? 'Pas encore de compte ? S\'inscrire' 
                : 'Déjà un compte ? Se connecter'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};