'use client'
import Select from './select'
import { useEffect, useRef, useState, useContext } from "react";
import {Coins} from './contextProvider';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
// import  {fetchCoin } from './fetchCoin';
import { fetchCoin } from '../fetchCoin';
export default function Rright({children}) {
  const {coins,setCoins}=useContext(Coins)
  const [value, setValue] = useState(1);
  const pricer=useRef(null)
  const [fromCoin,setFromCoin]=useState('Bitcoin')
  const [toCoin,setToCoin]=useState('Etherum')
  const [price,setPrice]=useState(0)
  const [fromPrice,setFromPrice]=useState(1)
  const [toPrice,setToPrice]=useState(1)
 const [isCurrLoad,setIsCurrLoad]=useState(false)
  const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':'d037705952msh69a7d1cae7247fap11477bjsn8df3a6a779b5',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
  async function  initlial(){
  const response =await fetch(url,options)
  const result=await response.json()
    setCoins(result.data.coins)
   
    setFromCoin(result.data.coins[0].name)
    setToCoin(result.data.coins[1].name);
    setFromPrice(result.data.coins[0].price)
    setToPrice(result.data.coins[1].price)};
  useEffect(() => {
    initlial();
  }, [isCurrLoad]);
useEffect(()=>{
  setPrice((pricer.current?.value*fromPrice/toPrice))
},[fromPrice,toPrice])
  return (
    <>
    <div className='flex items-center  md:flex-col  justify-center flex-wrap relative'>
    <div className='flex border  h-[35rem] sm:h-[25rem] sm:flex-col  flex-row  flex-wrap '>
      <div className=' border flex md:flex-row gap-5 justify-center items-center  flex-wrap w-full  flex-row  sm:w-fit   h-[10rem]'>
        {children}
          <div className='flex min-h-[10rem] w-full  items-center justify-center  flex-wrap flex-col'>
          <Select Coin={fromCoin} setCoin={setFromCoin} setPrice={setFromPrice} Price={fromPrice}/>
        <p className='text-md font-semibold text-gray-600'>1 = ${fromPrice}</p>
        </div>
        <button className=' text-xl -translate-y-2 translate text-center' onClick={()=>{
          setFromCoin(toCoin)
          setToCoin(fromCoin)
          setToPrice(fromPrice)
          setFromPrice(toPrice)
        }}><FaArrowRightArrowLeft /></button><div className='w-full flex items-center justify-center flex-col'>
        <Select Coin={toCoin} setCoin={setToCoin} setPrice={setToPrice} Price={toPrice} />
        <p className='text-center text-md font-semibold text-gray-600'> 1 = ${toPrice}</p>
       
        </div>
       
      </div> 
      <div className='w-full border absolute bottom-11'><label htmlFor="pricer">Type Amount:</label> <input placeholder='Type Amount' type="text"  className='' value={value} ref={pricer} onChange={(e)=>{setPrice(e.target.value*fromPrice/toPrice) ;setValue(e.target.value)}}/> </div></div>
   <p className='mt-5 text-center'>Converted Coins : {price}</p>
    </div>
   </>
  );
}
