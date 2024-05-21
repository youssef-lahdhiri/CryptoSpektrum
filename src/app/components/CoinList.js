import React from 'react';
import CoinItem from './CoinItem';
import { FaChevronCircleLeft,FaChevronCircleRight } from "react-icons/fa";
import { useRef } from 'react';
const CoinList = ({ coins }) =>{ 
    const toLeft=useRef()
    const scrollLeft=()=>{
        toLeft.current.scrollLeft-=200;
    }
    const scrollRight=()=>{
        toLeft.current.scrollLeft+=200;
    }
    return (
    <>
    <div className='relative'>
    <button onClick={scrollLeft} className=' opacity-0 md:opacity-100 absolute -left-3 top-1/4 scroll-smooth mt-2  rounded-full text-2xl z-10 '><FaChevronCircleLeft /> </button>
    <button onClick={scrollRight} className='opacity-0 md:opacity-100 absolute -right-3  top-1/4 scroll-smooth mt-2  rounded-full text-2xl z-10 '><FaChevronCircleRight /> </button>
  <div ref={toLeft} className='  h-18 scroll-smooth z-0 relative m-5 ml-0 w-full grid grid-flow-col gap-3  overflow-auto md:overflow-hidden'>
    {coins ? coins.slice(0, 10).map((coin, index) => (
      <CoinItem key={index} coin={coin} />
    )) : 'loading'}
  </div>
  </div>

  </>
);
}

export default CoinList;
