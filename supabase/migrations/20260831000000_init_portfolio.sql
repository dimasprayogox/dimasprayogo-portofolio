-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  tags TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT, -- Project screenshot URL (legacy)
  images TEXT[] DEFAULT '{}', -- Project screenshots array
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certifications Table
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_url TEXT,
  pdf_url TEXT, -- Certificate PDF URL
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience Table
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert on projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on projects" ON public.projects FOR DELETE USING (true);

CREATE POLICY "Allow public read access on certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Allow public insert on certifications" ON public.certifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on certifications" ON public.certifications FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on certifications" ON public.certifications FOR DELETE USING (true);

CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public insert on skills" ON public.skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on skills" ON public.skills FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on skills" ON public.skills FOR DELETE USING (true);

CREATE POLICY "Allow public read access on experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow public insert on experiences" ON public.experiences FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on experiences" ON public.experiences FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on experiences" ON public.experiences FOR DELETE USING (true);

-- Public Insert for Contact Messages
CREATE POLICY "Allow public message insertion" ON public.messages FOR INSERT WITH CHECK (true);

-- Storage Buckets Setup
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Bucket Public Read Policy
CREATE POLICY "Public Read Access for Portfolio Assets" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio-assets');

-- Storage Bucket Authenticated/Public Upload Policy
CREATE POLICY "Upload Access for Portfolio Assets" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'portfolio-assets');
