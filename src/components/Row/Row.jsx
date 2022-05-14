import React from "react";
import { useState, useEffect } from "react";
import axios from "../../utils/axios"
import "./Row.css";
import VideoPreviewModal from "../VideoPreviewModal";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useLikedVideo, useWatchLater } from "../../context";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row(props) {
  const [video, setVideo] = useState({});
  const { likedVideo } = useLikedVideo();
  const { watchLater } = useWatchLater();
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showvideoPreviewModal, setShowVideoPreviewModal] = useState(false);
  console.log(likedVideo);
  console.log(watchLater);
  
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (video) => {
    setShowVideoPreviewModal(true);
    setVideo(video);
  };

  // const handleClick = (movie) => {
  //   console.log(movie);
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
  //       .then((url) => {
  //         const urlParam = new URLSearchParams(new URL(url).search);
  //         setTrailerUrl(urlParam.get("v"));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         alert(error);
  //       });
  //   }
  // };
  return (
    <div className="row">
      {/*title*/}
      <h2 className="row_title">{props.title}</h2>
      {/*constainer -> posters*/}
      <div className="row_posters">
        {props.videos
          .map((video) => {
            video.liked = likedVideo.some(
              (element) => element._id === video._id
            );
            video.addedToWatchLater =  watchLater.some(element => element._id === video._id)
            return(
            <img
              key={video.id}
              onClick={() => handleClick(video)}
              className={`row_poster ${props.isLargeRow && "row_posterLarge"}`}
              src={
                props.isLargeRow
                  ? `${baseURL}${video.poster_path}`
                  : `${baseURL}${video.backdrop_path}`
              }
              alt={video.name}
            />
          )})}
        {showvideoPreviewModal && (
          <VideoPreviewModal
            showvideoPreviewModal={showvideoPreviewModal}
            video={video}
            setShowVideoPreviewModal={setShowVideoPreviewModal}
          />
        )}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
