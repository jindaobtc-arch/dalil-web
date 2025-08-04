/*
  # Triggers et fonctions automatiques

  1. Fonctions
    - `handle_new_user()` - Créer un profil utilisateur lors de l'inscription
    - `increment_question_count()` - Incrémenter le compteur de questions

  2. Triggers
    - Trigger sur auth.users pour créer automatiquement le profil
    - Trigger sur chat_messages pour incrémenter le compteur
*/

-- Fonction pour créer automatiquement un profil utilisateur
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO users (id, email, plan, questions_used, questions_limit)
  VALUES (
    NEW.id,
    NEW.email,
    'gratuit',
    0,
    15
  );
  RETURN NEW;
END;
$$;

-- Trigger pour créer le profil automatiquement
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Fonction pour incrémenter le compteur de questions
CREATE OR REPLACE FUNCTION increment_question_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE users 
  SET questions_used = questions_used + 1
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$;

-- Trigger pour incrémenter le compteur lors de l'ajout d'un message
CREATE OR REPLACE TRIGGER on_chat_message_created
  AFTER INSERT ON chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION increment_question_count();