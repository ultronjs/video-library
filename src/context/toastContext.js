import { useState,createContext, useContext,useEffect } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext()
const ToastProvider = ({children}) => {
    const[toasts,setToasts] = useState([])
    useEffect(() => {
      const timer = setTimeout(()=> setToasts(toasts=>toasts.slice(1)),3000)
      return () => clearTimeout(timer)
    }, [toasts])
    
    const addToast = (toast) => {
        setToasts((toasts)=>[...toasts,toast])
    }
    return (
        <ToastContext.Provider value={{addToast}}>
            {children}
            {toasts && toasts.map(toast=><Toast type={toast.type} msg={toast.msg}></Toast>)}
        </ToastContext.Provider>
    )
}

const useToast = () => useContext(ToastContext)

export {ToastProvider,useToast}