import { useState } from "react";
import { createContext } from "react";
   export const RightCoin=createContext(undefined)
    export const LeftCoin=createContext(null)
    export const LeftCoins=createContext(null)
    export const RightCoins=createContext(null)
    export const SelectedCoin=createContext(null)
    export const Coins=createContext()

export default function ContextProvider({children}){
 
    const [rightCoins,setRightCoins]=useState(null)
    const [leftCoins,setLeftCoins]=useState(null)
    const [rightCoin,setRightCoin]=useState(null)
    const [coins,setCoins]=useState(null)
    const [selectedCoinn,setSelectedCoin]=useState(null)
    return(
        <SelectedCoin.Provider value={{selectedCoinn,setSelectedCoin}}>
        <RightCoins.Provider value={{rightCoins,setRightCoins}}>
        <LeftCoins.Provider value={{leftCoins,setLeftCoins}}>
        <Coins.Provider value={{coins, setCoins}}>
        <RightCoin.Provider value={{rightCoin,setRightCoin}}>
            {children}
        </RightCoin.Provider>
        </Coins.Provider>
        </LeftCoins.Provider>
        </RightCoins.Provider>
        </SelectedCoin.Provider>
    )

    
}