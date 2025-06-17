import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import pika404 from "../assets/pika-404.png";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-blue-100 px-4 py-10">
      <div className="backdrop-blur-lg bg-white/60 dark:bg-white/10 shadow-xl rounded-xl p-8 md:p-12 text-center max-w-xl w-full border border-white/30">
        <h1 className="text-6xl font-extrabold text-red-600 dark:text-red-500 mb-4 drop-shadow">
          404
        </h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Uh-oh! Pikachu zapped this page away.
        </p>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to={"/"}
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg shadow transition-transform transform hover:scale-105"
        >
          Back to Home
        </Link>
        <motion.img
          src={pika404}
          alt="Pikachu 404 Page"
          className="w-48 h-auto mx-auto mt-8 drop-shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};
