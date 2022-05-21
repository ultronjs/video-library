import React from 'react'
import {
  Nav,
  VideoPlayerAndDetails,
  RecommededVideosList,
} from "../components";
import "../index.css"

function VideoDetail() {
  return (
    <div className="main_container">
      <Nav />
      <h2 className="page_title"></h2>
      <div className="video_page_container">
        <div className="video_player_details">
          <VideoPlayerAndDetails />
        </div>
        <div className="recommeded_videos">
          <RecommededVideosList />
        </div>
      </div>
    </div>
  );
}

export default VideoDetail