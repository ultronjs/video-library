import React from 'react'
import "../index.css"
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {
  MdAddCircleOutline,
  MdOutlineCancel,
  MdCheckCircleOutline,
} from "react-icons/md";
import {BsFillPlayCircleFill} from "react-icons/bs"
import { useLikedVideo, useWatchLater} from "../context"

function VideoPreviewModal(props) {

  const { video, setShowVideoPreviewModal } = props; 
  const { postWatchLaterData,deleteWatchLaterData} = useWatchLater()
  const { postLikedVideoData, deleteLikedVideoData } = useLikedVideo();
  console.log(video);
  const baseURL = "https://image.tmdb.org/t/p/original/";
  return (
    <>
      <div className="modal_bg">
        <div className="modal">
          <MdOutlineCancel
            className="modal_dismiss"
            size={30}
            onClick={() => setShowVideoPreviewModal(false)}
          />
          <div className="modal_header">
            <img
              className="modal_img"
              src={`${baseURL}${video.backdrop_path}`}
              alt={video.name}
            />
          </div>
          <div className="modal_footer">
            <BsFillPlayCircleFill className="modal_action" size={35} />
            {video.liked ? (
              <AiFillLike
                className="modal_action"
                size={35}
                onClick={() => deleteLikedVideoData(video._id)}
              />
            ) : (
              <AiOutlineLike
                className="modal_action"
                size={35}
                onClick={() => postLikedVideoData(video)}
              />
            )}

            {video.addedToWatchLater ? (
              <MdCheckCircleOutline
                onClick={() => deleteWatchLaterData(video._id)}
                className="modal_action"
                size={35}
              />
            ) : (
              <MdAddCircleOutline
                onClick={() => postWatchLaterData(video)}
                className="modal_action"
                size={35}
              />
            )}
          </div>
          <div className="modal_body">
            <h2>{video.title}</h2>
            <span>Category: {video.category}</span>
            <p>{video.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPreviewModal;