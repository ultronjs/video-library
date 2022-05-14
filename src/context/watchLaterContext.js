import { createContext, useContext, useReducer } from "react";
import  instance   from "../utils/axios";
import { watchLaterReducer } from "../reducers";
import { useToast } from "./toastContext";

const WatchLaterContext = createContext({watchLater:[]})

const WatchLaterProvider = ({ children }) => {
  const { addToast } = useToast();

  const getWatchLaterData = async () => {
    try {
      const { status, data } = await instance.get("/user/watchlater", {
        headers: {
          Accept: "*/*",
          authorization: localStorage.getItem("token"),
        },
      });
      if (status === 200) {
        watchLaterDispatch({ type: "SET_DATA", payload: data.watchlater });
        return data.watchlater;
      }
    } catch (error) {
      addToast({ type: "Error", msg: "Unable to Fetch Data From the API" });
      console.error(error);
    }
  };
  const postWatchLaterData = async (video) => {
    try {
      const { status, data } = await instance({
        method: "post",
        url: "/user/watchlater",
        data: {
          video,
        },
        headers: {
          Accept: "*/*",
          authorization: localStorage.getItem("token"),
        },
      });
      if (status === 201) {
        watchLaterDispatch({
          type: "ADD_TO_WATCH_LATER",
          payload: video,
        });
        return data.watchlater;
      }
    } catch (error) {
      addToast({
        type: "Error",
        msg: "Unable to Save the Item in Watch Later",
      });
      console.error(error);
    }
  };
  const deleteWatchLaterData = async (id) => {
    try {
      const { status, data } = await instance({
        method: "delete",
        url: `/user/watchlater/${id}`,
        headers: {
          Accept: "*/*",
          authorization: localStorage.getItem("token"),
        },
      });
      if (status === 200) {
        watchLaterDispatch({
          type: "REMOVE_FROM_WATCH_LATER",
          payload: id,
        });
        return data.watchlater;
      }
    } catch (error) {
      addToast({
        type: "Error",
        msg: "Unable to Remove Item from Watch Later",
      });
      console.error(error);
    }
  };
  const initialWatchLaterState = [];
  const [watchLater, watchLaterDispatch] = useReducer(
    watchLaterReducer,
    initialWatchLaterState
  );
  return (
    <WatchLaterContext.Provider
      value={{
        watchLater,
        getWatchLaterData,
        postWatchLaterData,
        deleteWatchLaterData,
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};
const useWatchLater = () => useContext(WatchLaterContext)

export {WatchLaterProvider,useWatchLater}

