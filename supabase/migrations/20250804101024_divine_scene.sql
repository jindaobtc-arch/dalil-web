/*
  # Création de la table des messages de chat

  1. Nouvelles Tables
    - `chat_messages`
      - `id` (uuid, clé primaire)
      - `user_id` (uuid, référence users.id)
      - `question` (text, question posée par l'utilisateur)
      - `response` (text, réponse de Dalil)
      - `bookmarked` (boolean, message mis en favoris)
      - `created_at` (timestamptz)

  2. Sécurité
    - Activer RLS sur la table `chat_messages`
    - Politique pour que les utilisateurs puissent lire leurs propres messages
    - Politique pour que les utilisateurs puissent créer leurs propres messages
    - Politique pour que les utilisateurs puissent mettre à jour leurs propres messages (bookmarks)
*/

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question text NOT NULL,
  response text NOT NULL,
  bookmarked boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own messages"
  ON chat_messages
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Index pour améliorer les performances des requêtes
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_bookmarked ON chat_messages(user_id, bookmarked) WHERE bookmarked = true;