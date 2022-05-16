import React,{ useState } from 'react'
import "./Row/Row.css"
import {
  MdAddCircleOutline,
  MdOutlineCancel,
  MdCheckCircleOutline,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useLikedVideo, usePlayLists, useWatchLater } from '../context';

function VideoCard({ video, playListId }) {
  const [hover, setHover] = useState(false);
  const { likedVideo, postLikedVideoData, deleteLikedVideoData } =
    useLikedVideo();
  const { watchLater, postWatchLaterData, deleteWatchLaterData } =
    useWatchLater();
  const { removeVideoInPlayList } = usePlayLists();

  video.liked = likedVideo.some((element) => element._id === video._id);
  video.addedToWatchLater = watchLater.some(
    (element) => element._id === video._id
  );

  return (
    <>
      {!hover ? (
        <img
          key={video.id}
          className="video_poster"
          src={video.backdrop_path}
          alt={video.name}
          onMouseOver={() => {
            setHover(true);
          }}
        />
      ) : (
        <div
          className="flex flex-col video_poster"
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <img
            key={video.id}
            className="video_card_hover_img"
            src={video.backdrop_path}
            alt={video.name}
          />
          <div className="flex flex-jc-space-evenly gap-m p-x-small">
            <BsFillPlayCircleFill
              className="video_card_hover_action"
              size={25}
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
            {playListId && (
              <MdOutlineDeleteOutline
                className="icon"
                size={30}
                onClick={() => removeVideoInPlayList(playListId, video._id)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default VideoCard