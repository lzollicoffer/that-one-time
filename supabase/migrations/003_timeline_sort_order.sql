-- Add sort_order column to timelines for admin-controlled ordering on browse page
ALTER TABLE timelines ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_timelines_sort_order ON timelines(sort_order);
