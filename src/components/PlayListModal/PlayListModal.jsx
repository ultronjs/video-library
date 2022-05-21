import React,{ useState,useEffect } from 'react'
import {
  MdAddCircleOutline,
  MdOutlineCancel,
  MdCheckCircleOutline,
  MdPlaylistAdd,
} from "react-icons/md";
import "./PlayListModal.css"
import "../../index.css"
import { usePlayLists } from '../../context/playlistContext';
import { v4 as uuid } from "uuid";

function PlayListModal(props) {
  const [showCreateOption,setShowCreateOption] = useState(false)
  const {
    playlists,
    getPlayListsData,
    postPlayListsData,
    postVideoInPlayList,
    removeVideoInPlayList,
  } = usePlayLists();
  const initialCreatePlayListObj = {
    _id: uuid(),
    title: "",
    description: "",
    videos: [],
  };
  const [createPlayList,setCreatePlayList] = useState(initialCreatePlayListObj)
  console.log(createPlayList)
  useEffect(() => {
    getPlayListsData()
  }, [playlists])

  return (
    <>
      <div className="modal_bg">
        <div
          className={
            showCreateOption || playlists.length === 0
              ? "modal playlist_modal_create"
              : "modal playlist_modal"
          }
        >
          <div className="modal_header flex flex-jc-space-between pt-x-small">
            <h2>Save to...</h2>
            <MdOutlineCancel
              className="playlist_modal_dismiss"
              size={25}
              onClick={() => props.setShowPlayListModal(false)}
            />
          </div>
          <div className="modal_body flex flex-col">
            <div className="modal_playlist_list">
              {playlists.length > 0 &&
                playlists.map((playlist) => {
                  return (
                    <div className="flex flex-ai-center gap-s pb-x-small">
                      <input
                        defaultChecked={
                          playlist.videos.length > 0 &&
                          playlist.videos.filter(
                            (video) => video._id === props.video._id
                          ).length>0
                            ? true
                            : false
                        }
                        key={playlist._id}
                        type="checkbox"
                        className="input_playlist_checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            postVideoInPlayList(playlist._id, props.video);
                          } else {
                            removeVideoInPlayList(
                              playlist._id,
                              props.video._id
                            );
                          }
                        }}
                      />
                      <label>{playlist.title}</label>
                    </div>
                  );
                })}
            </div>
          </div>
          {showCreateOption || playlists.length === 0 ? (
            <div className="playlist_create container">
              <div className="input_group">
                <label className="input_label">Create New Playlist</label>
                <input
                  className="input_regular input_corner mb-x-small"
                  placeholder="Enter the Title"
                  onChange={(e) =>
                    setCreatePlayList((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                />
                <input
                  className="input_regular input_corner"
                  placeholder="Enter the Description"
                  onChange={(e) =>
                    setCreatePlayList((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="modal_footer playlist_modal_footer">
                <button
                  className="btn btn_primary"
                  onClick={() => {
                    postPlayListsData(createPlayList)
                    setShowCreateOption(false);
                    setCreatePlayList(initialCreatePlayListObj)
                  }}
                >
                  Save
                </button>
                <button
                  className="btn btn_primary_outline"
                  onClick={() => setShowCreateOption(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              className="btn btn_primary"
              onClick={() => {
                setShowCreateOption(true);
              }}
            >
              Create
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default PlayListModal