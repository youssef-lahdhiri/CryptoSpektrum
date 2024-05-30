'use client '
import {Dispatch, SetStateAction, useContext, useRef} from 'react';
import {Coins} from './contextProvider';

 type Propstype={
        Coin:string
        setCoin:Dispatch<SetStateAction<null>>
        setPrice:Dispatch<SetStateAction<null>>
        Price:number
    }
export default function Select({Coin,setCoin,setPrice,Price}:Propstype){
    const selectedCoin=useRef(null)
    const {coins,setCoins}=useContext(Coins)
    const handelChange=(e:any)=>{
        setCoin(e.target.value)
        setPrice((coins.find((i:any)=>i.name===e.target.value)).price) 
    }
return ( 
    <select name="" id=""  value={Coin} className='border h-10 font-bold text-center relative' onChange={handelChange}  ref={selectedCoin} >
    {coins?.map((coin:any,index:any)=>{return( <option key={coin.name} value={coin.name} data-index={index}>{coin.name} </option>)}) }</select>
)

}