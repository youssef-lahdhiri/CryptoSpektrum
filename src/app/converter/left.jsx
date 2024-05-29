'use client'
import { fetchCoinData } from './fetchCoin';
import { useEffect, useRef, useState, createContext, useContext } from "react";
import {RightCoin,LeftCoin,LeftCoins, RightCoins, SelectedCoin} from './contextProvider'
import { Order } from './button';
import { DiVim } from 'react-icons/di';
// import { RightContext } from './right';

// export const LeftContext = createContext(null);

export default function Left() {
  const {leftCoins,setLeftCoins}=useContext(LeftCoins)
  const {order, setOrder}=useContext(Order)
  const [converted, setConverted] = useState(1);
  const [coins, setCoins] = useState([]); 
  const [coin, setCoin] = useState(coins[0]);
  const [value,setValue]=useState(1)
  const [val,setVal]=useState(1)
  const ref = useRef(null);
  const selectedCoin = useRef(null);
  const {rightCoin, setRightCoin} = useContext(RightCoin);
  const {leftCoin, setLeftCoin} = useContext(LeftCoin);
  
  const [firstLoad,setFirstLoad]=useState(true)
  // useEffect(()=>{

  //  leftCoins?setLeftCoin(leftCoins[0]):null
  // },[leftCoins])

  // function initializeCoin(){

  //   firstLoad? setTimeout(()=>{setCoin(leftCoins[0])},200):setFirstLoad(false)
    

  // }
  

  
  // useEffect(()=>{ 
  //   const id=setTimeout(()=>setCoin(leftCoins[0]),200)
  // return clearTimeout(id)
  // },[])
 

//   const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'd037705952msh69a7d1cae7247fap11477bjsn8df3a6a779b5',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };
// const [yah,setLoad]=useState(false)
//   const fetchCoins = async () => {
//     try {
//       const response = await fetch(url, options);
//       const result = await response.json();
//       console.log(result.data.coins);
//       setCoins(result.data.coins);
//       // setCoin(result.data.coins[order.first])
//       // setLoad(true)
//       setCoin(result.data.coins[0]);
//       return result.data.coins;
//     } catch (error) {
//       console.log(error);
//     }
//   };  
 
// const yah=false
  // useEffect(() => {
  //   fetchCoins();
    
  //  const id=setInterval(()=>{console.log(`right is ${rightCoins}`)},1000)
    // console.log(`first is ${order.first}`)
    // console.log(`second is ${order.second}`)
    // selectedCoin.current.value=coins[1];
    // return clearInterval(id)
  // }, []);
// const {selectedCoinn,setSelectedCoin}=useContext(SelectedCoin)

// const handelReverse=()=>{
//   setSelectedCoin(coin)
  
// }
  // const [selectedIndex,setSelectedIndex]=useState(0)
  return (
      <div className='h-[10rem]'>
        <select 
        //  value={coin?.name}
          // value={  selectedCoin?.current?.options[selectedCoin.current.selectedIndex].text}
          size={1} 
          ref={selectedCoin} 
          // onBlur={() => { selectedCoin.current.size = 1 }} 
          // onClick={() => { selectedCoin.current.size = 5 }}  
          onChange={() => { console.log(coin);
            console.log(selectedCoin.current.options[selectedCoin.current.selectedIndex].text);
            setLeftCoin(leftCoins[selectedCoin.current.options[selectedCoin.current.selectedIndex].getAttribute("data-index")]) 
            console.log(leftCoins[selectedCoin.current.options[selectedCoin.current.selectedIndex].getAttribute("data-index")]) }} 
          name="right" 
          id=""
        >
          {leftCoins?.map((i, index) => (
            <option className='border bg-blue h-[1rem]' value={index} data-index={index} key={index}>{i.name} {i.price}</option>
          ))}
        </select>
        {/* <div>dd</div>
        <input 
          // value={value} 
          type="text"  
          ref={ref} 
          // onChange={() => {setValue(ref.current.value);console.log(`rightis ${right} left is${left} value is ${value}`) ;setLeft(ref.current.value*coin.price); setConverted(right /coin.price); }} 
        />
        {/* <div>{right}</div> */}
        {/* <hr /> */}
        {/* <html></html> */}
        {/* 
        /}  **/}
        {/* <button onClick={handelReverse}> press</button> */}
      <div>price: {LeftCoin.price}</div>
      {/* <input type="text" value={right/coin?.price} readOnly /> */}
      </div> 
  );
}
