export async function fetchCoin(){
    const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':process.env.API_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
  const result =fetch(url,options)
  .then(res=>res.json())
  return result 
}