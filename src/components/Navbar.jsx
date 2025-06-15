import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/user/userActions";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, isLoggedIn } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-red-600 text-white max-sm:px-4 px-20 py-6">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-black text-2xl text-yellow-400 logo">
          National Pokédex
        </Link>

        {/* Hamburger */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="lg:flex gap-4 items-center max-lg:hidden">
          <li>
            <Link to="/pokemon">Pokémons</Link>
          </li>

          {isLoggedIn && currentUser?.role === "admin" && (
            <>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          )}

          {isLoggedIn && (
            <>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          )}

          {!isLoggedIn ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="bg-yellow-400 text-red-600 hover:underline cursor-pointer rounded px-2 py-1"
              >
                Logout ({currentUser.username})
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col mt-4 gap-2 lg:hidden overflow-hidden"
          >
            <li>
              <Link to="/pokemon" onClick={() => setIsOpen(false)}>
                Pokémons
              </Link>
            </li>
            {isLoggedIn && currentUser?.role === "admin" && (
              <>
                <li>
                  <Link to="/create" onClick={() => setIsOpen(false)}>
                    Create
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/favorites" onClick={() => setIsOpen(false)}>
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    Profile
                  </Link>
                </li>
              </>
            )}
            {!isLoggedIn ? (
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout;
                    setIsOpen(false);
                  }}
                  className="bg-yellow-400 text-red-600 hover:underline cursor-pointer rounded px-2 py-1"
                >
                  Logout ({currentUser.username})
                </button>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};
