import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Nav container */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] bg-purple-600 backdrop-blur-md border border-gray-200/20 rounded-full z-50 shadow-lg">
        <div className="flex flex-row justify-between items-center px-6 py-3">
          {/* Logo */}
          <div>
            <img
              src="/icons/ICONLOGOWHITE.svg" // ✅ Removed unnecessary /public
              alt="Logo"
              width={40}
              height={40}
            />
          </div>

          {/* Menu icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown menu (conditionally rendered) */}
      {isOpen && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-[100lvh] bg-purple-600 text-gray-800 p-4 flex flex-col gap-3 z-50 transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center">
            <img
              src="/icons/ICONLOGOWHITE.svg"
              alt="Logo"
              width={50}
              height={50}
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </button>
          </div>

          <div className="flex flex-col mt-10 px-4 space-y-4">
            {/* Navigation Links */}
            <a href="#" className="hover:text-purple-300 text-white">
              Home
            </a>
            <a href="#" className="hover:text-purple-300 text-white">
              About
            </a>
            <a href="#" className="hover:text-purple-300 text-white">
              Contact
            </a>

            {/* Auth Buttons */}
            <div className="flex flex-col mt-6 space-y-4">
              <Link
                to="/login"
                className="hover:text-gray-900 py-2 rounded-md text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 w-full text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavBar;
