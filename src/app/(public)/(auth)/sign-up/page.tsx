"use client";

import { useState } from "react";
import { FaGoogle, FaFacebook, FaLinkedinIn } from "react-icons/fa6";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }

      setShowVerificationModal(true);
    } catch (err: any) {
      console.log(err);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="py-12 px-6 mt-8 bg-white border border-gray-200 rounded-xl shadow-lg max-w-[35rem] mx-auto">
        <div className="p-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <a
                className="text-blue-600 hover:underline font-medium"
                href="/sign-in"
              >
                Sign in here
              </a>
            </p>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <form onSubmit={handleSignUp} className="mt-6 grid gap-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#CA3C25] text-white rounded-lg hover:bg-[#B83420]"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

    </>
  );
}
