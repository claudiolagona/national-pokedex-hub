/**
 * Json Server on: 'http://localhost:3001'
 */

const BASE_URL = "http://localhost:3001";

// User Login
export const loginUser = async (username, password) => {
  try {
    const res = await fetch(
      `${BASE_URL}/users?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`
    );
    const users = await res.json();
    const user = users.length > 0 ? users[0] : null;

    return user;
  } catch (error) {
    console.error(error)
  }
};

// Get custom Pokémon
export const fetchCustomPokemon = async () => {
  try {
    const res = await fetch(`${BASE_URL}/custom-pokemon`);
    if (!res.ok) throw new Error("Error: Cannot get custom Pokémon");
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// Create custom Pokémon
export const createCustomPokemonApi = async (customPokemon) => {
  try {
    const res = await fetch(`${BASE_URL}/custom-pokemon`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customPokemon),
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// Update custom Pokémon
export const updateCustomPokemonApi = async (customPokemon) => {
  try {
    const res = await fetch(`${BASE_URL}/custom-pokemon/${customPokemon.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customPokemon),
    });
    if (!res.ok) throw new Error("Error: Cannot update the custom Pokémon");
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// Delete custom Pokémon
export const deleteCustomPokemonApi = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/custom-pokemon/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error: Cannot delete the custom Pokémon");

    return id;
  } catch (error) {
    console.error(error);
  }
};
