"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { FaGoogle, FaFacebook, FaLinkedinIn } from "react-icons/fa";

export default function Login() {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle Email/Password Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signIn.create({
        identifier: email,
        password,
      });
      window.location.href = "/dashboard"; // Redirect after login
    } catch (err: any) {
      setError(err.errors[0]?.message || "Something went wrong");
    }
  };

  // Handle OAuth Sign In (Google, Facebook, LinkedIn)
  const handleOAuthSignIn = async (
    provider: "oauth_google" | "oauth_facebook" | "oauth_linkedin"
  ) => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback", // Temporary redirect for Clerk to process
        redirectUrlComplete: "/dashboard", // Final redirect after authentication
      });
    } catch (err: any) {
      setError(err.errors[0]?.message || "OAuth login failed");
    }
  };

  return (
    <div className="py-12 px-6 mt-8 bg-white border border-gray-200 rounded-xl shadow-lg max-w-[35rem] mx-auto">
      <div className="p-6 sm:p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account yet?{" "}
            <a
              className="text-blue-600 hover:underline font-medium"
              href="/sign-up"
            >
              Sign up here
            </a>
          </p>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-6">
          <div className="flex space-x-2">
            <button
              type="button"
              className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
              onClick={() => handleOAuthSignIn("oauth_google")}
            >
              <FaGoogle />
              Google
            </button>
            <button
              type="button"
              className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
              onClick={() => handleOAuthSignIn("oauth_facebook")}
            >
              <FaFacebook />
              Facebook
            </button>
            <button
              type="button"
              className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
              onClick={() => handleOAuthSignIn("oauth_linkedin")}
            >
              <FaLinkedinIn />
              LinkedIn
            </button>
          </div>

          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200 mx-6">
            Or
          </div>

          <form onSubmit={handleSignIn}>
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm mb-2 text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Password
                  </label>
                  <a
                    className="text-sm text-blue-600 hover:underline"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#CA3C25] text-white hover:bg-[#B83420] transition duration-200"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
