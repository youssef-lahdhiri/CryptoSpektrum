

export default function GenerarlStats({coins}){

    return (

        <div className="mb-4 grid grid-cols-2 gap-4 h-40 text-center ">
            <p className=" rounded-md  border h-full"> Total Coins : {coins?.totalCoins} {coins?.total24Volume}</p>
            <p className="rounded-md border '"> Total Coins : {coins?.total24hVolume}</p>
            <p className='rounded-md border'> Total Exchanges : {coins?.totalExchanges}</p>
            <p className='rounded-md border'> Total Market Cap : ${coins?.totalMarketCap}</p>
            <p className='rounded-md border'> Total Markets: {coins?.totalMarkets}</p>
        </div>
    )
}