import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

import Favoritos from "../img/heart.svg";
import Eye from "../img/eye.svg";

const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;

export default function Popular() {
  const [data, setData] = useState([]);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

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

  return (
    <div className={style.app}>
      <h1>Popular</h1>
      <div className={style.popularContainer}>
        <div className={style.popular}>
          {data.map((item) => (
            <div key={item.id} className={style.item}>
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

                <Link to={`/details/${item.id}`}>
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
      </div>
    </div>
  );
}
