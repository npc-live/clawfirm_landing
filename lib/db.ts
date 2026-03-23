import type { D1Database } from "@cloudflare/workers-types";

export interface User {
  id: string;
  email: string;
  hash: string;
  is_unlocked: number;
  unlock_code: string | null;
  unlocked_until: string | null;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  expires_at: string;
  created_at: string;
}

export function getDB(env: { DB: D1Database }): D1Database {
  return env.DB;
}

export async function getUserByEmail(
  db: D1Database,
  email: string
): Promise<User | null> {
  const result = await db
    .prepare("SELECT * FROM users WHERE email = ?")
    .bind(email)
    .first<User>();
  return result ?? null;
}

export async function getUserById(
  db: D1Database,
  id: string
): Promise<User | null> {
  const result = await db
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(id)
    .first<User>();
  return result ?? null;
}

export async function createUser(
  db: D1Database,
  id: string,
  email: string,
  hash: string
): Promise<void> {
  await db
    .prepare("INSERT INTO users (id, email, hash, is_unlocked) VALUES (?, ?, ?, 0)")
    .bind(id, email, hash)
    .run();
}

export async function createSession(
  db: D1Database,
  id: string,
  userId: string,
  expiresAt: string
): Promise<void> {
  await db
    .prepare(
      "INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)"
    )
    .bind(id, userId, expiresAt)
    .run();
}

export async function deleteSessionsByUserId(
  db: D1Database,
  userId: string
): Promise<void> {
  await db
    .prepare("DELETE FROM sessions WHERE user_id = ?")
    .bind(userId)
    .run();
}
