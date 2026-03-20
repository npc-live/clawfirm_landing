import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const COOKIE_NAME = "cf_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

export interface SessionPayload extends JWTPayload {
  sub: string;
  email: string;
  unlocked: boolean;
  jti: string;
}

function getSecretKey(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

export async function signSession(
  payload: Omit<SessionPayload, "jti">,
  secret: string
): Promise<string> {
  const jti = crypto.randomUUID();
  return new SignJWT({ ...payload, jti })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecretKey(secret));
}

export async function verifySession(
  token: string,
  secret: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(secret));
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

function cookieDomainForHost(host: string | null): string {
  if (!host) return "";
  const h = host.split(":")[0].toLowerCase();
  // Don't set Domain for localhost or IPs.
  if (h === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(h)) return "";
  // Use host-only cookie by default; set domain only for apex + subdomains if needed.
  // For clawfirm.dev we want it available across www/other subdomains.
  if (h === "clawfirm.dev" || h.endsWith(".clawfirm.dev")) return "Domain=.clawfirm.dev; ";
  return "";
}

export function sessionCookie(token: string, host?: string | null): string {
  const domain = cookieDomainForHost(host ?? null);
  return `${COOKIE_NAME}=${token}; ${domain}HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}; Path=/`;
}

export function clearSessionCookie(host?: string | null): string {
  const domain = cookieDomainForHost(host ?? null);
  return `${COOKIE_NAME}=; ${domain}HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/`;
}

export function getTokenFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === COOKIE_NAME) return rest.join("=");
  }
  return null;
}

export { COOKIE_NAME };
