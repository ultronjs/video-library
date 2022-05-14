import { createContext, useContext, useReducer } from "react"

const AuthContext = createContext()

const AuthProvider=({children}) => {
    const initialSignInStatus = {
      status: localStorage.getItem("token")===null?false:true,
      encodedToken: localStorage.getItem("token"),
    };


    const signInReducer = (signInStatus,action) => {

        switch(action.type){
            case "SET_USER":
                return {
                  ...signInStatus,
                  status: true,
                  encodedToken: action.payload.encodedToken,
                };
            case "SIGN_OUT":
                return {
                  ...signInStatus,
                  status: false,
                  encodedToken: null,
                };
            default:
                return [...signInStatus]
        }
    };
    const [signInStatus, signInStatusDispatch] = useReducer(
      signInReducer,
      initialSignInStatus
    );
    return (
      <AuthContext.Provider value={{ signInStatus,signInStatusDispatch }}>
        {children}
      </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext)

export {AuthProvider,useAuth}