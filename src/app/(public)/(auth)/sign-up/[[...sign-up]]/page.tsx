"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { FaGoogle, FaFacebook, FaLinkedinIn } from "react-icons/fa6";
import VerificationModal from "../../../../components/VerificationModal";

export default function SignUp() {
  const { signUp, isLoaded } = useSignUp();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.create({
        emailAddress: email,
        password:password,
        lastName: lastName,
        firstName: firstName,
      });

      await signUpAttempt.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setShowVerificationModal(true);
    } catch (err: any) {
      console.log(err);
      setError(err.errors?.message || "Something went wrong");
    }
  };

  const handleOAuthSignUp = async (
    provider: "oauth_google" | "oauth_facebook" | "oauth_linkedin"
  ) => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      setError(err.errors[0]?.message || "OAuth sign-up failed");
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

          <div className="mt-6">
            <div className="flex space-x-2">
              <button
                type="button"
                className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
                onClick={() => handleOAuthSignUp("oauth_google")}
              >
                <FaGoogle />
                Google
              </button>
              <button
                type="button"
                className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
                onClick={() => handleOAuthSignUp("oauth_facebook")}
              >
                <FaFacebook />
                Facebook
              </button>
              <button
                type="button"
                className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition duration-200"
                onClick={() => handleOAuthSignUp("oauth_linkedin")}
              >
                <FaLinkedinIn />
                LinkedIn
              </button>
            </div>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200 mx-6">
              Or
            </div>

            <form onSubmit={handleSignUp}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    required
                  />
                </div>
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
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 text-gray-700"
                  >
                    Password
                  </label>
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
                <div id="clerk-captcha"></div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#CA3C25] text-white hover:bg-[#B83420] transition duration-200"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showVerificationModal && (
        <VerificationModal
          isOpen={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
          email={email}
        />
      )}
    </>
  );
}
