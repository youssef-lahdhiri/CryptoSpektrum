import { useState } from "react";
import { createContext } from "react";
   export const RightCoin=createContext(undefined)
    export const LeftCoin=createContext(null)
    export const LeftCoins=createContext(null)
    export const RightCoins=createContext(null)
    export const SelectedCoin=createContext(null)

export default function ContextProvider({children}){
 
    const [rightCoins,setRightCoins]=useState(null)
    const [leftCoins,setLeftCoins]=useState(null)
    const [rightCoin,setRightCoin]=useState(null)
    const [leftCoin,setLeftCoin]=useState(null)
    const [selectedCoinn,setSelectedCoin]=useState(null)
    return(
        <SelectedCoin.Provider value={{selectedCoinn,setSelectedCoin}}>
        <RightCoins.Provider value={{rightCoins,setRightCoins}}>
        <LeftCoins.Provider value={{leftCoins,setLeftCoins}}>
        <LeftCoin.Provider value={{leftCoin, setLeftCoin}}>
        <RightCoin.Provider value={{rightCoin,setRightCoin}}>
            {children}
        </RightCoin.Provider>
        </LeftCoin.Provider>
        </LeftCoins.Provider>
        </RightCoins.Provider>
        </SelectedCoin.Provider>
    )

    
}