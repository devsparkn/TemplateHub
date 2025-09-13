"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, ArrowLeft } from "lucide-react";

export default function SetNewPassword() {
  const email = useSearchParams().get("email") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return setMsg("Passwords do not match");
    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword: password }),
    });
    const data = await res.json();
    setLoading(false);
    setMsg(data.message || data.error);
    if (data.success) setTimeout(() => router.push("/login"), 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-yellow-100">
          <Lock className="h-6 w-6 text-yellow-500" />
        </div>

        <h1 className="text-2xl font-semibold">Set new password</h1>
        <p className="mt-1 text-gray-500">
          Your new password must be different from previously used passwords.
        </p>

        <form onSubmit={handleUpdate} className="mt-6 space-y-4 text-left">
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Confirm password
            </label>
            <input
              type="password"
              className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-md bg-yellow-500 py-2 cursor-pointer text-white hover:bg-yellow-600 disabled:opacity-70"
          >
            {loading ? "Updating…" : "Reset password"}
          </button>
        </form>

        {msg && <p className="mt-4 text-center text-sm text-gray-700">{msg}</p>}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mt-4 flex items-center gap-1 text-sm text-gray-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to log in
          </button>
        </div>
      </div>
    </div>
  );
}
