import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// POST /api/worker/complete
// Called by local worker to write results and mark job done/error.
// Auth: Authorization: Bearer <WORKER_SECRET>
// Body: { jobId, status: "completed"|"error", kvEntries?: {key,value}[], jobMeta: object }
//
// kvEntries: array of KV writes the worker wants to perform:
//   - { key: "job:<jobId>", value: "{...}" }          → job status object
//   - { key: "<jobId>/<filename>", value: "..." }      → generated file content

interface KVEntry {
  key: string;
  value: string;
  expirationTtl?: number;
}

interface CompleteBody {
  jobId: string;
  status: "completed" | "error";
  kvEntries?: KVEntry[];
}

const JOB_TTL = 3600;

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();

  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${env.WORKER_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null) as CompleteBody | null;
  if (!body?.jobId || !body?.status) {
    return NextResponse.json({ error: "missing jobId or status" }, { status: 400 });
  }

  // Write all KV entries (generated files + job status)
  if (body.kvEntries?.length) {
    await Promise.all(
      body.kvEntries.map((entry) =>
        env.WHIPS.put(entry.key, entry.value, {
          expirationTtl: entry.expirationTtl ?? JOB_TTL,
        })
      )
    );
  }

  // Update D1 job status
  await env.DB.prepare(
    "UPDATE whip_jobs SET status = ? WHERE id = ?"
  ).bind(body.status, body.jobId).run();

  return NextResponse.json({ ok: true });
}
