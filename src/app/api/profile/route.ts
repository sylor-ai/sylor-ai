import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // read the JSON the setup page sent
    const body = await req.json();
    // { businessName, businessPhone, plan? }

    // TODO: here is where you would:
    // - get current user (from cookies/session/JWT)
    // - find their tenant in Firestore
    // - update /tenants/{tenantId} with body

    // for now we just echo it back so the UI is happy
    return NextResponse.json(
      {
        ok: true,
        saved: body,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("profile POST error", e);
    return NextResponse.json(
      { ok: false, error: "Could not save profile" },
      { status: 500 }
    );
  }
}
