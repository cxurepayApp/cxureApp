import { Link } from "react-router-dom";

const Navbar = () => {
  const listDeatils = ["Home", "About", "Contact Us"];

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/20 fixed w-full z-50">
        <div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-36 lg:h-24 ">
          {/* ------------------------------------------ */}
          <div className="flex items-center space-x-2">
            <img src="/icons/CXLOGO.svg" alt="" width={150} height={20} />
          </div>

          <div className="flex flex-row gap-6">
            {listDeatils.map((items) => (
              <Link
                to="/"
                className="text-blue-600 hover:-purple-600 px-4 py-2 rounded-md transition-colors"
              >
                {items}
              </Link>
            ))}
          </div>

          {/* ------------------------------------------ */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
