// 'use client '
// import { Link } from "next/link";
// import {Image} from 'next/Image';

// export default function Table({props}){
//     const coins=props?.coins
//     return (
//         <>
//           {/* <button className='bg-slate-300 rounded-full absolute left-48' onClick={toLeft}>left</button> */}
//           <div ref={table} className='scroll-smooth h-20 grid grid-flow-col gap-2 w-full overflow-x-hidden'>
//             <div className='w-96 grid grid-flow-col gap-2'>
//               {coins ? coins.slice(1, 10).map((i, index) => (
//                 <div key={index}>
//                   <Link href={`/coin/${i.uuid}`}>
//                     <div className='rounded-md flex w-44 border h-10 align-center justify-center'>
//                       <Image alt={i.symbol} src={i.iconUrl} width={30} height={30}></Image>
//                       <p className='text-center align-center'>{i.name}</p>{`(${i.symbol})`}
//                     </div>
//                   </Link>
//                 </div>
//               )) : 'loading'}
//             </div>

//             {/* <button onClick={swipeRight} className='bg-slate-300 rounded-full absolute right-48'>right</button> */}
//           </div>
//           </>
//     );
// }