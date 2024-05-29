import { useContext,useState,createContext } from "react"
export const Order=createContext(null)
export default function ReverseButton({children}){
    const [order,setOrder]=useState([0,1])
    const reverse=()=>{
        setOrder((prev)=>
            prev.reverse()
        
        )

    }
    return(
        <Order.Provider value={{order,setOrder}}>
        <div>
            {children}
        <button onClick={reverse}>reverse</button>
        </div>
        </Order.Provider>
    )



}