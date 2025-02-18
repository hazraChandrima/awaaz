"use client";

import { useState } from "react";
import { FaGoogle, FaFacebook, FaLinkedinIn } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Sign-up failed");
      }

      setShowVerificationModal(true);
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong during sign-up.");
      }
      console.error("Sign-up error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignUp = async (provider: string) => {
    setLoading(true);

    try {
      let authProvider;
      switch (provider) {
        case "google":
          authProvider = new GoogleAuthProvider();
          break;
        case "facebook":
          authProvider = new FacebookAuthProvider();
          break;
        default:
          throw new Error("Unsupported provider");
      }

      const userCredential = await signInWithPopup(auth, authProvider);
      console.log("User signed up with OAuth:", userCredential.user);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to sign up with OAuth.");
      }
      console.error("OAuth sign-up error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4">
      <div className="mt-28 py-12 px-6 bg-[#d0ab7d21] border border-gray-300 rounded-xl shadow-lg max-w-[32rem] mx-auto">
        <div className="p-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <a
                className="text-[#9a3724] hover:underline font-medium"
                href="/sign-in"
              >
                Sign in
              </a>
            </p>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-6 flex space-x-2 justify-center">
            <button
              type="button"
              className="py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
              onClick={() => handleOAuthSignUp("google")}
              disabled={loading}
            >
              <FaGoogle /> <span className="hidden sm:block">Google</span>
            </button>
            <button
              type="button"
              className="py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
              onClick={() => handleOAuthSignUp("facebook")}
              disabled={loading}
            >
              <FaFacebook /> <span className="hidden sm:block">Facebook</span>
            </button>
            <button
              type="button"
              className="py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
              disabled
            >
              <FaLinkedinIn /> <span className="hidden sm:block">LinkedIn</span>
            </button>
          </div>

          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200 mx-6">
            Or
          </div>

          <form onSubmit={handleSignUp} className="mt-6 grid gap-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="py-2 px-4 block w-full border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="py-2 px-4 block w-full border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-2 px-4 block w-full border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="py-2 px-4 block w-full border border-gray-300 rounded-lg text-sm"
            />
            <button
              type="submit"
              className="py-3 px-2 bg-[#CA3C25] text-white rounded-lg hover:bg-[#B83420] flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <div className="h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[#CA3C25] rounded-full animate-spin"></div>
        </div>
      )}

      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold text-gray-800">
              Verify Your Email
            </h2>
            <p className="mt-2 text-gray-600">
              A verification email has been sent to <strong>{email}</strong>.
              Please check your inbox and follow the instructions to verify your
              account.
            </p>
            <button
              onClick={() => {
                setShowVerificationModal(false);
                window.location.href = "/";
              }}
              className="mt-4 w-full py-2 px-4 bg-[#CA3C25] text-white rounded-lg hover:bg-[#B83420]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
