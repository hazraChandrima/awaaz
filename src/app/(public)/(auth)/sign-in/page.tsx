"use client";

import { useState } from "react";
import { FaGoogle, FaFacebook, FaLinkedinIn } from "react-icons/fa6";
import { auth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
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
      console.log("User signed in with OAuth:", userCredential.user);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Failed to sign in with OAuth");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="py-12 px-6 mt-8 bg-white border border-gray-200 rounded-xl shadow-lg max-w-[35rem] mx-auto">
        <div className="p-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account yet? {" "}
              <a
                className="text-blue-600 hover:underline font-medium"
                href="/sign-up"
              >
                Sign up here
              </a>
            </p>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-6 flex space-x-2">
            <button
              type="button"
              className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
              onClick={() => handleOAuthSignIn("google")}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              ) : (
                <><FaGoogle /> Google</>
              )}
            </button>
            <button
              type="button"
              className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
              onClick={() => handleOAuthSignIn("facebook")}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              ) : (
                <><FaFacebook /> Facebook</>
              )}
            </button>
          </div>

          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200 mx-6">
            Or
          </div>

          <form onSubmit={handleSignIn} className="grid gap-y-4">
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
              className="w-full py-3 px-4 bg-[#CA3C25] text-white rounded-lg hover:bg-[#B83420] flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Sign In"
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
    </>
  );
}