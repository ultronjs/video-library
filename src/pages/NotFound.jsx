import React from 'react'
import Nav from "../components/Nav/Nav"
import { Link } from 'react-router-dom';
import "../index.css"

function NotFound() {
  return (
    <div className="main_container flex flex-col flex-center">
      <Nav />
      <img className="not_found_image" src="/assets/404.png" alt="404" />
      <Link to="/products">
        <button className="btn btn_primary_outline">Continue Shopping</button>
      </Link>
    </div>
  );
}
export default NotFound