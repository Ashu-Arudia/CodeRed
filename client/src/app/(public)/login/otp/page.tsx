"use client";

import { useSendOtp, useVerifyOtp } from "@/features/auth/mutations";
import { verify } from "crypto";
import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { useAuthStore } from "@/store/otp/otpStore";
import { useRouter } from "next/navigation";


const OTP_LENGTH = 6;

export default function VerifyOTP() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState<number>(30);
  const [isResendActive, setIsResendActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // API
  const sendOtp = useSendOtp()
  const verifyOtp = useVerifyOtp()

  // zustand otp store
  const email = useAuthStore((s) => s.email)
  const clearEmail = useAuthStore((s) => s.clearEmail)

  useEffect((): (() => void) | void => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendActive(true);
    }
  }, [timer]);

  const handleChange = (value: string, index: number): void => {
    if (!/^\d?$/.test(value)) return;

    const newOtp: string[] = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus forward
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>): void => {
    const pasteData: string = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, OTP_LENGTH);

    if (!/^\d+$/.test(pasteData)) return;

    const newOtp: string[] = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((digit, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = digit;
      }
    });

    inputsRef.current[OTP_LENGTH - 1]?.focus();
  };

  const handleVerify = async (): Promise<void> => {
    const code: string = otp.join("");

    if (!email) {
      router.replace("/login")
      return;
    }

    if (code.length !== OTP_LENGTH) {
      alert("Enter complete OTP");
      return;
    }

    try {
      setLoading(true);
      verifyOtp.mutate({ email, otp: code }, {
        onSuccess: () => {
          console.log("IT is sucess otp")
          router.push("/app/profile")
          setTimeout(() => {
            clearEmail();
          }, 500);
        }
      })
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = (): void => {
    if (!isResendActive) return;

    try {
      sendOtp.mutate({ email },
        {
          onSuccess: () => {
            alert("Otp Resend Success full check! ")
            setTimer(30);
            setIsResendActive(false);
          }
        }
      )
    } catch(error) {
      console.error("Resend Otp failed failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-2">Verify OTP</h2>
        <p className="text-gray-500 mb-6">
          Enter the 6-digit code sent to your number
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mb-6" onPaste={handlePaste}>
          {otp.map((digit: string, index: number) => (
            <input
              key={index}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el: HTMLInputElement | null) => {
                inputsRef.current[index] = el;
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(e, index)
              }
              className="w-12 h-12 text-center border rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={verifyOtp.isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <p className="mt-4 text-sm text-gray-500">
          {isResendActive ? (
            <button
              onClick={handleResend}
              className="text-blue-600 font-medium hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            `Resend OTP in ${timer}s`
          )}
        </p>
      </div>
    </div>
  );
}
