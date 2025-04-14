import { useState } from 'react';
import { faqItems } from '../../constants';
import Button from '../../components/Button/Button';
import { FaMinus, FaPlus } from "react-icons/fa6";

const FAQAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 p-6 bg-quaternary-navy-blue px-6 md:px-8 py-20 md:py-48">
      <div className="md:col-span-8">
        <div className="md:pr-8">
          <div className="text-primary-black">
            <p className="text-sm md:text-lg uppercase mb-2">FAQs</p>
            <h1 className="text-xl sm:text-3xl md:text-5xl font-semibold mb-6">Frequently Asked Questions</h1>
          </div>   
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleItem(index)}
                >
                  <h3 className="text-secondary-black text-sm sm:text-lg md:text-xl font-semibold">{item.question}</h3>
                  <div className="flex items-center justify-center h-8 w-8 text-blue-500">
                    {activeIndex === index ? <Button noHover isSmall icon={<FaMinus />}/> : <Button className='bg-primary-sky-blue' isSmall icon={<FaPlus />}/>}
                  </div>
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out ${activeIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
                >
                  <div className="mt-2 text-xs sm:text-sm md:text-base font-secondary text-secondary-black">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:col-span-4 flex md:self-stretch">
        <div className="w-full h-full flex">
          <img 
            src="/images/FAQ-information.png" 
            alt="FAQ Information" 
            className="rounded-3xl w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
export default FAQAccordion