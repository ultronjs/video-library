import { createContext, useContext, useReducer } from "react";
import instance from "../utils/axios";
import { historyVideoReducer } from "../reducers";
import { useToast } from "./toastContext";

const HistoryContext = createContext({ history: [] });


const HistoryProvider = ({children}) => {
    const { addToast } = useToast();

    const getHistoryVideoData = async () => {
      try {
        const { status, data } = await instance.get("/user/history", {
          headers: {
            Accept: "*/*",
            authorization: localStorage.getItem("token"),
          },
        });
        if (status === 200) {
          historyVideoDispatch({ type: "SET_DATA", payload: data.history });
          return data.history;
        }
      } catch (error) {
        addToast({ type: "Error", msg: "Unable to Fetch Data From the API" });
        console.error(error);
      }
    };
    const postHistoryVideoData = async (video) => {
      try {
        const { status, data } = await instance({
          method: "post",
          url: "/user/history",
          data: {
            video,
          },
          headers: {
            Accept: "*/*",
            authorization: localStorage.getItem("token"),
          },
        });
        if (status === 201) {
          historyVideoDispatch({
            type: "ADD_TO_HISTORY",
            payload: video,
          });
          return data.history;
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Save the Item in History",
        });
        console.error(error);
      }
    };
    const deleteHistoryVideoData = async (id) => {
      try {
        const { status, data } = await instance({
          method: "delete",
          url: `/user/history/${id}`,
          headers: {
            Accept: "*/*",
            authorization: localStorage.getItem("token"),
          },
        });
        if (status === 200) {
          historyVideoDispatch({
            type: "REMOVE_FROM_HISTORY",
            payload: id,
          });
          return data.history;
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Remove Item from History",
        });
        console.error(error);
      }
    };
    const deleteAllHistoryVideoData = async () => {
      try {
        const { status, data } = await instance({
          method: "delete",
          url: `/user/history/all`,
          headers: {
            Accept: "*/*",
            authorization: localStorage.getItem("token"),
          },
        });
        if (status === 200) {
          historyVideoDispatch({
            type: "REMOVE_ALL_VIDEO_FROM_HISTORY",
          });
          return data.history;
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Remove All the Videos from the History",
        });
        console.error(error);
      }
    };

    const initialHistoryState = [];
    const [history, historyVideoDispatch] = useReducer(
      historyVideoReducer,
      initialHistoryState
    );

    return (
        <HistoryContext.Provider value={{history,getHistoryVideoData,postHistoryVideoData,deleteAllHistoryVideoData,deleteHistoryVideoData}}>
            {children}
        </HistoryContext.Provider>
    )
}

const useHistory = () => useContext(HistoryContext)

export {HistoryProvider,useHistory}