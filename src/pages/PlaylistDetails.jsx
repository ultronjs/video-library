import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Nav, VideoCard } from "../components";
import { usePlayLists } from '../context';
import "../index.css";

function PlaylistDetails() {
    const { playlistId } = useParams();
    const {playlists,getPlayListsData} = usePlayLists();
    const [playList,setPlayList]  = useState([])
    useEffect(() => {
      getPlayListsData()
      setPlayList(playlists.filter(playlist => playlist._id === playlistId))
      }, [playlists]);
  return (
    <div className="main_container">
      <Nav />
      {playList.length > 0 && (
        <>
          <h2 className="page_title">{playList[0].title}</h2>
          <div className="video_container">
            {playList[0].videos &&
              playList[0].videos.map((video) => (
                <VideoCard video={video} playListId={playList[0]._id} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PlaylistDetails