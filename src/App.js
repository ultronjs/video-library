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
} from "./pages";
import Mockman from "mockman-js";
import "./App.css";

function App() {
  return (
    <div className="App bg-body-color">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/mockman" element={<Mockman />} />
        {/* Protected Paths */}
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/history" element={<History />} />
        <Route path="/myplaylists" element={<MyPlaylists />} />
        <Route path="/likedvideos" element={<LikedVideo />} />
      </Routes>
    </div>
  );
}

export default App;