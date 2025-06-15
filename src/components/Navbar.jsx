import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userActions";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, isLoggedIn } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-red-600 text-white px-80 py-4 flex justify-between items-center">
      <Link to="/" className="font-black text-2xl text-yellow-400 logo">
        National Pokédex
      </Link>
      <ul className="flex gap-4 items-center">
        <li>
          <Link to="/pokemon">Pokémons</Link>
        </li>

        {isLoggedIn && currentUser?.role === "admin" && (
          <>
            <li>
              <Link to="/create">Create a Pokémon</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </>
        )}

        {isLoggedIn && (
          <>
            <li>
              <Link to="favorites">Favorites</Link>
            </li>
            <li>
              <Link to="profile">Profile</Link>
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
    </nav>
  );
};
