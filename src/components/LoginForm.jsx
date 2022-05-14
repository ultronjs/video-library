import React,{useState} from 'react'
import "../index.css";
import { Link,useNavigate } from 'react-router-dom'
import { useAuth,useToast } from '../context';
import instance from "../utils/axios";

function LoginForm() {
  const navigate = useNavigate()
  const initialSignInState = {
    email: "",
    password: ""
  };
  const guestLoginCreds = {
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
  };
  const [signIn, setSignIn] = useState(initialSignInState);
  const [showPassword, setShowPassword] = useState(false);
  const { signInStatusDispatch, } = useAuth();
  const { addToast } = useToast();
  const onChangeHandler = (e) => {
    setSignIn((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };
  const onSubmit = async () => {
      try {
        const { status, data } = await instance({
          method: "post",
          url: "/auth/login",
          data: {
            ...signIn,
          },
        });
        if (status === 200) {
          localStorage.setItem("token", data.encodedToken);
          signInStatusDispatch({ type: "SET_USER", payload: data });
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        addToast({
          type: "Error",
          msg: "Unable to Login",
        });
      }
    }
    const loginWithGuestLogin = async () => {
      try {
        const { status, data } = await instance({
          method: "post",
          url: "/auth/login",
          data: {
            ...guestLoginCreds,
          },
        });
        if (status === 200) {
          localStorage.setItem("token", data.encodedToken);
          signInStatusDispatch({ type: "SET_USER", payload: data });
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        addToast({
          type: "Error",
          msg: "Unable to Login",
        });
      }
    }
  return (
    <div className="form_container">
      <div className="form">
        <div className="form_header">
          <span className="h2 text_center">Login</span>
          <span>
            Doesn't have account yet?{" "}
            <Link className="form_link" to="/signup">
              Sign Up
            </Link>
          </span>
        </div>
        <div className="input_group">
          <label className="input_label">Email Address</label>
          <input
            name="email"
            onChange={onChangeHandler}
            className="input_regular input_corner"
            type="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="input_group">
          <div className="login_password_label">
            <label className="input_label">Password</label>
            {/* <Link to="/resetPassword">Forgot Password</Link> */}
          </div>
          <input
            name="password"
            onChange={onChangeHandler}
            className="input_regular input_corner"
            type={showPassword ? "text" : "password"}
            placeholder="Enter 6 charater or more"
          />
          {showPassword ? (
            <i
              onClick={() => setShowPassword(false)}
              className="input_icon fas fa-eye-slash"
            ></i>
          ) : (
            <i
              onClick={() => setShowPassword(true)}
              className="input_icon fas fa-eye"
            ></i>
          )}
        </div>
        {/* <div>
          <input type="checkbox" />
          Remember Me
        </div> */}
        <div className="flex flex-col">
          <button onClick={onSubmit} className="btn btn_primary">
            LOGIN
          </button>
          <button
            onClick={loginWithGuestLogin}
            className="btn btn_primary_outline"
          >
            LOGIN WITH GUEST LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm