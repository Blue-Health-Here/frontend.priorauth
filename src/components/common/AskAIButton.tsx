import React from 'react'

const AskAIButton: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
    <div className="gradient-class relative rounded-lg md:rounded-2xl w-8 h-8 md:w-12 md:h-12 shadow-lg flex items-center justify-center">
        <img src='/tri-shape.svg' alt="" className="absolute w-[10px] h-3 md:h-4 md:w-[12px] -translate-x-1 translate-y-1"/>
        <img src='/tri-shape.svg' alt="" className="absolute w-[6px] h-[7px] md:h-[9px] md:w-[8px] translate-x-0.5 -translate-y-1"/>
        <img src='/tri-shape.svg' alt="" className="absolute w-[5px] h-[6px] md:h-[8px] md:w-[7px] translate-x-1.5 translate-y-1.5"/>
    </div>
  </div>
  )
}

export default AskAIButton