"use client";
import { useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MailCheck, ArrowLeft } from "lucide-react";

export default function VerifyOTP() {
  const email = useSearchParams().get("email") || "";
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(value: string, index: number) {
    if (!/^\d?$/.test(value)) return; // Allow only single digit
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    // Auto move to next box
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.error || "Invalid code");

      router.push(`/set-new-password?email=${encodeURIComponent(email)}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-yellow-100">
          <MailCheck className="h-6 w-6 text-yellow-600" />
        </div>

        <h1 className="text-2xl font-semibold">Check your email</h1>
        <p className="mt-1 text-gray-500">
          Enter the 6-digit code we sent to{" "}
          <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="mt-6 space-y-4">
          <div className="flex justify-between gap-2">
            {otpDigits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-12 rounded-md border text-center text-xl tracking-wider focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            ))}
          </div>

          <button
            disabled={loading}
            className="w-full rounded-md bg-yellow-500 py-2 cursor-pointer text-white hover:bg-yellow-600 disabled:opacity-70"
          >
            {loading ? "Verifying…" : "Verify code"}
          </button>
        </form>

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
