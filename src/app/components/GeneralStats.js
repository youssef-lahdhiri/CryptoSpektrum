import './style.css';
import formatNumber from './formatNumber';

export default function GenerarlStats({coins}){

    return (

        <div className="box mb-4 grid grid-cols-2 gap-4 h-auto text-center ">
            <p className=" shadow-md rounded-md  border h-full"> Total Coins : {coins?.totalCoins} {coins?.total24Volume}</p>
            <p className="shadow-md rounded-md border '"> Total Coins : {coins?.total24hVolume}</p>
            <p className='shadow-md rounded-md border'> Total Exchanges : {coins?.totalExchanges}</p>
            <p className='shadow-md rounded-md border'> Total Market Cap : ${formatNumber(coins.totalMarketCap)}</p>
            <p className='shadow-md rounded-md border'> Total Markets: {coins?.totalMarkets}</p>
        </div>
    )
}