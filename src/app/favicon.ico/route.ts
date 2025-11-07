const PLACEHOLDER_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAALElEQVR42mNgGAWjgP9D8T8GhiGIMQwMDAw8g8H/RSF0G0iKoRoNEAAAzMUDr+s7LmwAAAABJRU5ErkJggg==";

export function GET() {
  const body = Buffer.from(PLACEHOLDER_PNG_BASE64, "base64");
  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

