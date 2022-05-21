import React, { useEffect } from "react";
import { Nav, HistoryVideoCard } from "../components";
import { useHistory } from "../context";
import "../index.css";
import "../components/Row/Row.css";
import {MdOutlineDeleteOutline} from "react-icons/md"

function Home() {
  const { history, getHistoryVideoData, deleteAllHistoryVideoData } =
    useHistory();

  useEffect(() => {
    getHistoryVideoData();
  }, []);

  return (
    <div className="main_container">
      <Nav />
      <div className="page_title flex flex-jc-space-between">
        <h2>History</h2>
        {history.length > 0 && (
          <div
            className="page_title_action"
            onClick={() => deleteAllHistoryVideoData()}
          >
            <MdOutlineDeleteOutline className="icon" size={30} />
            <span>Delete All</span>
          </div>
        )}
      </div>
      <div className="history_container">
        {history && history.map((video) => <HistoryVideoCard video={video} />)}
      </div>
    </div>
  );
}

export default Home;
