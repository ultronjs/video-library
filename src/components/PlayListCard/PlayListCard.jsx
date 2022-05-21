import React from 'react'
import "../../index.css"
import "./PlayListCard.css"
import {
  MdOutlineDeleteOutline,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { usePlayLists } from '../../context/playlistContext'
import { useNavigate } from "react-router-dom";

function PlayListCard(props) {
  const navigate =useNavigate()
  const {deletePlayListsData} = usePlayLists()
  return (
    <div className="playlist_card_container">
      <div className="flex flex-jc-space-between">
        <h2>{props.playlist.title}</h2>
        <MdOutlineDeleteOutline
          className="icon"
          size={30}
          onClick={() => deletePlayListsData(props.playlist._id)}
        />
      </div>
      <div className="flex flex-jc-space-between">
        <div>
          <p>{props.playlist.description}</p>
          <span>{props.playlist.videos.length} Videos</span>
        </div>
        <MdOutlineArrowForwardIos
          className="icon"
          size={25}
          onClick={() => navigate(`/myplaylists/${props.playlist._id}`)}
        />
      </div>
    </div>
  );
}

export default PlayListCard