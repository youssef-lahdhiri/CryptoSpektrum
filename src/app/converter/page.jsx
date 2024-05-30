'use client'
import Rright from './right';
import ContextProvider from './contextProvider';
export default function App() {
  return (
    <>
      <div className="flex justify-center items-center gap-3">
        <ContextProvider>
        <Rright/>
       </ContextProvider>
      </div>
    </>
  );
}
