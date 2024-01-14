import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const { user, loading, logOut } = useContext(AuthContext);
  const [role, setRole] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/users?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setRole(data));
  }, [user?.email]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    logOut()
      .then((result) => {
        toast.success("you have logged out");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className={`bg-gray-800 ${isMenuOpen ? "open" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                {role.map((r) =>
                  r.userRole === "seller" ? (
                    <>
                      <Link
                        to="/addProperty"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Add Property
                      </Link>
                      <Link
                        to="/myProperty"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        My Property
                      </Link>
                    </>
                  ) : (
                    <></>
                  )
                )}

                <Link
                  to="/allProperty"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  All Property
                </Link>
              </div>
            </div>
          </div>

          {/* User Icon and Name */}
          <div className="flex items-center">
            <div className="mr-4 flex items-center gap-2 text-gray-300">
              <FaUserCircle
                className="text-xl"
                onClick={() => setShowSignOut(!showSignOut)}
              ></FaUserCircle>
              <span className="mr-2">{user?.displayName}</span>
            </div>
            {user?.uid ? (
              <>
                {showSignOut && (
                  <button
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-1 rounded-md text-sm font-medium"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                )}
              </>
            ) : (
              <></>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white ${
                isMenuOpen ? "open" : ""
              }`}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen ? "true" : "false"}
              style={{
                transition: "transform 0.5s ease-in-out",
                transform: isMenuOpen ? "rotate(180deg)" : "",
              }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                style={{
                  transition: "stroke 0.5s ease-in-out",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                style={{
                  transition: "stroke 0.5s ease-in-out",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden navbar-menu`}
        id="mobile-menu"
        style={{
          transition: "transform 0.5s ease-in-out",
          transform: isMenuOpen ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/" // Update with your actual mobile menu links
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/" // Update with your actual mobile menu links
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          {/* Add more mobile navigation links here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
