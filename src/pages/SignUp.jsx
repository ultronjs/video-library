import React from 'react'
import "../index.css"
import { Nav,SignUpForm} from "../components";

function SignUp() {
  return (
    <div>
      <Nav />
      <div className="form_main_container">
        <div className="form_container_img"></div>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp