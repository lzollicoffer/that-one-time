-- ============================================================================
-- That One Time — Full Database Schema
-- ============================================================================

-- 1. Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT '',
  avatar_url text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'editor', 'admin')),
  subscription_tier text NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro')),
  onboarding_complete boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Timelines
CREATE TABLE IF NOT EXISTS timelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  slug text UNIQUE NOT NULL,
  introduction text,
  scope_note text,
  time_span_start text NOT NULL DEFAULT '',
  time_span_end text NOT NULL DEFAULT '',
  time_span_start_sort integer NOT NULL DEFAULT 0,
  time_span_end_sort integer NOT NULL DEFAULT 0,
  cover_image_url text,
  cover_image_focal_x real DEFAULT 0.5,
  cover_image_focal_y real DEFAULT 0.5,
  browse_description text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'unlisted', 'archived')),
  tier text NOT NULL DEFAULT 'flagship',
  creator_id uuid REFERENCES profiles(id),
  perspective_epistemological text,
  perspective_geographic text,
  contributor_credits text,
  event_count integer NOT NULL DEFAULT 0,
  bg_color text DEFAULT '#0F0F0F',
  bg_image_url text,
  bg_image_opacity real DEFAULT 0.3,
  accent_color text DEFAULT '#7D1F01',
  header_style text DEFAULT 'light_on_dark',
  header_gradient text,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_timelines_status ON timelines(status);
CREATE INDEX IF NOT EXISTS idx_timelines_slug ON timelines(slug);

-- 3. Timeline Tags
CREATE TABLE IF NOT EXISTS timeline_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timeline_id uuid NOT NULL REFERENCES timelines(id) ON DELETE CASCADE,
  tag_value text NOT NULL CHECK (tag_value IN ('tragic', 'inspiring', 'chill', 'recent')),
  UNIQUE(timeline_id, tag_value)
);

CREATE INDEX IF NOT EXISTS idx_timeline_tags_timeline ON timeline_tags(timeline_id);

-- 4. Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timeline_id uuid NOT NULL REFERENCES timelines(id) ON DELETE CASCADE,
  event_type text NOT NULL DEFAULT 'specific' CHECK (event_type IN ('broad', 'specific')),
  title text NOT NULL,
  preview_text text,
  date_display text NOT NULL,
  date_sort integer NOT NULL DEFAULT 0,
  date_precision text DEFAULT 'year',
  date_range_end_display text,
  date_range_end_sort integer,
  era_label text,
  preview_image_url text,
  preview_image_desaturated boolean DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_timeline ON events(timeline_id);
CREATE INDEX IF NOT EXISTS idx_events_sort ON events(timeline_id, sort_order);

-- 5. Event Bullets
CREATE TABLE IF NOT EXISTS event_bullets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  content text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_event_bullets_event ON event_bullets(event_id, sort_order);

-- 6. Event Images
CREATE TABLE IF NOT EXISTS event_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  context_label text,
  caption text,
  credit text,
  sort_order integer DEFAULT 0
);

-- 7. Entities (global library)
CREATE TABLE IF NOT EXISTS entities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL CHECK (entity_type IN ('book', 'podcast', 'movie')),
  title text NOT NULL,
  creator_name text,
  secondary_creator text,
  year text,
  duration text,
  description text,
  cover_image_url text,
  rating real,
  external_links jsonb DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_entities_type ON entities(entity_type);

-- 8. Timeline Entities (junction)
CREATE TABLE IF NOT EXISTS timeline_entities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timeline_id uuid NOT NULL REFERENCES timelines(id) ON DELETE CASCADE,
  entity_id uuid NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  context_line text NOT NULL DEFAULT '',
  description_line text,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(timeline_id, entity_id)
);

-- 9. Event Entity References (people/places)
CREATE TABLE IF NOT EXISTS event_entity_refs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  entity_type text NOT NULL CHECK (entity_type IN ('person', 'place')),
  name text NOT NULL,
  subtitle text,
  context_line text,
  sort_order integer DEFAULT 0
);

-- 10. Bookmarked Timelines
CREATE TABLE IF NOT EXISTS bookmarked_timelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  timeline_id uuid NOT NULL REFERENCES timelines(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, timeline_id)
);

-- 11. Bookmarked Events
CREATE TABLE IF NOT EXISTS bookmarked_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, event_id)
);

-- 12. Content Flags
CREATE TABLE IF NOT EXISTS content_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  flagged_type text NOT NULL CHECK (flagged_type IN ('timeline', 'event')),
  flagged_id uuid NOT NULL,
  flag_type text NOT NULL,
  note text,
  status text DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'dismissed', 'escalated')),
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 13. Home Sections
CREATE TABLE IF NOT EXISTS home_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS home_section_timelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES home_sections(id) ON DELETE CASCADE,
  timeline_id uuid NOT NULL REFERENCES timelines(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  is_pinned boolean DEFAULT false,
  UNIQUE(section_id, timeline_id)
);

-- ============================================================================
-- Row-Level Security Policies
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_bullets ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_entity_refs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarked_timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarked_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_section_timelines ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update own
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Public read for published timelines and their content
CREATE POLICY "Public read published timelines" ON timelines FOR SELECT USING (status = 'published' OR status = 'unlisted');
CREATE POLICY "Public read timeline tags" ON timeline_tags FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read event bullets" ON event_bullets FOR SELECT USING (true);
CREATE POLICY "Public read event images" ON event_images FOR SELECT USING (true);
CREATE POLICY "Public read entities" ON entities FOR SELECT USING (true);
CREATE POLICY "Public read timeline entities" ON timeline_entities FOR SELECT USING (true);
CREATE POLICY "Public read event refs" ON event_entity_refs FOR SELECT USING (true);
CREATE POLICY "Public read home sections" ON home_sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public read home section timelines" ON home_section_timelines FOR SELECT USING (true);

-- Bookmarks: users CRUD own
CREATE POLICY "Users read own bookmark timelines" ON bookmarked_timelines FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own bookmark timelines" ON bookmarked_timelines FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own bookmark timelines" ON bookmarked_timelines FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users read own bookmark events" ON bookmarked_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own bookmark events" ON bookmarked_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own bookmark events" ON bookmarked_events FOR DELETE USING (auth.uid() = user_id);

-- Flags: users can create own
CREATE POLICY "Users insert own flags" ON content_flags FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin: full access via service role (bypasses RLS automatically)
-- For admin API routes using supabase admin client, RLS is bypassed.
-- For admin using anon key, add admin policies:
CREATE POLICY "Admin full access timelines" ON timelines FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access event_bullets" ON event_bullets FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access event_images" ON event_images FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access entities" ON entities FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access timeline_entities" ON timeline_entities FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access timeline_tags" ON timeline_tags FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access event_entity_refs" ON event_entity_refs FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access content_flags" ON content_flags FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access home_sections" ON home_sections FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access home_section_timelines" ON home_section_timelines FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full access profiles" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
