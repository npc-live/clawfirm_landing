import type { D1Database, Queue, KVNamespace } from "@cloudflare/workers-types";

export interface GenerateWhipMessage {
  jobId: string;
  savedKey: string;
  maxTokens: number;
  description: string;
}

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    JWT_SECRET: string;
    SOLANA_PAY_TO: string;
    PAYAI_KEY_ID: string;
    PAYAI_KEY_SECRET: string;
    WHIPS: KVNamespace;
    WORKER_SECRET: string;
    WHIP_QUEUE?: Queue<GenerateWhipMessage>;
  }
}

export {};
