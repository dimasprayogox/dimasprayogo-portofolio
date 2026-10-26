-- Add images array column to projects table
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Migrate existing single image_url to images array
UPDATE public.projects
SET images = ARRAY[image_url]
WHERE image_url IS NOT NULL 
  AND (images IS NULL OR cardinality(images) = 0);
