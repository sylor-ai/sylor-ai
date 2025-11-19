import { NextResponse } from "next/server";

export function handleTenantApiError(err: any, label: string) {
  const status =
    typeof err?.status === "number" ? err.status : 500;

  if (status === 401 || status === 403 || status === 400) {
    return NextResponse.json(
      { ok: false, error: err?.message || "unauthorized" },
      { status }
    );
  }

  console.error(label, err);
  return NextResponse.json(
    { ok: false, error: "server-error" },
    { status: 500 }
  );
}
