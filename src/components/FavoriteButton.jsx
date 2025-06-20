import { useDispatch, useSelector } from "react-redux";
import {
  addFavorites,
  removeFavorites,
} from "../redux/favorites/favoritesActions";
import { FavoriteToast } from "./FavoriteToast";
import toast from "react-hot-toast";

export const FavoriteButton = ({ pokemon }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const isFavorite = favorites.some((fav) => fav.name === pokemon.name);

  const handleFavoriteToggle = () => {
    toast.dismiss();

    const message = isFavorite ? `${pokemon.name} removed from favorites.` : `${pokemon.name} added to favorites.`;

    const type = isFavorite ? "remove" : "add";

    if (isFavorite) {
      dispatch(removeFavorites(pokemon));
    } else {
      dispatch(addFavorites(pokemon));
    }

    toast.custom(t => (
      <FavoriteToast message={message} type={type} />
    ), { duration: 1 })
  };

  return (
    <button
      onClick={handleFavoriteToggle}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mt-4 cursor-pointer focus:outline-none
        ${
          isFavorite
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
    >
      {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
    </button>
  );
};
