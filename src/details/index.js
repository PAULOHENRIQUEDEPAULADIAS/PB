import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Nav from "../navbar";
import Footer from "../footer";

const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
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
        setMovie(result);
        console.log(result); 
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      <Nav />
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.overview || "Overview not available"}</p> 
        {movie.poster_path && (
          <img
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "300px", height: "auto" }}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
