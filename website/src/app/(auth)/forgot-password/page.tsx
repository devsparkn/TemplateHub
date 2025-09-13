"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show the API error if available
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      // ✅ Success: go to next page
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-yellow-100">
          <KeyRound className="h-6 w-6 text-yellow-600" />
        </div>

        <h1 className="text-2xl font-semibold">Forgot password?</h1>
        <p className="mt-1 text-gray-500">
          Please enter your email to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-md bg-yellow-500 py-2 cursor-pointer text-white hover:bg-yellow-600 disabled:opacity-70"
          >
            {loading ? "Sending…" : "Reset password"}
          </button>
        </form>

        {/* Error message */}
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
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
