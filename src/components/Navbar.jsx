import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/user/userActions";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLogOut,
  FiUser,
  FiHeart,
  FiGrid,
  FiPlus,
  FiMenu,
  FiX,
  FiBookOpen,
} from "react-icons/fi";

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
    <nav className="backdrop-blur-md bg-white/70 text-gray-800 shadow-md fixed top-0 left-0 w-full z-50 border-b border-white/30 rounded-b-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl max-xl:text-xl font-semibold tracking-tight hover:opacity-80 transition logo"
        >
          National <span className="text-red-500 logo">Pokédex</span>
        </Link>

        {/* Hamburger */}
        <button
          className="lg:hidden focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 items-center text-sm font-medium">
          <li>
            <Link to="/pokemon" className="hover:text-red-500 transition">
              <FiBookOpen className="inline mr-1" /> Pokémons
            </Link>
          </li>

          {isLoggedIn && currentUser?.role === "admin" && (
            <>
              <li>
                <Link to="/create" className="hover:text-red-500 transition">
                  <FiPlus className="inline mr-1" /> Create
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-red-500 transition">
                  <FiGrid className="inline mr-1" /> Dashboard
                </Link>
              </li>
            </>
          )}

          {isLoggedIn && (
            <>
              <li>
                <Link to="/favorites" className="hover:text-red-500 transition">
                  <FiHeart className="inline mr-1" /> Favorites
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-red-500 transition">
                  <FiUser className="inline mr-1" /> Profile
                </Link>
              </li>
            </>
          )}

          {!isLoggedIn ? (
            <li>
              <Link to="/login" className="hover:text-red-500 transition">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center gap-2 cursor-pointer"
              >
                <FiLogOut />
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
            transition={{ duration: 0.2 }}
            className="lg:hidden backdrop-blur-md bg-white/50 rounded-b-lg shadow-md px-6 py-4 flex flex-col gap-4 text-sm font-medium"
          >
            <li>
              <Link to="/pokemon" onClick={() => setIsOpen(false)}>
                <FiBookOpen className="inline mr-1" /> Pokémons
              </Link>
            </li>
            {isLoggedIn && currentUser?.role === "admin" && (
              <>
                <li>
                  <Link to="/create" onClick={() => setIsOpen(false)}>
                    <FiPlus className="inline mr-1" /> Create
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <FiGrid className="inline mr-1" /> Dashboard
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/favorites" onClick={() => setIsOpen(false)}>
                    <FiHeart className="inline mr-1" /> Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    <FiUser className="inline mr-1" /> Profile
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
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                >
                  <FiLogOut />
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
