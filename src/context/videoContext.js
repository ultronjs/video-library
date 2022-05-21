import { createContext, useContext, useReducer } from "react";
import instance from "../utils/axios";
import { videoReducer } from "../reducers";
import { useToast } from "./toastContext";

const VideosContext = createContext({ videos: [] });

const VideosProvider = ({ children }) => {
  const { addToast } = useToast();

  const getVideosData = async () => {
    try {
      const { status, data } = await instance.get("/videos", {
        headers: {
          Accept: "*/*",
        },
      });
      if (status === 200) {
        videosDispatch({ type: "SET_DATA", payload: data.videos });
        return data.videos;
      }
    } catch (error) {
      addToast({ type: "Error", msg: "Unable to Fetch Data From the API" });
      console.error(error);
    }
  };
  const getVideoById = async (id) => {
    try {
      const { status, data } = await instance.get(`/video/${id}`, {
        headers: {
          Accept: "*/*",
        },
      });
      if (status === 200) {
        return data.video;
      }
    } catch (error) {
      addToast({ type: "Error", msg: "Unable to Fetch Data From the API" });
      console.error(error);
    }
  };
  const initialVideoState = [];
  const [videos, videosDispatch] = useReducer(
    videoReducer,
    initialVideoState
  );
  return (
    <VideosContext.Provider
      value={{
        videos,
        getVideosData,
        getVideoById,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};
const useVideos = () => useContext(VideosContext);

export { VideosProvider, useVideos };
