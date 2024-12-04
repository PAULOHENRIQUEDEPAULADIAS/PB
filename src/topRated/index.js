import React, { useState, useEffect } from "react";
import style from "./style.module.css";

import MovieCard from "../card/card.jsx";

const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;

export default function OnTheater() {
  const [data, setData] = useState([]);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${privateKey}`,
          },
        }
      );
      const result = await response.json();
      setData(result.results);
    } catch (error) {
      console.error("Erro ao realizar o fetch", error);
    }
  };

  const scrollCarousel = (direction) => {
    const carousel = document.querySelector(`.${style.carousel}`);
    const scrollAmount = 300;
    carousel.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMoreClick = (id) => {
    setSelectedMovieId(id);
    console.log(`Selected movie ID: ${id}`);
  };

  return (
    <div className={style.app}>
      <h1>Top Rated 8.5+</h1>
      <div className={style.carouselContainer}>
        <button
          className={style.scrollButton}
          onClick={() => scrollCarousel(-1)}
        >
          {"<"}
        </button>
        <div className={style.carousel}>
          {data.map((item) => (
            <MovieCard
              key={item.id}
              movie={item}
              onMoreClick={handleMoreClick}
              imageBaseUrl={imageBaseUrl}
            />
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
