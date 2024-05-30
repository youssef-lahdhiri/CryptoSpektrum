import Header from '@/app/components/Header'

import Coin from './coin'
export async function generateStaticParams(){
  const option = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd037705952msh69a7d1cae7247fap11477bjsn8df3a6a779b5',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
  const res= await fetch('https://coinranking1.p.rapidapi.com/coins',option)
  const result =await res.json()
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
