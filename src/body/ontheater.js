import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import style from "./style.module.css";

import Favoritos from "../img/heart.svg";
import Eye from "../img/eye.svg";

const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;

export default function OnTheater() {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState(null);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; // URL base para as imagens

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${privateKey}`,
          },
        }
      );
      const result = await response.json();
      setData(result.results); // Armazena a lista de filmes
      console.log(result);
    } catch (error) {
      console.error("Erro ao realizar o fetch", error);
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${privateKey}`,
          },
        }
      );
      const result = await response.json();
      setDetails(result); // Armazena os detalhes do filme
      console.log(result);
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme", error);
    }
  };

  const scrollCarousel = (direction) => {
    const carousel = document.querySelector(`.${style.carousel}`);
    const scrollAmount = 300; // Valor de rolagem ajustável
    carousel.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className={style.app}>
      <h1>Em cartaz</h1>
      <div className={style.carouselContainer}>
        <button
          className={style.scrollButton}
          onClick={() => scrollCarousel(-1)}
        >
          {"<"}
        </button>
        <div className={style.carousel}>
          {data.map((item) => (
            <div
              key={item.id}
              className={style.carouselItem}
              onClick={() => fetchMovieDetails(item.id)}
            >
              <img
                src={`${imageBaseUrl}${item.poster_path}`}
                alt={item.title}
                className={style.poster}
              />
              <p className={style.title}>{item.title}</p>
              <p className={style.score}>
                Score {item.vote_average.toFixed(1)}
              </p>
              <div className={style.btns}>
                <button className={style.iconBtn} title="Favoritos">
                  <img src={Favoritos} alt="Favoritos" />
                </button>

                <Link to="/Details">
                  <button className={style.textBtn} title="Detalhes">
                    More
                  </button>
                </Link>

                <button className={style.iconBtn} title="Assistidos">
                  <img src={Eye} alt="Assistidos" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className={style.scrollButton}
          onClick={() => scrollCarousel(1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
