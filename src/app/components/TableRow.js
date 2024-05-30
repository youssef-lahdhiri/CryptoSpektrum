import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './tableRow.css';
import  formatNumber  from './formatNumber.js';

const TableRow = ({ coin }) => (
  <Link  href={`/coin/${coin?.uuid}`}>
    <div style={{gridColumn:'1fr 1fr 3fr 3fr 3fr ' }} className='text-center box shadow-md mt-2 border rounded-md flex flex-cols justify-between h-20 gap-10   p-2 border-b cursor-pointer'>
      <div className='box2 flex '>
      <span className='mr-4'>{coin?.rank}</span>
      <Image className='h-10 align-center mb-12 ' src={coin?.iconUrl} width={40} height={40} />
      <span className=' flex flex-cols items-top  gap-1 font-bold'>
        
        <span className='w-40 text-sm mt-2 name' >{coin?.name} {`(${coin?.symbol})`}</span>
      </span></div>
      <span className=' w-1/5 text-center price'>${Math.floor(coin?.price * 100) / 100}</span>
      <span className={coin?.change?.includes('-') ? ' change text-red-500 text-center' : 'text-green-600 text-center change'}>
        {coin?.change}
      </span>
      
      <div className='relative hide  w-64   '> <span  style={{backgroundColor:`${coin.color}`}} className='  absolute  opacity-50 rounded-md h-2 w-full  left-0  top-1/2 C '>  </span><span style={{backgroundColor:`${coin.color}`}} className='  opacity-100 absolute h-2 w-20  left-0 top-1/2 rounded-md  z-100 '></span>
     <span className='absolute left-0'> ${formatNumber(coin['24hVolume'])}    </span> <span className='absolute right-0'>${formatNumber(coin.marketCap)}</span> </div>
    </div>        
    
  </Link>
);

export default TableRow;
