/*
  # Fix user creation and profile management

  1. Functions
    - Update handle_new_user function to handle errors gracefully
    - Add function to create user profile safely
  
  2. Security
    - Ensure RLS policies work correctly
    - Handle edge cases in user creation
*/

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS handle_new_user();

-- Create improved user creation function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert new user profile with error handling
  INSERT INTO public.users (id, email, plan, questions_used, questions_limit)
  VALUES (
    NEW.id,
    NEW.email,
    'gratuit',
    0,
    15
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the auth process
    RAISE WARNING 'Error creating user profile: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Add function to manually create user profile if needed
CREATE OR REPLACE FUNCTION create_user_profile(user_id UUID, user_email TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.users (id, email, plan, questions_used, questions_limit)
  VALUES (user_id, user_email, 'gratuit', 0, 15)
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.users TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_profile TO authenticated;