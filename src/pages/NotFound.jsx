import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-red-600">Not Found</h1>
      <p className="text-2xl mt-4 text-gray-700 dark:text-gray-200">
        Page not found
      </p>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        The page you're looking for doesn't exist or has been removed.
      </p>
      <Link
        to={"/"}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go back Home
      </Link>
      <img
        src="../src/assets/pika-404.png"
        alt="Pikachu 404 Page"
        className="w-40"
      />
    </div>
  );
};
