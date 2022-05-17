import React,{useEffect} from 'react'
import { useLikedVideo } from '../context';
import "../index.css";
import "../components/Row/Row.css";
import { Nav, VideoCard } from "../components";

function LikedVideo() {
const { likedVideo, getLikedVideoData } = useLikedVideo();

  useEffect(() => {
    getLikedVideoData()
  }, [])
  
  return (
    <div className="main_container">
      <Nav />
      <h2 className="page_title">Liked Videos</h2>
      <div className="video_container">
          {likedVideo && likedVideo.map((video) => <VideoCard video={video} />)}
      </div>
    </div>
  );
}


export default LikedVideo