'use client';
import { Line } from 'react-chartjs-2';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './style.css';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiSpectrumLine } from "react-icons/ri";
import { FaChevronCircleLeft } from "react-icons/fa";
import Header from './components/Header'
import TableRow from './components/TableRow';
import CoinList from './components/CoinList'
import GenerarlStats from './components/GeneralStats';
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
export default function Home() {
  const [General,setGeneral]=useState([])
  const [coins, setCoins] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [chartData1, setChartData1] = useState({ labels: [], datasets: [] });
  const [search, setSearch] = useState('');
  const [shown, setShown] = useState([]);
  const sea = useRef(null);
  const url1 = 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h';
  const options1 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd037705952msh69a7d1cae7247fap11477bjsn8df3a6a779b5',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
  const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd037705952msh69a7d1cae7247fap11477bjsn8df3a6a779b5',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
  const fetchCoinData = async () => {
    try {
      
      
      const response = await fetch(url, options);
      const result = await response.json();
      const result1=result.data.coins[1]?.sparkline.map(price => parseFloat(price))
      setGeneral(result.data.stats)
      setCoins(result.data.coins.slice(0, 40));
      setShown(result.data.coins.slice(0, 40));
      const now = new Date();
      const labels = [];
      for (let i = 23; i >= 0; i--) {
        const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(hour.toISOString().substring(11, 16)); // Format HH:MM
      }
      const data = result.data.coins[0]?.sparkline.map(price => parseFloat(price))
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
          data: result1,
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'blue',
          tension: 0.1
        }]
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCoinData();
  }, []);
  const change = () => {
    setSearch(sea.current?.value);
    setShown(coins.filter(i => i.name.toLowerCase().includes(sea.current?.value.toLowerCase())));
  };

  return (
    <>
      <div className=' shadow-md w-2/3 right-40 items-center place-items-center m m-auto'>
       <Header></Header>
       <h3>General Stats :</h3>
       <GenerarlStats coins={General}></GenerarlStats>
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
            {shown?shown.map((i,index)=> <TableRow key={index} coin={i} ></TableRow>
        ):'loading'}
          </div>
        </div>
    </>
  );
}
