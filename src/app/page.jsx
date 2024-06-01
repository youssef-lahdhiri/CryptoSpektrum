'use client';
import {fetchCoin} from './fetchCoin'
import App from './converter/page'
import { Line } from 'react-chartjs-2';
import React, {MutableRefObject, Suspense ,useContext,useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './style.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiSpectrumLine } from "react-icons/ri";
import { FaChevronCircleLeft } from "react-icons/fa";
import Header from './components/Header'
import TableRow from './components/TableRow';
import CoinList from './components/CoinList'
import GenerarlStats from './components/GeneralStats';
import { clsx } from 'clsx/lite';
import {Coins} from '@/app/converter/contextProvider'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// type coin={
//   name?:string,
//   price?:number,
//   iconUrl?:string,
//   symbol?:string,

// }
export default function Home() {
  const [loading,setLoading]=useState(false)
  const [General,setGeneral]=useState([])
  const {coins, setCoins} = useContext(Coins);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [chartData1, setChartData1]= useState({ labels: [], datasets: [] });
  const [search, setSearch] = useState('');
  const [shown, setShown]= useState([]);
  const sea = useRef(null);
  const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':'d037705952msh69a7d1cae7247fap11477bjsn8df3a6a779b5',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
  const fetchCoinData = async () => {
    try {
      const response=await fetch(url,options)
      const result=await response.json()
      setGeneral(result.data.stats)
      setCoins(result.data.coins.slice(0, 40));
      setShown(result.data.coins.slice(0, 40));
      const now = new Date();
      const labels = [];
      for (let i = 23; i >= 0; i--) {
        const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(hour.toISOString().substring(11, 16)); 
      }
      const data = result.data.coins[0]?.sparkline.map((price) => parseFloat(price))
      const data1 = result.data.coins[1]?.sparkline.map((price) => parseFloat(price))
      setChartData({
        labels: labels,
        datasets: [{
          label: `${result.data.coins[0]?.name} Price (last 24 hours)`,
          data: data,
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'blue',
          tension: 0.1
        }]
      });
      setChartData1({
        labels: labels,
        datasets: [{
          label: `${result.data.coins[1]?.name} Price (last 24 hours)`,
          data: data1,
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'blue',
          tension: 0.1
        }]
      });
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCoinData();
  }, []);
  const change = () => {
    setSearch(sea.current?.value);
    setShown(coins.filter((i) => i.name.toLowerCase().includes(sea.current?.value.toLowerCase())));
  };
const [active,setActive]=useState(false)
  return (
    <>
    {loading?
      <motion.div
      initial={{opacity:0,y:100}}
      animate={{opacity:1,y:0}}
      className='  shadow-md sm:w-2/3 w-full right-40 items-center place-items-center m m-auto'>
       <Header
       ></Header>
       <motion.h1
       initial={{opacity:0,y:100}}
       animate={{opacity:1,y:0}}>General Stats :</motion.h1>
       <GenerarlStats coins={General}></GenerarlStats>
       <div className='flex flex-row  relative w-[20rem]'> <p className={clsx('rounded-full duration-200 w-1/2 z-[-1] absolute bg-black opacity-20 h-full  ', active&&'translate-x-full')}

       ></p><div className=' flex w-full font-bold text-xl'> <p className='cursor-pointer w-1/2  text-center px-10' onClick={()=>{setActive(false)}}>Main</p><p onClick={()=>{setActive(true)}} className='w-1/2  cursor-pointer px-10 text-center'>Converter</p></div></div>
       
       <div className={active?'hidden':''}>
       <h3>Top coins :</h3>
       <div className='w-full '><CoinList  coins={coins}></CoinList></div>
          <div className='flex  justify-around w-full gap-3 flex-row'>
          
          <div  className='border rounded-md  h-40  chart '><Line   data={chartData} options={{elements:{point:{radius:0}}}} /></div>
          <div  className='border rounded-md   chart '><Line   data={chartData1} options={{elements:{point:{radius:0}}}} /></div>
           </div>
           <p>All Coins:</p>
           <div>Search Coin <input placeholder='Example: Bitcoin' className='text-black' ref={sea} value={search} title='Search Coins' onChange={change} type="text" /></div>
          <div className='mt-5'>
            <div   className='table-Header border flex  justify-between  p-3'>
              <span style={{ cursor: 'pointer' }} className='flex gap-8 '># <p>name</p> </span>
              <span className=''>   </span><span className=''>price</span><span>24 hour change</span><span>24h Volume/ Market Cap </span>
            </div>
           {shown.map((i,index)=> <TableRow key={index} coin={i} ></TableRow>
        )}
          </div></div>
          <div className={active?'mt-10 sm:mt-5 w-fit mx-auto':'hidden '}><App ></App></div>
        </motion.div> : <div className='w-full flex justify-center   '> <div
  class="  bg-blue-200 m-12 inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
  >
  <span
    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
</div></div>}
    </>
  );
}
