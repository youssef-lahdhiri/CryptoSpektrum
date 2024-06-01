import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CoinItem = ({ coin }) => {
    const price=Math.floor((coin.price*100))/100;
   return  (
  <div className='   shadow-md  border rounded-md '>
    <Link className='flex  cursor-pointer' href={`/coin/${coin.uuid}`}>
      <div className= 'cursor-pointer w-48 flex flex-row gap-4 p-3 items-center'>
        <Image alt={coin.symbol} src={coin.iconUrl} width={30} height={30} />
        <div className='cursor-pointer flex flex-wrap flex-col'>
        <p className='cursor-pointer text-center align-center text-xs'>{coin.name}{`(${coin.symbol})`}</p>
        <p className= ' cursor-pointer text-gray-400 text-gr text-sm text-center' >${price}</p>
        </div>
      </div>
    </Link>
  </div>
);}

export default CoinItem;
