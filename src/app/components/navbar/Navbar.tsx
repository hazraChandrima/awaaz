"use client";

import Link from "next/link";
import logo from "../../../../public/assets/logo.jpeg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { auth } from "@/firebase";
import { signOut, onAuthStateChanged, User } from "firebase/auth";

function Navbar() {
  const [currentUser, setCurrentUser] = useState<User|null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); 
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="fixed top-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white shadow-md border-b border-gray-200">
      <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 p-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-x-1">
          <Link
            href="/"
            className="flex-none font-bold text-xl text-[#CA3C25] focus:outline-none focus:opacity-80"
            aria-label="Brand"
          >
            <Image
              src={logo}
              className="h-[35px] w-[120px] md:h-[50px] md:w-[190px]"
              alt="site logo"
            />
          </Link>

          <button
            type="button"
            className="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? (
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            )}
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>

        <div
          id="hs-header-base"
          className={`hs-collapse ${
            isMenuOpen ? "block" : "hidden"
          } md:block overflow-hidden transition-all duration-300 basis-full grow`}
          aria-labelledby="hs-header-base-collapse"
        >
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
              <div className="grow">
                <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
                  <a
                    href="/#vision"
                    className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Our Mission
                  </a>

                  <Link
                    href="/browse"
                    className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse
                  </Link>
                  {currentUser && (
                    <Link
                      href="/dashboard/creator"
                      className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                </div>
              </div>

              <div className="my-2 md:my-0 md:mx-2">
                <div className="w-full h-px md:w-px md:h-4 bg-gray-100 md:bg-gray-300"></div>
              </div>

              <div className="flex flex-wrap items-center gap-x-1.5">
                {currentUser ? (
                  <button
                    onClick={handleLogout}
                    className="py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
                  >
                    Log Out
                  </button>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-[#CA3C25] text-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
