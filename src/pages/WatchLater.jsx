import React,{useEffect} from 'react'
import {Nav,VideoCard} from "../components";
import { useHistory, useWatchLater } from '../context';
import "../index.css"
import "../components/Row/Row.css";

function WatchLater() {
  const { watchLater, getWatchLaterData } = useWatchLater();
  const {getHistoryVideoData} = useHistory()

  useEffect(() => {
    getWatchLaterData()
    getHistoryVideoData();
  }, [])
  
  return (
    <div className="main_container">
      <Nav />
      <h2 className="page_title">My List</h2>
      <div className="video_container">
          {watchLater && watchLater.map((video) => <VideoCard video={video} />)}
      </div>
    </div>
  );
}

export default WatchLater