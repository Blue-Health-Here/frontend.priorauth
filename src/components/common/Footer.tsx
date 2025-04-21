import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className='fixed bottom-0 left-0 right-0 w-full sm:py-5 py-3 z-[999] px-4'> 
    <div className="p-1 sm:p-2 text-center flex justify-center items-center gap-x-1 rounded-b-lg text-primary-white bg-primary-sky-blue">
    <span className="text-lg md:text-xl">&copy;</span><p className="text-xs md:text-sm">Copyrights Futuro 2024 - All Rights Reserved.</p>
   </div>
    </footer>
  )
}

export default Footer