import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import welcomingPikachu from "../assets/pika-welcome.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="backdrop-blur-lg bg-white/60 shadow-xl rounded-xl p-8 md:p-12 text-center max-w-3xl w-full border border-white/40">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-sm">
          National Pokédex
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10">
          Your personal Pokémon Center Hub
        </p>

        <motion.img
          src={welcomingPikachu}
          alt="Welcoming Pikachu"
          className="w-52 h-auto mx-auto mb-10 drop-shadow-lg"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to={"/pokemon"}
            className="bg-yellow-400 hover:bg-yellow-500 text-black hover:text-white font-semibold py-3 px-6 rounded-lg shadow transition-transform transform hover:scale-105"
          >
            Go to Pokédex
          </Link>
          {user.currentUser?.role === "admin" && (
            <Link
              to={"/create"}
              className="bg-blue-500 hover:bg-blue-600 text-black hover:text-white font-semibold py-3 px-6 rounded-lg shadow transition-transform transform hover:scale-105"
            >
              Create a Custom Pokémon
            </Link>
          )}
          {user.isLoggedIn && (
            <Link
              to={"/favorites"}
              className="bg-red-500 hover:bg-red-600 text-black hover:text-white font-semibold py-3 px-6 rounded-lg shadow transition-transform transform hover:scale-105"
            >
              Your favorites
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
