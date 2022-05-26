import React, { useState, useEffect } from "react";
import "./Nav.css";
import {MdOndemandVideo} from "react-icons/md"
import { Link, NavLink,useNavigate } from "react-router-dom";
import { useAuth } from "../../context";

function Nav() {
  const [show, handleShow] = useState(false)
  const { signInStatus, signInStatusDispatch } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        handleShow(true);
      } else handleShow(false);
    });
  }, []);
  const logOut = () => {
    localStorage.removeItem("token");
    signInStatusDispatch({ type: "SIGN_OUT" });
    navigate("/");
  };
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_left_side">
        <div onClick={() => navigate("/")}>
          <MdOndemandVideo size={30} className="color_red" />
          <img
            className="nav_logo"
            src="https://fontmeme.com/permalink/220512/6c06bcf063c944a6b74d3e8ff0f6f324.png"
            alt="Netflix"
          />
        </div>
        {signInStatus.status && (
          <div className="nav_links">
            <NavLink to="/" className="nav_link">
              Home
            </NavLink>
            <NavLink to="/watchlater" className="nav_link">
              My List
            </NavLink>
            <NavLink to="/history" className="nav_link">
              History
            </NavLink>
            <NavLink to="/myplaylists" className="nav_link">
              Playlists
            </NavLink>
            <NavLink to="/likedvideos" className="nav_link">
              Liked Videos
            </NavLink>
          </div>
        )}
      </div>
      {signInStatus.status ? (
        <img
          className="nav_avator"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Avatar"
          onClick={logOut}
        />
      ) : (
        <Link to="/login">
          <button className="nav_login_btn btn btn_primary">Login</button>
        </Link>
      )}
    </div>
  );
}

export default Nav;
