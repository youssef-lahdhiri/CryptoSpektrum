import { useState } from "react";
import { createContext } from "react";
    export const Coins=createContext()

export default function ContextProvider({children}){
    const [coins,setCoins]=useState(null)
    return(

        <Coins.Provider value={{coins, setCoins}}>
            {children}
        </Coins.Provider>

    )

    
}