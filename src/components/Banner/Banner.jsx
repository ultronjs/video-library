import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import "./Banner.css";

function Banner() {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("/videos");
      const random = Math.floor(Math.random() * request.data.videos.length - 1);
      setVideo(request.data.videos[random]);
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${video?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {video?.title || video?.name || video?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(video?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom"></div>
    </header>
  );
}

export default Banner;
