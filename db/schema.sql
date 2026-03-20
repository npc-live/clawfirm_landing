CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  hash        TEXT NOT NULL,
  is_unlocked   INTEGER NOT NULL DEFAULT 0,
  unlock_code   TEXT,
  unlocked_until TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

CREATE TABLE IF NOT EXISTS whip_jobs (
  id           TEXT PRIMARY KEY,
  saved_key    TEXT NOT NULL,
  max_tokens   INTEGER NOT NULL DEFAULT 16000,
  description  TEXT NOT NULL,
  extra_files  TEXT,           -- JSON array of {key,desc} or NULL (single-file mode)
  status       TEXT NOT NULL DEFAULT 'pending', -- pending | running | completed | error
  claimed_at   TEXT,           -- ISO timestamp when local worker claimed it
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_whip_jobs_status ON whip_jobs(status);
