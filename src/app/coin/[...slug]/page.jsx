'use client';
import { Line ,Bar} from 'react-chartjs-2';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

export default function App({ params }) {
  const time=['24h','7d','30d','1y','5y']
  const [value,selectedValue]=useState('24h')

  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
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
  }
}
  useEffect(() => {
    const fetchHistory=async()=>{
      try{
        const response=await fetch(url2,options1)
        const result = await response.json()
        console.log(result )
        const hs=result.data.history.map((i)=>i.price)
        console.log(hs)
        const timeStamp = result.data.history.map((i) => (new Date(i.timestamp * 1000).toLocaleDateString()));
        setChartData({
          labels: timeStamp.reverse(),
          datasets: [{
            label: 'hello',
            data: hs.reverse(),
            fill: false,
            borderColor: 'green',
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
        const now = new Date();
        const labels = [];
        for (let i = 23; i >= 0; i--) {
          const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
          labels.push(hour.toISOString().substring(11, 16)); // Format HH:MM
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHistory()
    fetchData();
  }, [id,value]);
const se=useRef()
const ddo=(event)=>{
  selectedValue(event.target.value)
}
  return (
    <div>
      <h1>Coin Details</h1>
      {coin ? (
        <div>
          <Link href='/'>Home</Link>
          <Image src={coin.iconUrl} width={50} height={50} alt={`${coin.name} icon`} />
          <p>{`${coin.name} (${coin.symbol})`}</p>
          <p>{coin.description}</p>
          <p>Price: {coin.price}</p>
          <p>Total Supply: {coin.supply.total}</p>
          <p>Circulating Supply: {coin.supply.circulating}</p>
          <p>Market Cap: {coin.marketCap}</p>
          <p>24h Volume: {coin['24hVolume']}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <select onChange={ddo} value={value} ref={se} className='flex flex-wrap absolute left-4  text-black w-20'>{time.map(i=>( <option className='text-black w-40 border text-center'> {i}</option> ))}</select>
      <div className='h-auto w-1/2'><Line data={chartData} options={option} /></div>
    </div>
  );
}
