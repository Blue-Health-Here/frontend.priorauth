import React from 'react'
import AskAIButton from './AskAIButton';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="fixed right-4 bottom-14 sm:bottom-18">
        <AskAIButton />
      </div>
      <footer className='fixed bottom-0 left-0 right-0 w-full sm:py-5 py-3 z-[90] px-4'>
        <div className="p-1 sm:p-2 text-center flex justify-center items-center gap-x-1 rounded-b-lg text-primary-white bg-primary-sky-blue">
          <span className="text-lg md:text-xl">&copy;</span><p className="text-xs md:text-sm">Copyrights Futuro {currentYear} - All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Footer