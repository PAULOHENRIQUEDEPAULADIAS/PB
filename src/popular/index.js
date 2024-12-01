import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import MovieCard from "../card/card.jsx"; // Importando o MovieCard

const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;

export default function Popular() {
  const [data, setData] = useState([]);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleMoreClick = (id) => {
    setSelectedMovieId(id);
    console.log(`Selected movie ID: ${id}`);
  };

  return (
    <div className={style.app}>
      <h1>Popular</h1>
      <div className={style.popularContainer}>
        <div className={style.popular}>
          {data.map((item) => (
            <MovieCard
              key={item.id}
              movie={item}
              onMoreClick={handleMoreClick}
              imageBaseUrl={imageBaseUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
