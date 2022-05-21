import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  WatchLater,
  History,
  MyPlaylists,
  SignUp,
  LogIn,
  NotFound,
  RequireAuth,
  LikedVideo,
  PlaylistDetails,
} from "./pages";
import Mockman from "mockman-js";
import "./App.css";
import VideoDetail from "./pages/VideoDetail";

function App() {
  return (
    <div className="App bg-body-color">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/video/:videoId" element={<VideoDetail />} />
        {/* Protected Paths */}
        <Route
          path="/watchlater"
          element={
            <RequireAuth>
              <WatchLater />
            </RequireAuth>
          }
        />
        <Route path="/history" element={<RequireAuth><History /></RequireAuth>} />
        <Route path="/myplaylists" element={<RequireAuth><MyPlaylists /></RequireAuth>} />
        <Route path="/myplaylists/:playlistId" element={<RequireAuth><PlaylistDetails /></RequireAuth>} />
        <Route path="/likedvideos" element={<RequireAuth><LikedVideo /></RequireAuth>} />
      </Routes>
    </div>
  );
}

export default App;