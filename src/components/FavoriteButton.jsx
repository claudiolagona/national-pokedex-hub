import { useDispatch, useSelector } from "react-redux";
import {
  addFavorites,
  removeFavorites,
} from "../redux/favorites/favoritesActions";
import toast from "react-hot-toast";

export const FavoriteButton = ({ pokemon }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const isFavorite = favorites.some((fav) => fav === pokemon);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorites(pokemon));
      toast.error(`${pokemon.name} removed from favorites.`);
    } else {
      dispatch(addFavorites(pokemon));
      toast.success(`${pokemon.name} added to favorites.`);
    }
  };

  return (
    <button
      onClick={handleFavoriteToggle}
      className={`px-4 py-2 rounded cursor-pointer mt-4 transition ${
        isFavorite
          ? "text-white bg-red-500 hover:bg-red-700"
          : "bg-gray-300 hover:bg-gray-400"
      }`}
    >
      {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
    </button>
  );
};
