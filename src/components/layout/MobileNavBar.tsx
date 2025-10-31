import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* === Glassy Navbar Container === */}
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] rounded-full z-50 transition-all duration-300 
        flex flex-row justify-between items-center px-6 py-3 
        ${
          isScrolled
            ? "bg-purple-500/30 backdrop-blur-2xl border border-purple-400/30 shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
            : "bg-purple-500/20 backdrop-blur-xl border border-purple-300/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
        }
        hover:bg-purple-500/30 hover:shadow-[0_4px_40px_rgba(147,51,234,0.3)]`}
      >
        {/* === Logo === */}
        <div>
          <img
            src="/icons/ICONLOGOWHITE.svg"
            alt="Logo"
            width={40}
            height={40}
          />
        </div>

        {/* === Menu Icon === */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none transition-transform duration-200 hover:scale-110"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* === Dropdown Menu (Tailwind Animation) === */}
      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-[100lvh]
        bg-purple-600/60 backdrop-blur-2xl 
        text-white p-11 flex flex-col gap-3 z-40
        transition-all duration-500 ease-in-out
        ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }
        `}
      >
        {/* Header inside menu */}
        <div className="flex justify-between items-center mb-[80px]">
          <br />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col text-lg mt-4 space-y-5 font-medium">
          <a href="#" className="hover:text-purple-200 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-purple-200 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-purple-200 transition-colors">
            Contact
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex flex-col mt-10 space-y-4">
          <Link
            to="/auth/login"
            className="text-white border border-white/30 py-2 rounded-md text-center hover:bg-white/10 transition-all"
          >
            Login
          </Link>

          <Link
            to="/auth/register"
            className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 text-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNavBar;
