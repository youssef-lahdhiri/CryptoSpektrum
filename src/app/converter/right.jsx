'use client'
import Select from 'react-select'
// import { fetchCoinData } from './fetchCoin';
import { useEffect, useRef, useState, createContext, useContext } from "react";
import {LeftCoin, RightCoin,RightCoins,LeftCoins,SelectedCoin} from './contextProvider';
import { FaArrowRightArrowLeft } from "react-icons/fa6";

export default function Rright({children}) {
  const {rightCoins,setRightCoins}=useContext(RightCoins)
  const {leftCoins,setLeftCoins}=useContext(LeftCoins)
  const [converted, setConverted] = useState(1);
  const [value, setValue] = useState(1);
  const [coin, setCoin] = useState(null);
  const [coins, setCoins] = useState(null);
  const ref = useRef(null);
  const selectedCoin = useRef(null);
  const {rightCoin, setRightCoin} = useContext(RightCoin);
  const {leftCoin, setLeftCoin} = useContext(LeftCoin);

  const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd037705952msh69a7d1cae7247fap11477bjsn8df3a6a779b5',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
    function initializeData(result){
      setCoins(result.data.coins);
      setRightCoin(result.data.coins[0]);
      let temp= result.data.coins[1]
      setLeftCoins(result.data.coins)
      setRightCoins(result.data.coins)
      setCurrt(result.data.coins[0].name)
      setPr(result.data.coins[0].price)
    }
    const [isCurrLoad,setIsCurrLoad]=useState(false)

  useEffect(() => {
    async function  fetchCoins (){
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data.coins);
        return result.data.coins
      } catch (error) {
        console.log(error);
      }
    };
    const Coins =async()=>{ 
      const result= await fetchCoins();
    setRightCoins(result)
    setLeftCoins(result)
    setCurr(result[1].name)
    setCurrt(result[0].name)
    setPr(result[0].price)
    setPrr(result[1].price)
if (!isCurrLoad&& result.length>5){
    setCurr(result[1].name)
    setIsCurrLoad(true)
  }}
    Coins();
  }, [isCurrLoad]);
  const pricer=useRef(null)
  const but=useRef()
  const selectedCoint=useRef(null)
  const [fromCoin,setFromCoin]=useState('Bitcoin')
 const [price,setPrice]=useState(0)
const [curr,setCurr]=useState('12')
const [currt,setCurrt]=useState('')
const [pr,setPr]=useState(null)
const [prr,setPrr]=useState(null)
const handelChange=(e)=>{
    setPrr( rightCoins[selectedCoin.current.options[selectedCoin.current.selectedIndex]?.getAttribute('data-index')]?.price);
    setCurr(e.target.value)
}
const handelChange2=(e)=>{
  setCurrt(e.target.value)
  setPr(leftCoins[selectedCoint.current.options[selectedCoint.current.selectedIndex]?.getAttribute('data-index')]?.price)
}
useEffect(()=>{
  setPrice((pricer.current.value*prr/pr))
},[curr,currt])
  return (
    <>
      <div className=' border flex flex-row gap-5 justify-center items-center w-[50rem] border  h-[10rem]'>
        {children}
          <div className='flex  items-center justify-center  flex-wrap flex-col'>
        {isCurrLoad &&<select name="left" id="left"  value={curr} ref={selectedCoin} className='border h-10 font-bold text-center' onChange={handelChange}>
    {rightCoins?.map((coin,index)=>{return( <option value={coin.name} data-index={index}>{coin.name}</option>)})}

        </select>}
        <p className='text-md font-semibold text-gray-600'>1 = {prr}</p>
       
        </div>
        <button className=' text-xl -translate-y-2 h-full flex justify-center items-center translate text-center' onClick={()=>{
          const temp=curr
          setCurr(prev=>{
            setCurrt(prev)
            return currt;
          })
          setPr(prr)
          setPrr(pr)
        }}><FaArrowRightArrowLeft /></button><div>
        <select name="" id="" className='border h-10 font-bold text-center' value={currt} ref={selectedCoint} onChange={handelChange2}>
    {leftCoins?.map((coin,index)=>{return( <option key={coin.name} value={coin.name} data-index={index}>{coin.name}</option>)})}

        </select>
        <p className='text-center text-md font-semibold text-gray-600'> 1 = {pr}</p></div>
       
      </div>
   <p>price:{price}</p>
   <input type="text"  value={value} ref={pricer} onChange={(e)=>{setPrice(e.target.value*prr/pr) ;setValue(e.target.value)}}/>
   </>
  );
}
