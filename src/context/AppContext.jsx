import { createContext, useState } from "react";
import { doctors } from "../assets/assets";

export const AppContext=createContext()
const AppContextProvider=(props)=>{
    const currencySymol="Rs"
    const [token,setToken]=useState("")


    const value={
        doctors,
        currencySymol,
        token,setToken

    }   
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;