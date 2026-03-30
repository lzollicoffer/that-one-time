-- Fix infinite recursion: admin policy on profiles references profiles itself.
-- Drop the recursive policy and replace with a non-recursive version.

DROP POLICY IF EXISTS "Admin full access profiles" ON profiles;

-- Admin can read all profiles using auth.jwt() instead of querying profiles table
CREATE POLICY "Admin full access profiles" ON profiles FOR ALL USING (
  (auth.jwt() ->> 'role') = 'service_role'
  OR auth.uid() = id
  OR EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = auth.uid()
    AND (u.raw_user_meta_data ->> 'role') = 'admin'
  )
);

-- Also fix the timelines admin policy to avoid the same issue
-- (other admin policies that check profiles.role can cause recursion too)
-- Replace all admin policies with service_role bypass + direct uid check

DROP POLICY IF EXISTS "Admin full access timelines" ON timelines;
DROP POLICY IF EXISTS "Admin full access events" ON events;
DROP POLICY IF EXISTS "Admin full access event_bullets" ON event_bullets;
DROP POLICY IF EXISTS "Admin full access event_images" ON event_images;
DROP POLICY IF EXISTS "Admin full access entities" ON entities;
DROP POLICY IF EXISTS "Admin full access timeline_entities" ON timeline_entities;
DROP POLICY IF EXISTS "Admin full access timeline_tags" ON timeline_tags;
DROP POLICY IF EXISTS "Admin full access event_entity_refs" ON event_entity_refs;
DROP POLICY IF EXISTS "Admin full access content_flags" ON content_flags;
DROP POLICY IF EXISTS "Admin full access home_sections" ON home_sections;
DROP POLICY IF EXISTS "Admin full access home_section_timelines" ON home_section_timelines;

-- Recreate admin policies using a security definer function to avoid recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE POLICY "Admin full access timelines" ON timelines FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access events" ON events FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access event_bullets" ON event_bullets FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access event_images" ON event_images FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access entities" ON entities FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access timeline_entities" ON timeline_entities FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access timeline_tags" ON timeline_tags FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access event_entity_refs" ON event_entity_refs FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access content_flags" ON content_flags FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access home_sections" ON home_sections FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access home_section_timelines" ON home_section_timelines FOR ALL USING (public.is_admin());
