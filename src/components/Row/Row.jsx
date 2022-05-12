import React from "react";
import { useState, useEffect } from "react";
import axios from "../../utils/axios"
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row(props) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    (async() => {
      const response = await axios.get("/videos");
      setMovies(response.data.videos);
      return response;
    })();
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    console.log(movie);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          const urlParam = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParam.get("v"));
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };
  return (
    <div className="row">
      {/*title*/}
      <h2 className="row_title">{props.title}</h2>
      {/*constainer -> posters*/}
      <div className="row_posters">
        {movies
          .filter((movie) => movie.category === props.title)
          .map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${props.isLargeRow && "row_posterLarge"}`}
              src={
                props.isLargeRow
                  ? `${baseURL}${movie.poster_path}`
                  : `${baseURL}${movie.backdrop_path}`
              }
              alt={movie.name}
            />
          ))}
      </div>

      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
