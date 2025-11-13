import { NextResponse } from "next/server";
import { issueCsrf } from "@/lib/csrf";

export async function GET() {
  const token = await issueCsrf();
  return NextResponse.json({ ok: true, token });
}
