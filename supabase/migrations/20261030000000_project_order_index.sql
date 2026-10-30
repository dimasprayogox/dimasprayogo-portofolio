-- Add order_index column to projects table
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Initialize order_index sequentially based on created_at
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) - 1 AS new_order
  FROM public.projects
)
UPDATE public.projects p
SET order_index = ordered.new_order
FROM ordered
WHERE p.id = ordered.id;
