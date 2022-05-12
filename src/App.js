import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WatchLater from "./pages/WatchLater";
import History from "./pages/History";
import MyPlaylists from "./pages/MyPlaylists";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Mockman from "mockman-js";
import NotFound from "./pages/NotFound";
import { RequireAuth } from "./pages/RequireAuth";
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
        <Route
          path="/watchlater"
          element={
            <WatchLater />
          }
        />
        <Route
          path="/history"
          element={
            <History />
          }
        />
        <Route
          path="/myplaylists"
          element={
            <MyPlaylists />
          }
        />
      </Routes>
    </div>
  );
}

export default App;