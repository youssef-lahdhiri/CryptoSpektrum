import React from 'react';
import { RiSpectrumLine } from "react-icons/ri";

const Header = () => (
  <div className='m-10 ml-0 w-full flex flex-row h-10'>
    <RiSpectrumLine className='text-3xl h-10' />
    <h1 className='text-3xl'>CryptoSpectrum</h1>
  </div>
);

export default Header;
