import React from 'react';

const TableHeader = () => (
  <div className='border grid grid-flow-col grid-cols-4 p-6'>
    <span style={{ cursor: 'pointer' }} className='text-center ml-8'>Rank</span>
    <span>Name</span><span className='mr-6'>Price</span><span>24 Hour Change</span>
  </div>
);

export default TableHeader;
