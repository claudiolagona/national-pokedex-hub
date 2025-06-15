import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { AdminDashboard } from "./pages/AdminDashboard";
import { CreateCustomPokemon } from "./pages/CreateCustomPokemon";
import { Favorites } from "./pages/Favorites";
import { PokemonsList } from "./pages/PokemonsList";
import { PokemonView } from "./pages/PokemonView";
import { Profile } from "./pages/Profile";
import { UpdateCustomPokemon } from "./pages/UpdateCustomPokemon";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { GlobalLoader } from "./components/GlobalLoader";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCustomPokemon } from "./redux/customPokemon/customPokemonThunks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCustomPokemon());
  }, [dispatch]);

  return (
    <>
      <GlobalLoader />
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pokemon" element={<PokemonsList />} />
        <Route path="/pokemon/:name" element={<PokemonView />} />

        {/* Only for logged users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Only for admin users */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/create" element={<CreateCustomPokemon />} />
          <Route path="/update/:id" element={<UpdateCustomPokemon />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
