import React, { useState } from "react";
import "./Row/Row.css";
import {
  MdAddCircleOutline,
  MdCheckCircleOutline,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import {
  useLikedVideo,
  usePlayLists,
  useWatchLater,
  useHistory,
} from "../context";
import { useNavigate } from "react-router";

function HistoryVideoCard({ video, playListId }) {
  const navigate = useNavigate();
  const { likedVideo, postLikedVideoData, deleteLikedVideoData } =
    useLikedVideo();
  const { watchLater, postWatchLaterData, deleteWatchLaterData } =
    useWatchLater();
  const { history, postHistoryVideoData, deleteHistoryVideoData } =
    useHistory();
  const playButtonHandler = (video) => {
    if (!history.some((element) => element._id === video._id)) {
      deleteHistoryVideoData(video._id);
    }
    navigate(`/video/${video._id}`);
  };
  video.liked = likedVideo.some((element) => element._id === video._id);
  video.addedToWatchLater = watchLater.some(
    (element) => element._id === video._id
  )

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <>
      <div className="history_video_card flex">
        <img
          key={video._id}
          className="history_card_img"
          src={video.backdrop_path}
          alt={video.name}
        />
        <div className="history_video_card_body">
          <div className="history_video_card_body_content">
            <h4>{video?.title || video?.name || video?.original_name}</h4>
            <p>{truncate(video.overview, 140)}</p>
          </div>
          <div className="history_video_card_body_actions">
            <BsFillPlayCircleFill
              className="video_card_hover_action"
              size={25}
              onClick={() => playButtonHandler(video)}
            />
            {video.liked ? (
              <AiFillLike
                className="video_card_hover_action"
                size={25}
                onClick={() => deleteLikedVideoData(video._id)}
              />
            ) : (
              <AiOutlineLike
                className="video_card_hover_action"
                size={25}
                onClick={() => postLikedVideoData(video)}
              />
            )}

            {video.addedToWatchLater ? (
              <MdCheckCircleOutline
                onClick={() => deleteWatchLaterData(video._id)}
                className="video_card_hover_action"
                size={25}
              />
            ) : (
              <MdAddCircleOutline
                onClick={() => postWatchLaterData(video)}
                className="video_card_hover_action"
                size={25}
              />
            )}
            <MdOutlineDeleteOutline
              className="icon"
              size={30}
              onClick={() => deleteHistoryVideoData(video._id)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryVideoCard;
