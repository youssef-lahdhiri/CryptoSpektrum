'use client';
import { Line ,Bar} from 'react-chartjs-2';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import formatNumber from '@/app/components/formatNumber';
import Link from 'next/link';
import './style.css'
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
export async function generateStaticParams() {
  const url='https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0'
  const options1 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd037705952msh69a7d1cae7247fap11477bjsn8df3a6a779b5',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
  const posts = await fetch(url,options1).then((res) => res.json().data.coins.slice(0,40))
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
export default function App({ params }) {
  const time=['24h','7d','30d','1y','5y']
  const now = new Date();
        const labels = [];
        for (let i = 23; i >= 0; i--) {
          const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
          labels.push(hour.toISOString().substring(11, 16)); // Format HH:MM
        }
  const [value,selectedValue]=useState('24h')

  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState({ labels: [labels], datasets: [] });
  const id = params?.slug[0];
  const url1 = `https://coinranking1.p.rapidapi.com/coin/${id}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${value}`;
  const options1 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd037705952msh69a7d1cae7247fap11477bjsn8df3a6a779b5',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
  const url2=`https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${value}`
const option={
  bezierCurve:false,
  elements:{
    point:{
      radius:0
    }
  
  },
  responsive:true,
  maintainAspectRatio:false,
}
  useEffect(() => {
    const fetchHistory=async()=>{
      try{
        const response=await fetch(url2,options1)
        const result = await response.json()
        console.log(result )
        const hs=result.data.history.map((i)=>i.price)
        console.log(hs)
        
        let timeStamp = result.data.history.map((i) => (new Date(i.timestamp * 1000).toLocaleDateString()));
        
        setChartData({
          labels: (value=='24h')?labels:[...timeStamp].reverse(),
          datasets: [{
            label: `${coin?.name}`,
            data: hs.reverse(),
            fill: false,
            borderColor: 'blue',
            tension: 0.1
          }]
        });
      }
    catch(error){
      console.log(error)
    };
    };
    const fetchData = async () => {
      try {
        const response = await fetch(url1, options1);
        const result = await response.json();
        const coinData = result.data.coin;
        setCoin(coinData);
        console.log(result.data.coin)

        // Generate labels for the last 24 hours
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchHistory()
    fetchData();
  }, [id,value]);
const se=useRef()
const changeValue=(event)=>{
  selectedValue(event.target.value)
}
  return (
    <div className='w-full h-full'>
    <div className='m-auto w-2/3 mt-5 main '>
      {/* <h1 className=''>Coin Details</h1> */}
      {coin ? (
        <div className=''>
          <Link  href='/'><p className='shadow-md cursor-pointer border rounded-md  h-8 w-20 cursor-pointershadow-md    text-center' >Home</p></Link>
          <div className='flex mt-5 mb-2 '><Image src={coin.iconUrl} width={50} height={50} alt={`${coin.name} icon`} />
          <p className='m-auto ml-0 text-2xl font-bold'>{`${coin.name} (${coin.symbol})`}</p></div>
          <p>{coin.description}</p>
          <div  className='divv flex flex-wrap gap-3 w-full'>
          <p className='rounded-md shadow-md h-20 border text-center flex justify-center items-center  '>Price: ${formatNumber(coin.price)}</p>
          <p className='rounded-md shadow-md h-20 border text-center flex justify-center items-center  '>Total Supply: {coin.supply.total}</p>
          <p className='rounded-md shadow-md h-20 border text-center flex justify-center  items-center '>Circulating Supply: {coin.supply.circulating}</p>
          <p className='rounded-md shadow-md h-20 border text-center flex justify-center items-center  '>Market Cap: ${formatNumber(coin.marketCap)}</p>
          <p className='rounded-md shadow-md h-20 border text-center  flex justify-center items-center '>24h Volume: ${formatNumber(coin['24hVolume'])}</p>
          </div>
        </div>
      ) : ( 
        <p>Loading...</p>
      )}
      <select onChange={changeValue} value={value} ref={se} className=' mt-5 mb-5 border rounded-md shadow-md h-8 w-16'>{time.map(i=>( <option className='text-black w-40 border text-center'> {i}</option> ))}</select>
     
      <div className='chart1'><Line className='chart1' data={chartData} options={option} /></div>
     </div>
     </div>
  );
}
