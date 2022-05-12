import React,{ useState } from 'react'
import "../index.css";
import { Link,useNavigate } from 'react-router-dom'
import axios from '../utils/axios';
import { useAuth, useToast } from '../context';

function SignUpForm() {
  const navigate = useNavigate()
  const initialSignUpState = {
        fullName:"",
        email:"",
        password:"",
        confirmPassword:""
    }
  const [signUp,setSignUp] = useState(initialSignUpState)
  const [showPasswords,setShowPasswords] = useState({password:false,confirmPassword:false})
  const {signInStatusDispatch} = useAuth()
  const {addToast} = useToast()
  const onChangeHandler = (e) => {
    setSignUp((prevState)=>({...prevState,[e.target.name]:e.target.value}))
  }

  const checkPasswordMatches = () => {
    return signUp.password === signUp.confirmPassword;
  }
  const onSubmit = async () => {
    if (
      checkPasswordMatches() &&
      signUp.fullName !== "" &&
      signUp.email !== "" &&
      signUp.password !== "" &&
      signUp.confirmPassword !== ""
    ) {
      try {
        const { status, data } = await axios({
          method: "post",
          url: "/auth/signup",
          data: {
            ...signUp,
          },
        });
        if (status === 201) {
          localStorage.setItem("token", data.encodedToken);
          signInStatusDispatch({ type: "SET_USER", payload: data });
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        addToast({
          type: "Error",
          msg: "Unable to SignUp",
        });
      }
    } else {
      addToast({
        type: "Error",
        msg: "Please fill the SignUp Form Correctly",
      });
    }
  }
  return (
    <>
      <div className="form_container">
        <div className="form sign_up">
          <div className="form_header">
            <span className="h2 text_center">Sign Up</span>
            <span>
              Already have a account ?
              <Link className="form_link" to="/login">
                Log In
              </Link>
            </span>
          </div>
          <div className="input_group">
            <label className="input_label">Full Name</label>
            <input
              onChange={onChangeHandler}
              className="input_regular input_corner"
              type="text"
              name="fullName"
              placeholder="Full Name"
            />
          </div>
          <div className="input_group">
            <label className="input_label">Email Address</label>
            <input
              onChange={onChangeHandler}
              className="input_regular input_corner"
              type="email"
              name="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="input_group">
            <label className="input_label">Password</label>
            <input
              onChange={onChangeHandler}
              name="password"
              className="input_regular input_corner"
              type={showPasswords.password ? "text" : "password"}
              placeholder="Enter 6 charater or more"
            />
            {showPasswords.password ? (
              <i
                onClick={() =>
                  setShowPasswords((prevState) => ({
                    ...prevState,
                    password: false,
                  }))
                }
                className="input_icon fas fa-eye-slash"
              ></i>
            ) : (
              <i
                onClick={() =>
                  setShowPasswords((prevState) => ({
                    ...prevState,
                    password: true,
                  }))
                }
                className="input_icon fas fa-eye"
              ></i>
            )}
          </div>
          <div className="input_group">
            <label className="input_label">Confirm Password</label>
            <input
              onChange={onChangeHandler}
              name="confirmPassword"
              className="input_regular input_corner"
              type={showPasswords.confirmPassword ? "text" : "password"}
              placeholder="Enter same as password"
            />
            {showPasswords.confirmPassword ? (
              <i
                onClick={() =>
                  setShowPasswords((prevState) => ({
                    ...prevState,
                    confirmPassword: false,
                  }))
                }
                className="input_icon fas fa-eye-slash"
              ></i>
            ) : (
              <i
                onClick={() =>
                  setShowPasswords((prevState) => ({
                    ...prevState,
                    confirmPassword: true,
                  }))
                }
                className="input_icon fas fa-eye"
              ></i>
            )}
          </div>
          <div className>
            <button onClick={onSubmit} className="btn btn_primary">
              CREATE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpForm