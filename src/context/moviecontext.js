import React, { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === movie.id)
        ? prev.filter((fav) => fav.id !== movie.id)
        : [...prev, movie]
    );
  };

  const toggleWatched = (movie) => {
    setWatched((prev) =>
      prev.some((watch) => watch.id === movie.id)
        ? prev.filter((watch) => watch.id !== movie.id) 
        : [...prev, movie] 
    );
  };

  return (
    <MovieContext.Provider value={{ favorites, watched, toggleFavorite, toggleWatched }}>
      {children}
    </MovieContext.Provider>
  );
};
