import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// POST /api/worker/poll
// Called by local worker to claim a pending job.
// Auth: Authorization: Bearer <WORKER_SECRET>
// Returns: { job } or { job: null } when queue is empty

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();

  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${env.WORKER_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Claim the oldest pending job atomically via D1
  const job = await env.DB.prepare(
    `UPDATE whip_jobs
     SET status = 'running', claimed_at = datetime('now')
     WHERE id = (
       SELECT id FROM whip_jobs WHERE status = 'pending' ORDER BY created_at ASC LIMIT 1
     )
     RETURNING id, saved_key, max_tokens, description, extra_files`
  ).first<{
    id: string;
    saved_key: string;
    max_tokens: number;
    description: string;
    extra_files: string | null;
  }>();

  if (!job) {
    return NextResponse.json({ job: null });
  }

  return NextResponse.json({
    job: {
      jobId: job.id,
      savedKey: job.saved_key,
      maxTokens: job.max_tokens,
      description: job.description,
      extraFiles: job.extra_files ? JSON.parse(job.extra_files) : undefined,
    },
  });
}
