"use client";

import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#ab402c] mt-8 w-full py-10 px-4 sm:px-6 lg:px-8 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
          <div className="col-span-full hidden lg:col-span-1 lg:block">
            <a
              className="flex-none text-gray-100 font-semibold text-xl focus:outline-none focus:opacity-80"
              href="#"
              aria-label="Brand"
            >
              Awaaz
            </a>
            <p className="mt-3 text-xs sm:text-sm text-gray-100">© 2025.</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-100 uppercase">
              Company
            </h4>

            <div className="mt-3 grid space-y-3 text-sm">
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-200 hover:text-gray-50 focus:outline-none focus:text-gray-50"
                  href="#"
                >
                  Home
                </a>
              </p>
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-200 hover:text-gray-50 focus:outline-none focus:text-gray-50"
                  href="#"
                >
                  Browse
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-100 uppercase">
              Community
            </h4>

            <div className="mt-3 grid space-y-3 text-sm">
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-200 hover:text-gray-50 focus:outline-none focus:text-gray-50"
                  href="#"
                >
                  About us
                </a>
              </p>
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-200 hover:text-gray-50 focus:outline-none focus:text-gray-50"
                  href="#"
                >
                  Blog
                </a>
              </p>
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-200 hover:text-gray-50 focus:outline-none focus:text-gray-50"
                  href="#"
                >
                  Community Guidelines
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-100 uppercase">
              Support
            </h4>
            <div className="mt-3 grid space-y-3 text-sm">
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-200 hover:text-gray-50 focus:outline-none focus:text-gray-50"
                  href="#"
                >
                  Help & Support
                </a>
              </p>
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-200 hover:text-gray-50 focus:outline-none focus:text-gray-50"
                  href="#"
                >
                  Privacy
                </a>
              </p>
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-200 hover:text-gray-50 focus:outline-none focus:text-gray-50"
                  href="#"
                >
                  What&apos;s New
                </a>
              </p>
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-200 hover:text-gray-50 focus:outline-none focus:text-gray-50"
                  href="#"
                >
                  Status
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-100 uppercase">
              Social
            </h4>
            <div className="mt-3 grid space-y-3 text-md">
              <a
                href="#"
                className="text-gray-200 hover:text-gray-50 transition text-sm flex items-center space-x-2"
              >
                <FaFacebook />
                <span className="text-sm">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-gray-50 transition text-sm flex items-center space-x-2"
              >
                <FaTwitter />
                <span className="text-sm">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-gray-50 transition text-sm flex items-center space-x-2"
              >
                <FaInstagram />
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-5 mt-5 border-t border-gray-200">
          <div className="sm:flex sm:justify-between sm:items-center">
            <div className="flex flex-wrap items-center gap-3">
              <div className="hs-dropdown [--placement:top-left] relative inline-flex">
                <button
                  id="hs-footer-language-dropdown"
                  type="button"
                  className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-[#8d311e] text-gray-100 shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  English (IND)
                  <svg
                    className="hs-dropdown-open:rotate-180 shrink-0 size-4 text-gray-100"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="mt-3 sm:hidden">
                <a
                  className="flex-none font-semibold text-xl text-gray-100 focus:outline-none focus:opacity-80"
                  href="#"
                  aria-label="Brand"
                >
                  Brand
                </a>
                <p className="mt-1 text-xs sm:text-sm text-gray-100">
                  © 2025 Awaaz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
