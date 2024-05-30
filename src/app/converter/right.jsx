'use client'
import Select from './select'
import { useEffect, useRef, useState, useContext } from "react";
import {Coins} from './contextProvider';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
// const API_KEY='d037705952msh69a7d1cae7247fap11477bjsn8df3a6a779b5'


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
    function initlial(result){
    setCoins(result)
    setFromCoin(result[0].name)
    setToCoin(result[1].name)
    setFromPrice(result[0].price)
    setToPrice(result[1].price)};
    const Coins =async()=>{ 
      const result= await fetchCoins();
   
    initlial(result)
    
if (!isCurrLoad&& result.length>5){
    setFromCoin(result[0].name)
    setIsCurrLoad(true)
  }}
    Coins();
  }, [isCurrLoad]);
useEffect(()=>{
  setPrice((pricer.current?.value*fromPrice/toPrice))
},[fromPrice,toPrice])
  return (
    <>
    <div className='flex items-center justify-center flex-wrap h-auto'>
    <div className='flex border  flex-row w-fit flex-wrap items-center justify-center'>
      <div className=' border flex md:flex-row gap-5 justify-center items-center flex-col mt-10    sm:w-fit   h-[10rem]'>
        {children}
          <div className='flex  items-center justify-center  flex-wrap flex-col'>
          <Select Coin={fromCoin} setCoin={setFromCoin} setPrice={setFromPrice} Price={fromPrice}/>
        <p className='text-md font-semibold text-gray-600'>1 = ${fromPrice}</p>
        </div>
        <button className=' text-xl -translate-y-2 h-full flex justify-center items-center translate text-center' onClick={()=>{
          setFromCoin(toCoin)
          setToCoin(fromCoin)
          setToPrice(fromPrice)
          setFromPrice(toPrice)
        }}><FaArrowRightArrowLeft /></button><div>
        <Select Coin={toCoin} setCoin={setToCoin} setPrice={setToPrice} Price={toPrice} />
        <p className='text-center text-md font-semibold text-gray-600'> 1 = ${toPrice}</p>
       
        </div>
       
      </div> <input placeholder='Type Amount' type="text"  className='' value={value} ref={pricer} onChange={(e)=>{setPrice(e.target.value*fromPrice/toPrice) ;setValue(e.target.value)}}/> </div>
   <p className='mt-5 text-center'>Converted Coins : {price}</p>
    </div>
   </>
  );
}
