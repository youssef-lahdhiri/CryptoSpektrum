import Header from '@/app/components/Header'
// import { fetchCoin } from '../../fetchCoin';
import Coin from './coin'
export async function generateStaticParams(){
  const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
  const option = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':process.env.API_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
  const response= await fetch(url,option)
  const result =await response.json()
return (result.data.coins.map(coin=>({id:coin.uuid.toString(),
})))
 }
  export  default async function App({ params }) {
    const id=params.id
    return (
      <>
      <div className='flex items-center justify-center w-[20rem] mx-auto'>
      <Header/></div>
      <Coin id={id} />
      </>
    )
}
