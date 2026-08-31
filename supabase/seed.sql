-- Seed Initial Projects
INSERT INTO public.projects (slug, title, description, long_description, tags, github_url, demo_url, image_url, featured)
VALUES
('decentrashare-platform', 'DecentraShare Platform', 'Decentralized content sharing protocol powered by smart contracts and IPFS.', 'Full decentralized Web3 content sharing protocol with tokenized licensing and automated royalties.', ARRAY['Next.js', 'Solidity', 'Tailwind CSS', 'Ethers.js', 'IPFS'], 'https://github.com/dimasprayogo/decentrashare', 'https://decentrashare.demo', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80', true),
('wedding-invitation-cms', 'Digital Wedding CMS & RSVP', 'Elegant digital wedding invitation web platform with real-time guest RSVP tracking.', 'Full-stack application with real-time Supabase database, RLS security, and guestbook moderation.', ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'], 'https://github.com/dimasprayogo/wedding-cms', 'https://wedding-invitation-demo.vercel.app', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', true);

-- Seed Initial Certifications
INSERT INTO public.certifications (title, issuer, issue_date, credential_url, pdf_url)
VALUES
('Meta Full Stack Developer Certificate', 'Coursera / Meta', '2024', 'https://coursera.org/verify/meta-fullstack', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'),
('AWS Certified Developer – Associate', 'Amazon Web Services', '2023', 'https://aws.amazon.com/verification', NULL);
