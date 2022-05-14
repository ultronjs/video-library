import { createContext, useContext, useReducer } from "react";
import instance from "../utils/axios";
import { likedVideoReducer } from "../reducers";
import { useToast } from "./toastContext";

const LikedVideoContext = createContext({ likedVideos: [] });

const LikedVideoProvider = ({ children }) => {
  const { addToast } = useToast();

  const getLikedVideoData = async () => {
    try {
      const { status, data } = await instance.get("/user/likes", {
        headers: {
          Accept: "*/*",
          authorization: localStorage.getItem("token"),
        },
      });
      if (status === 200) {
        likedVideoDispatch({ type: "SET_DATA", payload: data.likes });
        return data.likes;
      }
    } catch (error) {
      addToast({ type: "Error", msg: "Unable to Fetch Data From the API" });
      console.error(error);
    }
  };
  const postLikedVideoData = async (video) => {
    try {
      const { status, data } = await instance({
        method: "post",
        url: "/user/likes",
        data: {
          video,
        },
        headers: {
          Accept: "*/*",
          authorization: localStorage.getItem("token"),
        },
      });
      if (status === 201) {
        likedVideoDispatch({
          type: "ADD_TO_LIKED_VIDEOS",
          payload: video,
        });
        return data.likes;
      }
    } catch (error) {
      addToast({
        type: "Error",
        msg: "Unable to Save the Item in Liked Videos",
      });
      console.error(error);
    }
  };
  const deleteLikedVideoData = async (id) => {
    try {
      const { status, data } = await instance({
        method: "delete",
        url: `/user/likes/${id}`,
        headers: {
          Accept: "*/*",
          authorization: localStorage.getItem("token"),
        },
      });
      if (status === 200) {
        likedVideoDispatch({
          type: "REMOVE_FROM_LIKED_VIDEOS",
          payload: id,
        });
        return data.likes;
      }
    } catch (error) {
      addToast({
        type: "Error",
        msg: "Unable to Remove Item from Liked Videos",
      });
      console.error(error);
    }
  };

  const initialLikedVideoState = [];
  const [likedVideo, likedVideoDispatch] = useReducer(
    likedVideoReducer,
    initialLikedVideoState
  );
  return (
    <LikedVideoContext.Provider
      value={{
        likedVideo,
        getLikedVideoData,
        postLikedVideoData,
        deleteLikedVideoData,
      }}
    >
      {children}
    </LikedVideoContext.Provider>
  );
};
const useLikedVideo = () => useContext(LikedVideoContext);

export { LikedVideoProvider, useLikedVideo };
