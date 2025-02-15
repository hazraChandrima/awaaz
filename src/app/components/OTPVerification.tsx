"use client";

import { useState } from "react";

interface OTPVerificationProps {
  onVerify: (phoneNumber: string, otp: string) => Promise<boolean>;
  onClose: () => void;
}

export default function OTPVerification({ onVerify, onClose }: OTPVerificationProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"input" | "verify">("input");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send OTP");
      }

      setStep("verify");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    
    try {
      const success = await onVerify(phoneNumber, otp);
      if (!success) {
        throw new Error("Invalid OTP");
      }
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Verify Phone Number</h2>
        
        {step === "input" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Phone Number (International Format)
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1234567890"
                className="w-full px-3 py-2 border rounded-lg"
                disabled={loading}
              />
            </div>
            
            <button
              onClick={handleSendOTP}
              disabled={loading || !phoneNumber}
              className="w-full bg-[#CA3C25] text-white py-2 rounded-lg disabled:bg-blue-300"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "verify" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-3 py-2 border rounded-lg"
                disabled={loading}
              />
            </div>
            
            <button
              onClick={handleVerify}
              disabled={loading || otp.length !== 6}
              className="w-full bg-[#CA3C25] text-white py-2 rounded-lg disabled:bg-green-300"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {error && (
          <div className="mt-4 text-red-500 text-sm">{error}</div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}
