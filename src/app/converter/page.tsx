'use client'
import Rright from './right';
import Main from './Main';
import Left from './left';
import ContextProvider from './contextProvider';
import ReverseButton from './button';

export default function App() {
  return (
    <>
      <div className="flex justify-center items-center gap-3">
        {/* <ReverseButton> */}
        <ContextProvider>
        <Rright/>
      
         
        
        {/* <Left/> */}
       </ContextProvider>
       {/* </ReverseButton> */}
        {/* <Main></Main> */}
      </div>
    </>
  );
}
