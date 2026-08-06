import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyUnsubscribeSignature } from "@/lib/email";

async function suppress(email: string) {
  const supabase = supabaseAdmin();
  await supabase
    .from("email_suppressions")
    .upsert({ email: email.toLowerCase() }, { onConflict: "email" });
}

function page(title: string, body: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#FDF3E4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:480px;margin:0 auto;padding:80px 28px;text-align:center;">
      <h1 style="font-size:1.6rem;color:#1F160F;margin:0 0 16px;">${title}</h1>
      <p style="font-size:1rem;line-height:1.6;color:#5B4D3F;margin:0 0 24px;">${body}</p>
      <a href="https://transparentchanges.com" style="color:#E64A2E;font-weight:700;text-decoration:none;">Back to TransparentChanges</a>
    </div>
  </body>
</html>`;
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email") || "";
  const sig = request.nextUrl.searchParams.get("sig") || "";

  if (!email || !sig || !verifyUnsubscribeSignature(email, sig)) {
    return new NextResponse(
      page("Invalid or expired link", "That unsubscribe link isn&rsquo;t valid. If you&rsquo;d like to stop receiving emails, contact us directly."),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  await suppress(email);

  return new NextResponse(
    page("You&rsquo;ve been unsubscribed", "You won&rsquo;t receive any more emails from TransparentChanges. Sorry to see you go &mdash; and thank you again for believing in this."),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

/** One-click unsubscribe (RFC 8058) — Gmail/Yahoo call this directly with no page shown. */
export async function POST(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email") || "";
  const sig = request.nextUrl.searchParams.get("sig") || "";

  if (email && sig && verifyUnsubscribeSignature(email, sig)) {
    await suppress(email);
  }

  return new NextResponse(null, { status: 200 });
}
