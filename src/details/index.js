import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Nav from "../navbar";
import Footer from "../footer";
import styles from "./style.module.css";
import MovieCard from "../card/card.jsx";

const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const [cast, setCast] = useState([]);

  const [similarMovies, setSimilarMovies] = useState([]);
  const [data, setData] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const goToHome = () => {
    navigate("/"); 
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prevComments) => [
        ...prevComments,
        { user: "User123", text: newComment.trim() },
      ]);
      setNewComment("");
      setShowModal(false);
    }
  };

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

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const result = await response.json();
        setMovie(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${privateKey}`,
            },
          }
        );
        const result = await response.json();
        setCast(result.cast.slice(0, 10));
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    fetchMovieCredits();
  }, [id]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${privateKey}`,
            },
          }
        );
        const result = await response.json();

        setSimilarMovies(result.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    fetchSimilarMovies();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Nav />
        <p className={styles.errorMessage}>Error: {error}</p>
        <button
          onClick={goToHome} className={styles.goBackButton}
        >
          Go Back
        </button>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.loadingContainer}>
        <Nav />
        <p className={styles.loadingMessage}>Loading...</p>
        <Footer />
      </div>
    );
  }

  const handleMoreClick = (id) => {
    navigate(`/details/${id}`);
  };
  
  return (
    <>
      <Nav />
      <div className={styles.detailsContainer}>
        {movie.poster_path && (
          <img
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
        )}
        <div className={styles.infoContainer}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.overview}>
            {movie.overview || "Overview not available"}
          </p>
          <h4 className={styles.releaseDate}>
            Release Date:{" "}
            {movie.release_date
              ? new Date(movie.release_date).toLocaleDateString("en-GB")
              : "Not available"}
          </h4>
          <p className={styles.genres}>
            Genres:{" "}
            {movie.genres?.map((genre) => genre.name).join(", ") ||
              "Not available"}
          </p>
          <p className={styles.rating}>
            Rating: {movie.vote_average || "N/A"}/10
          </p>
          <p className={styles.runtime}>
            Runtime: {movie.runtime ? `${movie.runtime} min` : "Not available"}
          </p>
          <a
            href={`https://www.youtube.com/results?search_query=${movie.title}+trailer`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.trailerButton}
          >
            Watch Trailer on YouTube
          </a>
          <button onClick={(goToHome)} className={styles.goBackButton}>
            Go Back
          </button>
        </div>

        <div className={styles.commentsSection}>
          <h3>Comments</h3>
          <div className={styles.commentLine}>
            {comments.length > 0 ? (
              <p>
                <strong>{comments[comments.length - 1].user}:</strong>{" "}
                {comments[comments.length - 1].text}
              </p>
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
            <button
              onClick={() => setShowModal(true)}
              className={styles.viewCommentsButton}
            >
              View/Add Comments
            </button>
          </div>

          {showModal && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h3>All Comments</h3>
                <div className={styles.commentList}>
                  {comments.map((comment, index) => (
                    <p key={index}>
                      <strong>{comment.user}:</strong> {comment.text}
                    </p>
                  ))}
                </div>
                <textarea
                  placeholder="Add a comment..."
                  className={styles.textarea}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  onClick={handleAddComment}
                  className={styles.submitCommentButton}
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className={styles.closeModalButton}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.castCarousel}>
          <h3>Elenco</h3>
          <div className={styles.carousel}>
            {cast.map((actor) => (
              <div key={actor.id} className={styles.castCard}>
                <img
                  src={
                    actor.profile_path
                      ? `${imageBaseUrl}${actor.profile_path}`
                      : "default_image.jpg"
                  }
                  alt={actor.name}
                  className={styles.castImage}
                />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.similarMoviesSection}>
          <h3>Similar Movies</h3>
          <div className={styles.carousel}>
            {similarMovies.length > 0 ? (
              similarMovies.map((item) => (
                  <MovieCard
                    key={item.id}
                    movie={item}
                    onMoreClick={handleMoreClick}
                    imageBaseUrl={imageBaseUrl}
                  />
                ))
            ) : (
              <p>No similar movies found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
