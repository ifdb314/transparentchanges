import { createHmac } from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { US_STATES } from "@/lib/usStates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://transparentchanges.com";
const FROM_ADDRESS = "TransparentChanges <info@transparentchanges.com>";

const PLEDGE_TYPE_LABELS: Record<string, string> = {
  money: "Pledge money",
  word: "Spread the word",
  volunteer: "Volunteer to help",
  employee: "Offer to be an employee",
};

function stateName(code: string): string {
  return US_STATES.find((s) => s.code === code)?.name || code;
}

function nl2br(input: string): string {
  return escapeHtml(input).replace(/\n/g, "<br/>");
}

export type PledgeSubmission = {
  name: string;
  email: string;
  location: string;
  pledgeType: string;
  amountCents: number | null;
  helpText: string | null;
};

const SOCIAL_LINKS = [
  { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { icon: "tiktok", label: "TikTok", href: "https://www.tiktok.com/" },
  {
    icon: "facebook",
    label: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`,
  },
  { icon: "youtube", label: "YouTube", href: "https://www.youtube.com/" },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    href: `https://wa.me/?text=${encodeURIComponent(
      "Check out TransparentChanges — companies that publish their receipts and put people first."
    )}%20${encodeURIComponent(SITE_URL)}`,
  },
  { icon: "snapchat", label: "Snapchat", href: "https://www.snapchat.com/" },
];

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** HMAC-signed so a link can't be used to unsubscribe someone else's address. Reuses
 *  ADMIN_PASSWORD as the signing secret, same pattern as the admin session cookie. */
function signUnsubscribe(email: string): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("Missing ADMIN_PASSWORD environment variable.");
  return createHmac("sha256", secret).update(email.toLowerCase()).digest("hex");
}

export function verifyUnsubscribeSignature(email: string, sig: string): boolean {
  return sig === signUnsubscribe(email);
}

export function unsubscribeUrl(email: string): string {
  const params = new URLSearchParams({ email, sig: signUnsubscribe(email) });
  return `${SITE_URL}/api/unsubscribe?${params.toString()}`;
}

async function isSuppressed(email: string): Promise<boolean> {
  const supabase = supabaseAdmin();
  const { data } = await supabase
    .from("email_suppressions")
    .select("email")
    .eq("email", email.toLowerCase())
    .maybeSingle();
  return !!data;
}

function socialIconsHtml(): string {
  const cells = SOCIAL_LINKS.map(
    ({ icon, label, href }) => `
      <a href="${href}" style="display:inline-block;margin:0 6px;" aria-label="${label}">
        <img src="${SITE_URL}/icons/${icon}.png" width="36" height="36" alt="${label}" style="display:block;border-radius:50%;" />
      </a>`
  ).join("");
  return `<div style="text-align:center;margin-top:8px;">${cells}</div>`;
}

function submissionDetailsHtml(sub: PledgeSubmission): string {
  const rows = [
    `<tr><td style="padding:5px 0;color:#5B4D3F;">State</td><td style="padding:5px 0;text-align:right;font-weight:600;color:#1F160F;">${escapeHtml(stateName(sub.location))}</td></tr>`,
    `<tr><td style="padding:5px 0;color:#5B4D3F;">How they chose to help</td><td style="padding:5px 0;text-align:right;font-weight:600;color:#1F160F;">${escapeHtml(PLEDGE_TYPE_LABELS[sub.pledgeType] || sub.pledgeType)}</td></tr>`,
  ];
  if (sub.pledgeType === "money" && sub.amountCents) {
    rows.push(
      `<tr><td style="padding:5px 0;color:#5B4D3F;">Amount pledged</td><td style="padding:5px 0;text-align:right;font-weight:600;color:#1F160F;">$${(sub.amountCents / 100).toFixed(2)}</td></tr>`
    );
  }

  const helpTextBlock = sub.helpText
    ? `<p style="margin:14px 0 0;font-size:14px;line-height:1.55;color:#1F160F;"><strong>How they can help:</strong><br/>${nl2br(sub.helpText)}</p>`
    : "";

  return `
    <div style="margin:20px 0 0;padding:16px 18px;background:#FDF3E4;border-radius:12px;">
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#8A7A6A;">Submission details</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
        ${rows.join("")}
      </table>
      ${helpTextBlock}
    </div>`;
}

function foundingCircleThankYouHtml(sub: PledgeSubmission): string {
  const safeName = escapeHtml(sub.name);
  const unsubscribe = unsubscribeUrl(sub.email);
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#FDF3E4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FDF3E4;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:20px;overflow:hidden;">
            <tr>
              <td>
                <img src="${SITE_URL}/images/hero_hands.jpg" width="560" alt="" style="width:100%;max-width:560px;height:auto;display:block;" />
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 40px;">
                <p style="margin:0 0 18px;font-size:17px;line-height:1.6;color:#1F160F;">Hi ${safeName},</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#5B4D3F;">
                  Thank you for your contribution to this cause! As soon as we receive enough
                  interest, people to put together a real team, and money for a given venture we
                  will reach out with further news. You can always decide at that time how
                  you&rsquo;d like to actually contribute. We of course will let you know all the
                  details about the possible venture and how hopefully it will positively impact
                  the world.
                </p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#5B4D3F;">
                  Meanwhile, please help us by continuing to spread the news about
                  TransparentChanges. It&rsquo;s the people that will make the difference: whether
                  they just support the cause in spirit, purchase products/services from a
                  venture, volunteer or work for the venture, or contribute financially &mdash;
                  it&rsquo;s everyone working together that will change the industries and allow
                  us to go against the giant corporate players that are currently setting the tone
                  for how things work.
                </p>
                <p style="margin:24px 0 0;font-size:16px;line-height:1.65;color:#1F160F;font-weight:700;">
                  Thank you again from the bottom of our hearts.
                </p>
                ${submissionDetailsHtml(sub)}
                <p style="margin:20px 0 28px;font-size:16px;line-height:1.5;color:#1F160F;">
                  Sincerely,<br />All of us who believe in TransparentChanges&rsquo; mission
                </p>
                <p style="margin:0 0 10px;text-align:center;font-family:ui-monospace,'SF Mono',Menlo,Consolas,monospace;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#8A7A6A;">
                  Share TransparentChanges
                </p>
                ${socialIconsHtml()}
                <p style="margin:22px 0 0;text-align:center;">
                  <a href="${SITE_URL}/" style="color:#E64A2E;font-size:14px;font-weight:700;text-decoration:none;">transparentchanges.com</a>
                </p>
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
            <tr>
              <td style="padding:20px 32px;text-align:center;">
                <a href="${unsubscribe}" style="color:#8A7A6A;font-size:12px;text-decoration:underline;">Unsubscribe from these emails</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Best-effort — a failed email should never block or fail the pledge itself. This is
 *  also the fallback record of a submission if the Supabase write failed, so it always
 *  fires regardless of whether the DB insert succeeded. */
export async function sendFoundingCirclePledgeEmail(sub: PledgeSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    if (await isSuppressed(sub.email)) return;

    const unsubscribe = unsubscribeUrl(sub.email);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [sub.email],
        cc: ["info@transparentchanges.com"],
        bcc: ["transittrack@gmail.com"],
        reply_to: "info@transparentchanges.com",
        subject: "TransparentChanges - Thank you for your contribution!",
        html: foundingCircleThankYouHtml(sub),
        headers: {
          "List-Unsubscribe": `<${unsubscribe}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      }),
    });
    if (!res.ok) {
      console.error("Resend send failed", res.status, await res.text());
    }
  } catch (err) {
    console.error("Resend send error", err);
  }
}
