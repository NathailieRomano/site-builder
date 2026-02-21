-- builder_projects table for Site Builder
-- Stores website projects per authenticated user

CREATE TABLE IF NOT EXISTS builder_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Meine Website',
  slug TEXT,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  theme JSONB NOT NULL DEFAULT '{}'::jsonb,
  pages JSONB NOT NULL DEFAULT '[]'::jsonb,
  template_id TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Users can only see/edit their own projects
ALTER TABLE builder_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects"
  ON builder_projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects"
  ON builder_projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON builder_projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON builder_projects FOR DELETE
  USING (auth.uid() = user_id);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_builder_projects_user_id ON builder_projects(user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_builder_project_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_builder_project_updated_at
  BEFORE UPDATE ON builder_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_builder_project_timestamp();
