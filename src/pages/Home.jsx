import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import welcomingPikachu from "../assets/pika-welcome.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="h-200 flex flex-col items-center justify-center bg-white text-gray-800 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">National Pokédex</h1>
      <p className="text-lg md:text-xl mb-8">
        Your personal Pokémon Center Hub
      </p>

      <motion.img
        src={welcomingPikachu}
        alt="Welcoming Pikachu"
        className="w-64 h-auto mb-10 drop-shadow-md"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to={"/pokemon"}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded shadow"
        >
          Go to Pokédex
        </Link>
        {user.currentUser?.role === "admin" && (
          <Link
            to={"/create"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow"
          >
            Create a Custom Pokémon
          </Link>
        )}
        {user.isLoggedIn && (
          <Link
            to={"/favorites"}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded shadow"
          >
            Your favorites
          </Link>
        )}
      </div>
    </div>
  );
};
