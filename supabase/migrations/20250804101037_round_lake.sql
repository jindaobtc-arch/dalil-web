/*
  # Fonctions d'administration

  1. Fonctions
    - `get_user_stats()` - Statistiques globales des utilisateurs
    - `reset_monthly_questions()` - Réinitialiser les compteurs mensuels
    - `update_user_plan()` - Mettre à jour le plan d'un utilisateur

  2. Sécurité
    - Ces fonctions sont accessibles uniquement via service_role
*/

-- Fonction pour obtenir les statistiques globales
CREATE OR REPLACE FUNCTION get_user_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM users),
    'active_subscriptions', (SELECT COUNT(*) FROM subscriptions WHERE status = 'active'),
    'questions_this_month', (SELECT SUM(questions_used) FROM users),
    'users_by_plan', (
      SELECT json_object_agg(plan, count)
      FROM (
        SELECT plan, COUNT(*) as count
        FROM users
        GROUP BY plan
      ) plan_counts
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Fonction pour réinitialiser les compteurs mensuels (à exécuter chaque mois)
CREATE OR REPLACE FUNCTION reset_monthly_questions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE users SET questions_used = 0;
END;
$$;

-- Fonction pour mettre à jour le plan d'un utilisateur
CREATE OR REPLACE FUNCTION update_user_plan(
  target_user_id uuid,
  new_plan text,
  new_limit integer DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE users 
  SET 
    plan = new_plan,
    questions_limit = COALESCE(new_limit, 
      CASE 
        WHEN new_plan = 'gratuit' THEN 15
        WHEN new_plan = 'pro' THEN 300
        WHEN new_plan = 'supporter' THEN 999999
        ELSE questions_limit
      END
    ),
    updated_at = now()
  WHERE id = target_user_id;
END;
$$;