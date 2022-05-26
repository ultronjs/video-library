import { createContext, useContext, useReducer } from "react";
import instance from "../utils/axios";
import { playListReducer } from "../reducers";
import { useToast } from "./toastContext";

const PlayListContext = createContext({ playlists: [] });

const PlayListProvider = ({ children }) => {
    const { addToast } = useToast();
    const getPlayListsData = async () => {
      try {
        const { status, data } = await instance.get("/user/playlists", {
          headers: {
            Accept: "*/*",
            authorization: localStorage.getItem("token"),
          },
        });
        if (status === 200) {
          playListsDispatch({ type: "SET_DATA", payload: data.playlists });
          return data.playlists;
        }
      } catch (error) {
        addToast({ type: "Error", msg: "Unable to Fetch Data From the API" });
        console.error(error);
      }
    };
    const postPlayListsData = async (playlist) => {
      try {
        const { status, data } = await instance({
          method: "post",
          url: "/user/playlists",
          data: {
            playlist,
          },
          headers: {
            Accept: "*/*",
            authorization: localStorage.getItem("token"),
          },
        });
        if (status === 201) {
          playListsDispatch({
            type: "ADD_PLAYLIST",
            payload: playlist,
          });
          return {status:status ,data: data.playlists};
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Create the Playlist",
        });
        console.error(error);
      }
    };
    const postVideoInPlayList = async (playlistId,video) => {
      console.log(video,playlistId)
      try {
        const { status, data } = await instance({
          method: "post",
          url: `/user/playlists/${playlistId}`,
          data: {
            video,
          },
          headers: {
            Accept: "*/*",
            authorization: localStorage.getItem("token"),
          },
        });
        if (status === 201) {
          playListsDispatch({
            type: "ADD_TO_PLAYLIST",
            payload: {id:playlistId,video:video},
          });
          addToast({
            type: "Success",
            msg: "Added Successfully",
          });
          return data.playlist;
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Add Video to the Playlist",
        });
        console.error(error);
      }
    };
    const removeVideoInPlayList = async (playlistId, videoId) => {
      try {
        const { status, data } = await instance({
          method: "delete",
          url: `/user/playlists/${playlistId}/${videoId}`,
          headers: {
            Accept: "*/*",
            authorization: localStorage.getItem("token"),
          },
        });
        if (status === 200) {
          playListsDispatch({
            type: "REMOVE_FROM_PLAYLIST",
            payload: { playlist_id: playlistId, playlist: data.playlist },
          });
          addToast({
            type: "Success",
            msg: "Removed Successfully",
          });
          return data.playlist;
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Remove Video from the Playlist",
        });
        console.error(error);
      }
    };


    const deletePlayListsData = async (id) => {
      try {
        const { status, data } = await instance({
          method: "delete",
          url: `/user/playlists/${id}`,
          headers: {
            Accept: "*/*",
            authorization: localStorage.getItem("token"),
          },
        });
        if (status === 200) {
          playListsDispatch({
            type: "REMOVE_PLAYLIST",
            payload: id,
          });
          addToast({
            type: "Success",
            msg: "Deleted Successfully",
          });
          return data.playlists;
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Delete the Playlist",
        });
        console.error(error);
      }
    };
    const initialPlayListsState = [];
    const [playlists, playListsDispatch] = useReducer(
      playListReducer,
      initialPlayListsState
    );

    return (
      <PlayListContext.Provider
        value={{
          playlists,
          getPlayListsData,
          postPlayListsData,
          deletePlayListsData,
          postVideoInPlayList,
          removeVideoInPlayList
        }}
      >
        {children}
      </PlayListContext.Provider>
    );
};

const usePlayLists = () => useContext(PlayListContext);

export { PlayListProvider, usePlayLists };
