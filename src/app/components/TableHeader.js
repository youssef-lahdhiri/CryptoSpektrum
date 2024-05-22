import React from 'react';
import './tableHeader.css';

const TableHeader = () => (
  <div className='box border grid grid-flow-col grid-cols-4 p-6'>
    <span style={{ cursor: 'pointer' }} className='box text-center ml-8'>Rank</span>
    <span>Name</span><span className='mr-6'>Price</span><span>24 Hour Change</span> <span>24h Volume/ Market Cap </span>
  </div>
);

export default TableHeader;
