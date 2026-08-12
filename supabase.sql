-- Drop tables if they exist
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS certificates;
DROP TABLE IF EXISTS experience;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS projects;

-- 1. Projects Table
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    image_url TEXT,
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    technologies TEXT[], -- Array of strings (e.g., '["Next.js", "Tailwind"]')
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Skills Table
CREATE TABLE skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level VARCHAR(50), -- e.g., 'Beginner', 'Intermediate', 'Advanced', 'Expert'
    icon VARCHAR(255), -- Emoji or SVG path
    category VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Experience Table
CREATE TABLE experience (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL means 'Present'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Certificates Table
CREATE TABLE certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    issue_date DATE,
    certificate_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Contact Messages Table
CREATE TABLE contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to portfolio data
CREATE POLICY "Public profiles are viewable by everyone." ON projects FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone." ON skills FOR SELECT USING (true);
CREATE POLICY "Public experience is viewable by everyone." ON experience FOR SELECT USING (true);
CREATE POLICY "Public certificates are viewable by everyone." ON certificates FOR SELECT USING (true);

-- Allow public insert for contact messages (so visitors can send messages)
CREATE POLICY "Anyone can insert contact messages." ON contact_messages FOR INSERT WITH CHECK (true);

-- Only authenticated users (admins) can modify the portfolio data or view messages
-- For projects
CREATE POLICY "Admins can insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete projects" ON projects FOR DELETE TO authenticated USING (true);

-- For skills
CREATE POLICY "Admins can insert skills" ON skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update skills" ON skills FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete skills" ON skills FOR DELETE TO authenticated USING (true);

-- For experience
CREATE POLICY "Admins can insert experience" ON experience FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update experience" ON experience FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete experience" ON experience FOR DELETE TO authenticated USING (true);

-- For certificates
CREATE POLICY "Admins can insert certificates" ON certificates FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update certificates" ON certificates FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete certificates" ON certificates FOR DELETE TO authenticated USING (true);

-- For messages (only admin can view)
CREATE POLICY "Admins can view messages" ON contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can update messages" ON contact_messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete messages" ON contact_messages FOR DELETE TO authenticated USING (true);
