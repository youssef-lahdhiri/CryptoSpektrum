import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => (
  <div className='border rounded-md w-1/2'>
    <Line data={data} options={{ maintainAspectRatio: false }} />
  </div>
);

export default Chart;
