// components/MovieCard.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import Favoritos from "../img/heart.svg";
import Eye from "../img/eye.svg";

const MovieCard = ({ movie, onMoreClick, imageBaseUrl }) => {
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
        <button className={styles.iconBtn} title="Favoritos">
          <img src={Favoritos} alt="Favoritos" />
        </button>
        <Link to={`/details/${movie.id}`}>
          <button
            className={styles.textBtn}
            title="Detalhes"
            onClick={() => onMoreClick(movie.id)}
          >
            More
          </button>
        </Link>
        <button className={styles.iconBtn} title="Assistidos">
          <img src={Eye} alt="Assistidos" />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
