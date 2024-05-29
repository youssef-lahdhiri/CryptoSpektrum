
export const fetchCoinData = async () => {
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
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const coins = result.data.coins.slice(0, 40);
  
      const now = new Date();
      const labels = [];
      for (let i = 23; i >= 0; i--) {
        const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(hour.toISOString().substring(11, 16)); // Format HH:MM
      }
  
      const data = result.data.coins[0]?.sparkline.map(price => parseFloat(price));
  
      const chartData = {
        labels: labels,
        datasets: [{
          label: `${result.data.coins[0]?.name} Price (last 24 hours)`,
          data: data,
          fill: false,
          borderColor: 'blue',
          backgroundColor: 'blue',
          tension: 0.1
        }]
      };
  
      return { coins, chartData };
    } catch (error) {
      console.error(error);
      return { coins: [], chartData: { labels: [], datasets: [] } };
    }
  };
  