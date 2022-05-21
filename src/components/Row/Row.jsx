import React from "react";
import { useState, useEffect } from "react";
import "./Row.css";
import VideoPreviewModal from "../VideoPreviewModal";
import { useLikedVideo, useWatchLater } from "../../context";


function Row(props) {
  const [video, setVideo] = useState({});
  const { likedVideo } = useLikedVideo();
  const { watchLater } = useWatchLater();
  const [showvideoPreviewModal, setShowVideoPreviewModal] = useState(false);
  
  const handleClick = (video) => {
    setShowVideoPreviewModal(true);
    setVideo(video);
  };


  return (
    <div className="row" key={props.key}>
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
              key={video._id}
              onClick={() => handleClick(video)}
              className={`row_poster ${props.isLargeRow && "row_posterLarge"}`}
              src={
                props.isLargeRow
                  ? `${video.poster_path}`
                  : `${video.backdrop_path}`
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
    </div>
  );
}

export default Row;
