import React,{useEffect} from 'react'
import { useHistory, usePlayLists } from '../context';
import {Nav,PlayListCard} from "../components"

function MyPlaylists() {
  const { playlists, getPlayListsData } = usePlayLists();
  const {getHistoryVideoData} = useHistory()
  useEffect(() => {
    getPlayListsData()
    getHistoryVideoData();
  }, [])
  
  return (
    <div className="main_container">
      <Nav />
      <h2 className="page_title">PlayLists</h2>
      <div className="video_container">
        {playlists && playlists.map((playlist) => <PlayListCard playlist={playlist} />)}
      </div>
    </div>
  );
}

export default MyPlaylists