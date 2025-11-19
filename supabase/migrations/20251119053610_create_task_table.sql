/*
  # Create task table for to-do application

  1. New Tables
    - `task`
      - `id` (uuid, primary key) - Unique identifier for each task
      - `title` (text, required) - Title of the task
      - `description` (text, required) - Description of the task
      - `completed` (boolean, default false) - Whether the task is completed
      - `created_at` (timestamptz, default now()) - When the task was created
  
  2. Security
    - Enable RLS on `task` table
    - Add policy for anyone to read incomplete tasks
    - Add policy for anyone to create tasks
    - Add policy for anyone to update tasks to mark as completed
  
  3. Notes
    - Tasks are ordered by created_at descending (most recent first)
    - Only incomplete tasks should be visible in the UI
    - The frontend will limit display to 5 most recent tasks
*/

CREATE TABLE IF NOT EXISTS task (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE task ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view incomplete tasks"
  ON task
  FOR SELECT
  USING (completed = false);

CREATE POLICY "Anyone can create tasks"
  ON task
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can mark tasks as completed"
  ON task
  FOR UPDATE
  USING (true)
  WITH CHECK (true);