// FILE: src/lib/dev-signup-store.ts

export type DevSignupPayload = {
  code: string;
  name: string;
  email: string;
  password: string;
  plan: string | null;
  createdAt: number;
  ip: string | null;
};

const store = new Map<string, DevSignupPayload>();

export function devSaveSignup(key: string, payload: DevSignupPayload) {
  store.set(key, payload);
}

export function devGetSignup(key: string): DevSignupPayload | null {
  return store.get(key) ?? null;
}

export function devDeleteSignup(key: string) {
  store.delete(key);
}
