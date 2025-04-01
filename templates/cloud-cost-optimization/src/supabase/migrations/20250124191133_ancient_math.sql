/*
  # Initial Schema Setup for Cloud Cost AI

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `subscription_tier` (text)
    - `cloud_accounts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `provider` (text)
      - `credentials` (jsonb)
      - `created_at` (timestamp)
    - `cost_data`
      - `id` (uuid, primary key)
      - `cloud_account_id` (uuid, foreign key)
      - `date` (date)
      - `amount` (decimal)
      - `resource_id` (text)
      - `resource_type` (text)
      - `region` (text)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  subscription_tier text DEFAULT 'free',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Cloud Accounts Table
CREATE TABLE IF NOT EXISTS cloud_accounts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  provider text NOT NULL,
  credentials jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cloud_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own cloud accounts"
  ON cloud_accounts
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Cost Data Table
CREATE TABLE IF NOT EXISTS cost_data (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  cloud_account_id uuid REFERENCES cloud_accounts(id) ON DELETE CASCADE,
  date date NOT NULL,
  amount decimal NOT NULL,
  resource_id text NOT NULL,
  resource_type text NOT NULL,
  region text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cost_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own cost data"
  ON cost_data
  FOR SELECT
  TO authenticated
   USING (
    EXISTS (
      SELECT 1 FROM cloud_accounts
      WHERE cloud_accounts.id = cost_data.cloud_account_id
      AND cloud_accounts.user_id = auth.uid()
    )
  );