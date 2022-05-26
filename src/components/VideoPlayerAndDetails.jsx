import React, { useState,useEffect} from "react";import "./Row/Row.css";
import {
  MdAddCircleOutline,
  MdCheckCircleOutline,
  MdPlaylistAdd,
} from "react-icons/md";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import movieTrailer from "movie-trailer";
import { useNavigate, useParams } from "react-router";
import { useVideos } from "../context";
import { useLikedVideo, usePlayLists, useWatchLater,useAuth } from "../context";
import PlayListModal from "./PlayListModal/PlayListModal";
import { useHistory } from "../context/historyContext";



function VideoPlayerAndDetails() {
    const { videoId } = useParams();
    const { videos, getVideosData } = useVideos();
    const [video, setVideo] = useState({});
    const [trailerUrl, setTrailerUrl] = useState("");
    const { likedVideo, postLikedVideoData, deleteLikedVideoData } = useLikedVideo();
    const { watchLater, postWatchLaterData, deleteWatchLaterData } = useWatchLater(); 
    const [showPlayListModal, setShowPlayListModal] = useState(false);
    const { signInStatus } = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        
        getVideosData();
        if(videos.length){
          console.log("i m here")
        const video = videos.filter((video) => video._id === videoId);
        console.log(video,"...",likedVideo,"...",watchLater)
        console.log(video.liked,video.addedToWatchLater)
        setVideo(video[0]);
        movieTrailer(
          video[0]?.title ||
            video[0]?.name ||
            video[0]?.original_name ||
            video[0]?.original_title ||
            ""
        )
          .then((url) => {
            const urlParam = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParam.get("v"));
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          })}
        },
      [videoId]);

    video.liked = likedVideo.some((element) => element._id === videoId);
    video.addedToWatchLater = watchLater.some(
      (element) => element._id === videoId
    );
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      origin: "http://localhost:3000",
      enablejsapi:1
    },
  };
  
  return (
    <>
      {video && (
        <div className="main_container">
          <iframe
            id="ytplayer"
            type="text/html"
            width="100%"
            height="75%"
            src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1&rel=0&origin=http://localhost.com/3000`}
            frameBorder="0"
          ></iframe>
          <h2 className="p-x-small">{video.title}</h2>
          <p className="px-x-small">{video.overview}</p>
          {signInStatus.status ? (
            <div className="flex flex-jc-flex-start gap-m p-x-small video_card_hover_actions">
              {video.liked ? (
                <div
                  className="flex flex-ai-center gap-s video_card_hover_action mx-x-small"
                  onClick={() => deleteLikedVideoData(video._id)}
                >
                  <AiFillLike size={25} />
                  <span>Liked</span>
                </div>
              ) : (
                <div
                  className="flex flex-ai-center gap-s video_card_hover_action mx-x-small"
                  onClick={() => postLikedVideoData(video)}
                >
                  <AiOutlineLike size={25} />
                  <span>Like</span>
                </div>
              )}

              {video.addedToWatchLater ? (
                <div
                  className="flex flex-ai-center gap-s video_card_hover_action mx-x-small"
                  onClick={() => deleteWatchLaterData(video._id)}
                >
                  <MdCheckCircleOutline size={25} />
                  <span>Remove From Watch Later</span>
                </div>
              ) : (
                <div
                  className="flex flex-ai-center gap-s video_card_hover_action mx-x-small"
                  onClick={() => postWatchLaterData(video)}
                >
                  <MdAddCircleOutline size={25} />
                  <span>Add to Watch Later</span>
                </div>
              )}
              <div
                className="flex flex-ai-center gap-s video_card_hover_action mx-x-small"
                onClick={() => setShowPlayListModal(true)}
              >
                <MdPlaylistAdd size={25} />
                <span>Save to Playlists</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-jc-flex-start gap-m p-x-small video_card_hover_actions">
              <div
                className="flex flex-ai-center gap-s video_card_hover_action mx-x-small"
                onClick={() => navigate("/login")}
              >
                <AiOutlineLike size={25} />
                <span>Like</span>
              </div>
              <div
                className="flex flex-ai-center gap-s video_card_hover_action mx-x-small"
                onClick={() => navigate("/login")}
              >
                <MdAddCircleOutline size={25} />
                <span>Add to Watch Later</span>
              </div>
              <div
                className="flex flex-ai-center gap-s video_card_hover_action mx-x-small"
                onClick={() => navigate("/login")}
              >
                <MdPlaylistAdd size={25} />
                <span>Save to Playlists</span>
              </div>
            </div>
          )}
          {showPlayListModal && (
            <PlayListModal
              setShowPlayListModal={setShowPlayListModal}
              video={video}
            />
          )}
        </div>
      )}
    </>
  );
}

      {
        /* {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />} */
      }
export default VideoPlayerAndDetails