/**
 * KV abstraction — Cloudflare KV in production, in-memory in dev/build.
 *
 * The handler writes to KV FIRST in the fail-open sequence
 * (memory/feedback_lead_capture_failopen.md). The lead is durable here
 * even if every downstream service fails.
 *
 * Cloudflare Pages exposes KV namespaces via env bindings. The binding
 * name AUDIT_QUEUE must match what's configured in wrangler.toml /
 * Cloudflare Pages dashboard. We grab it via getRequestContext() at
 * request time when running on Workers.
 */

type KvNamespace = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string, opts?: { expirationTtl?: number }) => Promise<void>;
};

// In-memory fallback for dev / build / non-Cloudflare environments.
// Lives for the lifetime of the process. Lost on restart, which is
// fine for dev — the lead would still be in the founder's inbox.
const memoryStore = new Map<string, { value: string; expiresAt?: number }>();

const memoryKv: KvNamespace = {
  async get(key) {
    const entry = memoryStore.get(key);
    if (!entry) return null;
    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      memoryStore.delete(key);
      return null;
    }
    return entry.value;
  },
  async put(key, value, opts) {
    const expiresAt = opts?.expirationTtl
      ? Date.now() + opts.expirationTtl * 1000
      : undefined;
    memoryStore.set(key, { value, expiresAt });
  },
};

/**
 * Resolves the AUDIT_QUEUE namespace. On Cloudflare Workers (via the
 * @opennextjs/cloudflare adapter) the binding lives on the request env;
 * in dev/build we fall back to the in-memory store so the build never
 * breaks for missing infra.
 *
 * Adapter note: @cloudflare/next-on-pages peer-locks to Next ≤15.5.2 and
 * doesn't support Next 16. @opennextjs/cloudflare is Cloudflare's
 * recommended adapter for Next 14+ — see DEPLOY.md for the build pipeline.
 */
async function getAuditQueue(): Promise<KvNamespace> {
  try {
    const mod = await import("@opennextjs/cloudflare").catch(() => null);
    if (mod && typeof mod.getCloudflareContext === "function") {
      const ctx = mod.getCloudflareContext();
      const env = ctx?.env as { AUDIT_QUEUE?: KvNamespace } | undefined;
      if (env?.AUDIT_QUEUE) return env.AUDIT_QUEUE;
    }
  } catch {
    /* fall through to memory */
  }
  return memoryKv;
}

export type AuditQueueRecord = {
  runId: string;
  queuedAt: string;
  /** Submission payload (validated). */
  submission: Record<string, string>;
  /** Headers worth keeping for forensics. */
  meta: {
    userAgent?: string;
    ip?: string;
    referer?: string;
  };
  /** Status of the wiele-ai integration call — succeeded / failed / stubbed. */
  engineStatus: "stubbed" | "queued" | "failed";
  /** Error message if engineStatus === "failed". */
  engineError?: string;
};

/**
 * Persist an audit submission. Throws only on serialisation issues
 * (which means the payload itself is malformed) — the route handler
 * catches and falls back to log-only.
 */
export async function recordAuditSubmission(record: AuditQueueRecord): Promise<void> {
  const kv = await getAuditQueue();
  const key = `audit:${record.runId}`;
  await kv.put(key, JSON.stringify(record), {
    // 90-day retention is enough for the engine + report cycle.
    expirationTtl: 60 * 60 * 24 * 90,
  });
}

export type ContactQueueRecord = {
  ticketId: string;
  queuedAt: string;
  submission: Record<string, string>;
  meta: { userAgent?: string; ip?: string; referer?: string };
};

export async function recordContactSubmission(
  record: ContactQueueRecord,
): Promise<void> {
  const kv = await getAuditQueue();
  await kv.put(`contact:${record.ticketId}`, JSON.stringify(record), {
    expirationTtl: 60 * 60 * 24 * 90,
  });
}
