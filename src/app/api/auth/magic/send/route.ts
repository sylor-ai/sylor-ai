// src/app/api/auth/magic/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createAndSendMagicLink } from "@/lib/magic";

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  // rate limit per email/IP as shown earlier
  await createAndSendMagicLink(email);
  return NextResponse.json({ ok: true });
}
