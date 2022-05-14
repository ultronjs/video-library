import React from 'react'
import "../index.css"
import { Nav,LoginForm} from "../components";

function LogIn() {
  return (
    <div>
      <Nav />
      <div className="form_main_container">
        <div className="form_container_img"></div>
        <LoginForm />
      </div>
    </div>
  );
}

export default LogIn