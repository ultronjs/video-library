import React, { useState, useEffect } from "react";
import "./Nav.css";
import {MdOndemandVideo} from "react-icons/md"
import { NavLink } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_left_side">
        <div>
          <MdOndemandVideo size={30} className="color_red" />
          <img
            className="nav_logo"
            src="https://fontmeme.com/permalink/220512/6c06bcf063c944a6b74d3e8ff0f6f324.png"
            alt="Netflix"
          />
        </div>
        <div className="nav_links">
          <NavLink
            to="/"
            activeStyle={{
              fontWeight: "bold",
            }}
            className="nav_link"
          >
            Home
          </NavLink>
          <NavLink
            to="/watchlater"
            activeStyle={{
              fontWeight: "bold",
            }}
            className="nav_link"
          >
            My List
          </NavLink>
          <NavLink
            to="/history"
            activeStyle={{
              fontWeight: "bold",
            }}
            className="nav_link"
          >
            History
          </NavLink>
          <NavLink
            to="/myplaylists"
            activeStyle={{
              fontWeight: "bold",
            }}
            className="nav_link"
          >
            Playlists
          </NavLink>
        </div>
      </div>

      <img
        className="nav_avator"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Avatar"
      />
    </div>
  );
}

export default Nav;
