import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from "@/lib/adminAuth";
import { loginAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  if (isValidSessionCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  return (
    <div className="admin-wrap" style={{ maxWidth: 380, paddingTop: 90 }}>
      <h1 style={{ marginBottom: 20 }}>Admin login</h1>
      <form action={loginAction} className="fc-form">
        <div>
          <label htmlFor="user">Username</label>
          <input id="user" name="user" required autoComplete="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        {error && <div className="fc-note error">Incorrect username or password.</div>}
        <button type="submit" className="btn" style={{ justifySelf: "start" }}>
          Log in
        </button>
      </form>
    </div>
  );
}
