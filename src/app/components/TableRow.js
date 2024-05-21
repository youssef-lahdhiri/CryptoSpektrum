import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TableRow = ({ coin }) => (
  <Link href={`/coin/${coin?.uuid}`}>
    <div className='p-3 border w-full grid grid-flow-col grid-cols-4 gap-2 border-b cursor-pointer'>
      <span className='text-center'>{coin?.rank}</span>
      <span className='text-center flex font-bold items-center'>
        <Image className='m-4' src={coin?.iconUrl} width={40} height={30} />
        <span>{coin?.name} {`(${coin?.symbol})`}</span>
      </span>
      <span className='w-1/5 text-center'>${Math.floor(coin?.price * 100) / 100}</span>
      <span className={coin?.change.includes('-') ? 'text-red-500 text-center' : 'text-green-600 text-center'}>
        {coin?.change}

      </span>
      <span> {coin['24hVolume']} {coin.marketCap}   </span>
      <span className='rounded-md h-2 w-32 bg-blue-200 relative '>  <span className='absolute h-2 w-20 bg-blue-800 top-0 rounded-md  z-10 '></span></span>
     
    </div>
  </Link>
);

export default TableRow;
