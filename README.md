# Project Title: National Pokédex Hub

# Description:

The National Pokédex Hub is a web application built with React that allows users to explore, manage and customize their favorite Pokémon.
It provides both regular users and admin users with tailored experiences, including browsing Pokémon data, managing favorites and creating
custom Pokémon.

# Key Features:

- 🔍 Search and Filter: users can search for Pokémon by name, type and generation.
- ⭐ Favorites: logged-in users can save and view their favorite Pokémon.
- 👤 User Profile: each user has a dedicated profile page displaying their informations and favorite Pokémon.
- 🧑‍💻 Admin Dashboard: admins have access to a private dashboard that displays the most recent custom Pokémon created.
- ✍️ Custom Pokémon Creation: admins can create, edit and delete custom Pokémon using a local JSON server.
- 🧭 Routing: React Router is used to manage navigation between pages like Home, Profile, Favorites, etc.
- 🧠 State Management: Redux is used to manage global application state (user, favorites, Custom Pokémon, Pokémon list).
- 💅 Tailwind CSS: styling is handled with Tailwind CSS for a responsive and clean UI.
- 🎮 Gamified UX: friendly illustrations and small animations create a fun and engaging user experience.
- ❌ Custom 404 Page: users are greeted with a personalized 404 page when they navigate to an unknown route.

# Technology Used:

- React
- Redux Toolkit
- React Router
- Tailwind CSS
- JSON Server
- PokeAPI (<a href="https://pokeapi.co/" target="_blank">https://pokeapi.co/</a>)
- Framer Motion

# Goal:

To provide a fun, educational and interactive platform where Pokémon fans can discover, favorite and even design their own Custom Pokémon — all
while distinguishing between user roles in a clean, gamified interface.

# Installation:

1. Clone the repository:

```bash
git clone https://github.com/claudiolagona/national-pokedex-hub
cd national-pokedex-hub
```

2. Install dependencies:

```bash
npm install
```

3. Start the JSON Server:

```bash
cd server
npm install
npm run dev
```

4. Run the React application:

```bash
npm run dev
```

# Folder Structure Overview

```markdown
- /src
  ├── /assets # Images and icons
  ├── /components # Reusable components
  ├── /pages # Route-level pages
  ├── /redux # Redux store, actions and reducers
  ├── /api # API utilities (PokeAPI and JSON Server)
  ├── App.jsx
  └── index.js
```

# Authentication Info

This project uses mocked authentication for demo purposes.

| Username | Password     | Role  |
| -------- | ------------ | ----- |
| ash      | professoroak | user  |
| admin    | admin        | admin |

# Author

Created with ❤️ by Claudio La Gona
[LinkedIn](https://linkedin.com/in/claudio-lagona) | [Portfolio](https://www.claudiolagona.com)
