import { getAuth } from "firebase/auth";

export async function authedFetch(
  input: string,
  init: RequestInit = {}
): Promise<Response> {
  const auth = getAuth();
  const token = await auth.currentUser?.getIdToken?.();

  const headers = {
    ...(init.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  } as Record<string, string>;

  return fetch(input, { ...init, headers, credentials: "include" });
}
