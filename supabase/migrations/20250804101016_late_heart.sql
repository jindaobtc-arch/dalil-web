/*
  # Création de la table des utilisateurs

  1. Nouvelles Tables
    - `users`
      - `id` (uuid, clé primaire, référence auth.users)
      - `email` (text, unique)
      - `plan` (text, valeurs: gratuit, pro, supporter)
      - `questions_used` (integer, nombre de questions utilisées ce mois)
      - `questions_limit` (integer, limite de questions par mois)
      - `subscription_end` (timestamptz, fin d'abonnement)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Sécurité
    - Activer RLS sur la table `users`
    - Politique pour que les utilisateurs puissent lire leurs propres données
    - Politique pour que les utilisateurs puissent mettre à jour leurs propres données
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  plan text NOT NULL DEFAULT 'gratuit' CHECK (plan IN ('gratuit', 'pro', 'supporter')),
  questions_used integer NOT NULL DEFAULT 0,
  questions_limit integer NOT NULL DEFAULT 15,
  subscription_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();