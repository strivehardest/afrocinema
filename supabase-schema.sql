-- ─────────────────────────────────────────────────────────────────────────────
-- AfroCinema – Nollywood Movies Table (FIXED)
-- Run this in: Supabase Dashboard > SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE nollywood_movies (
  id                  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title               TEXT NOT NULL,
  overview            TEXT NOT NULL DEFAULT '',
  poster_url          TEXT NOT NULL,
  backdrop_url        TEXT,
  release_year        INTEGER NOT NULL,
  rating              NUMERIC(3, 1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 10),
  genres              TEXT[] DEFAULT '{}',
  cast_members        TEXT[] DEFAULT '{}',
  director            TEXT,
  runtime_minutes     INTEGER,
  youtube_url         TEXT,
  netflix_url         TEXT,
  is_free_on_youtube  BOOLEAN DEFAULT FALSE,
  tmdb_id             INTEGER UNIQUE,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER nollywood_movies_updated_at
  BEFORE UPDATE ON nollywood_movies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_nollywood_genres ON nollywood_movies USING GIN (genres);
CREATE INDEX idx_nollywood_release_year ON nollywood_movies (release_year DESC);
CREATE INDEX idx_nollywood_rating ON nollywood_movies (rating DESC);
CREATE INDEX idx_nollywood_title ON nollywood_movies USING GIN (to_tsvector('english', title));

-- Enable Row Level Security (read-only public access)
ALTER TABLE nollywood_movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
  ON nollywood_movies FOR SELECT
  TO anon
  USING (true);

-- ─── Seed: 5 Sample Nollywood Movies ─────────────────────────────────────────
INSERT INTO nollywood_movies
  (title, overview, poster_url, release_year, rating, genres, cast_members, director, runtime_minutes, youtube_url, netflix_url, is_free_on_youtube)
VALUES
  (
    'King of Boys',
    'A powerful businesswoman and socialite with political ambitions must battle dangerous criminals and a treacherous political landscape to hold on to her empire.',
    'https://image.tmdb.org/t/p/w500/3nO3VboeVLVOwIHMkTRIwTrrKQP.jpg',
    2018, 7.8,
    ARRAY['Crime', 'Drama', 'Thriller'],
    ARRAY['Sola Sobowale', 'Reminisce', 'Toni Tones'],
    'Kemi Adetiba', 116,
    NULL, NULL, FALSE
  ),
  (
    'The Wedding Party',
    'When Lagos socialites plan the biggest wedding of the year, family drama and unexpected chaos threaten to derail everything.',
    'https://image.tmdb.org/t/p/w500/qJpP0QJZE1Lcxswchana8opO9uW.jpg',
    2016, 7.2,
    ARRAY['Comedy', 'Romance'],
    ARRAY['Banky W', 'Adesua Etomi', 'Sola Sobowale', 'Ireti Doyle'],
    'Kemi Adetiba', 90,
    NULL, 'https://www.netflix.com/title/80241926', FALSE
  ),
  (
    'Gangs of Lagos',
    'A group of friends from the island of Lagos are forced to navigate the criminal underworld they grew up in as adults.',
    'https://image.tmdb.org/t/p/w500/nGwFsB6EXUCr21wzPgtP5juZPSv.jpg',
    2023, 7.5,
    ARRAY['Action', 'Crime', 'Drama'],
    ARRAY['Tobi Bakre', 'Adesua Etomi', 'Chioma Akpotha'],
    'Jade Osiberu', 112,
    NULL, 'https://www.netflix.com/title/81627402', FALSE
  ),
  (
    'Lionheart',
    'Adaeze is set to take over her father''s transportation business but must first contend with her uncle''s maneuvers and a government official intent on acquiring the company.',
    'https://image.tmdb.org/t/p/w500/ndS2uJ8Sum1qEU0fn5c8tdGAMDe.jpg',
    2018, 6.8,
    ARRAY['Drama', 'Comedy'],
    ARRAY['Genevieve Nnaji', 'Nkem Owoh', 'Pete Edochie'],
    'Genevieve Nnaji', 95,
    NULL, 'https://www.netflix.com/title/81028340', FALSE
  ),
  (
    'Citation',
    'A graduate student takes on a powerful professor who sexually harassed her, risking her academic future in the process.',
    'https://image.tmdb.org/t/p/w500/k8medyObgY0XTt2dL7BqjxXkqmw.jpg',
    2020, 7.1,
    ARRAY['Drama', 'Thriller'],
    ARRAY['Temi Otedola', 'Jimmy Jean-Louis', 'Joke Silva'],
    'Kunle Afolayan', 120,
    NULL, 'https://www.netflix.com/title/81279791', FALSE
  );