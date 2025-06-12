/**
 * Json Server on: 'http://localhost:3001'
 */

const BASE_URL = "http://localhost:3001";

// User Login
export const loginUser = async (username, password) => {
  console.log("Login con:", username, password);
  const res = await fetch(
    `${BASE_URL}/users?username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`
  );
  const users = await res.json();
  console.log("Risultato:", users);
  const user = users.length > 0 ? users[0] : null;

  return user;
};

// Get custom Pokémon
export const fetchCustomPokemon = async () => {
  const res = await fetch(`${BASE_URL}/custom-pokemon`);
  if (!res.ok) throw new Error("Error: Cannot get custom Pokémon");
  const data = await res.json();

  return data;
};

// Create custom Pokémon
export const createCustomPokemonApi = async (customPokemon) => {
  const res = await fetch(`${BASE_URL}/custom-pokemon`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customPokemon),
  });
  const data = await res.json();

  return data;
};

// Update custom Pokémon
export const updateCustomPokemonApi = async (customPokemon) => {
  const res = await fetch(`${BASE_URL}/custom-pokemon/${customPokemon.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customPokemon),
  });
  if (!res.ok) throw new Error("Error: Cannot update the custom Pokémon");
  const data = await res.json();

  return data;
};

// Delete custom Pokémon
export const deleteCustomPokemonApi = async (id) => {
  const res = await fetch(`${BASE_URL}/custom-pokemon/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error: Cannot delete the custom Pokémon");

  return id;
};
