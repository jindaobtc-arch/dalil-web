/*
  # Simplification de la création d'utilisateurs

  1. Fonctions
    - Fonction simplifiée pour créer les profils utilisateurs
    - Gestion d'erreurs améliorée
    - Trigger plus robuste

  2. Sécurité
    - Maintien des politiques RLS
    - Permissions appropriées
*/

-- Supprimer l'ancien trigger s'il existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Supprimer l'ancienne fonction s'il existe
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Créer une fonction simplifiée pour gérer les nouveaux utilisateurs
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insérer le nouveau profil utilisateur
  INSERT INTO public.users (id, email, plan, questions_used, questions_limit)
  VALUES (
    NEW.id,
    NEW.email,
    'gratuit',
    0,
    15
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- En cas d'erreur, logger mais ne pas faire échouer l'authentification
    RAISE WARNING 'Erreur lors de la création du profil utilisateur: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger pour les nouveaux utilisateurs
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour créer manuellement un profil utilisateur si nécessaire
CREATE OR REPLACE FUNCTION public.ensure_user_profile(user_id UUID, user_email TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.users (id, email, plan, questions_used, questions_limit)
  VALUES (user_id, user_email, 'gratuit', 0, 15)
  ON CONFLICT (id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Permettre aux utilisateurs authentifiés d'appeler cette fonction
GRANT EXECUTE ON FUNCTION public.ensure_user_profile(UUID, TEXT) TO authenticated;