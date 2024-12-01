import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import Favoritos from "../img/heart.svg";
import Eye from "../img/eye.svg";

import { useMovies } from "../context/moviecontext.js";

const MovieCard = ({ movie, onMoreClick, imageBaseUrl }) => {
  const { favorites, watched, toggleFavorite, toggleWatched } = useMovies();

  // Verifica se o filme está em Favoritos e Assistidos
  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const isWatched = watched.some((watch) => watch.id === movie.id);

  return (
    <div className={styles.card}>
      <img
        src={`${imageBaseUrl}${movie.poster_path}`}
        alt={movie.title}
        className={styles.poster}
      />
      <p className={styles.title}>{movie.title}</p>
      <p className={styles.score}>Score {movie.vote_average.toFixed(1)}</p>
      <div className={styles.btns}>
        {/* Botão de Favoritos */}
        <button
          className={`${styles.iconBtn} ${isFavorite ? styles.active : ""}`}
          title="Favoritos"
          onClick={() => toggleFavorite(movie)}
        >
          <img src={Favoritos} alt="Favoritos" />
        </button>

        {/* Link para detalhes */}
        <Link to={`/details/${movie.id}`}>
          <button
            className={styles.textBtn}
            title="Detalhes"
            onClick={() => onMoreClick(movie.id)}
          >
            More
          </button>
        </Link>

        {/* Botão de Assistidos */}
        <button
          className={`${styles.iconBtn} ${isWatched ? styles.active : ""}`}
          title="Assistidos"
          onClick={() => toggleWatched(movie)}
        >
          <img src={Eye} alt="Assistidos" />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
