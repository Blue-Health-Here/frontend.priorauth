import React from "react"
import Button from "../../components/Button/Button"


const ContactSection: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative flex items-center justify-end">
    <div className="absolute inset-0 z-0 bg-gray-800 overflow-hidden">
      <img 
        src="/images/contact-section.png" 
        alt="Background hands" 
        className="w-full h-full object-cover"
      />
    </div>
    
    {/* contact form */}
    <div className="relative z-10 max-w-4xl p-4 pr-0 mr-0">
      <div className="bg-primary-sky-blue text-primary-white p-6 rounded-bl-3xl rounded-tl-3xl shadow-lg">
        <div className="text-base md:text-lg  mb-4">Get Demo</div>
        
        <h2 className="text-xl sm:text-3xl md:text-5xl font-semibold  mb-6">
          Want To See Prior Auth Support AI In Action?
        </h2>
        
        <form className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-transparent border-b border-primary-white py-2 text-primary-white placeholder-primary-white 
              focus:outline-none focus:border-primary-white placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
            />
          </div>
          
          <div>
            <input 
              type="tel" 
              placeholder="Phone Number" 
              className="w-full bg-transparent border-b border-primary-white py-2 text-primary-white placeholder-primary-white 
              focus:outline-none focus:border-primary-white placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"            />
          </div>
          
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-transparent border-b border-primary-white py-2 text-primary-white placeholder-primary-white 
              focus:outline-none focus:border-primary-white placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"            />
          </div>
          
          <div>
            <input 
              type="text" 
              placeholder="Message" 
              className="w-full bg-transparent border-b border-primary-white py-2 text-primary-white placeholder-primary-white 
              focus:outline-none focus:border-primary-white placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"            />
          </div>
          
          <div className="pt-4">
           <Button title='Submit' noHover textColor='text-black' className="bg-white text-primary-black font-medium px-6 py-2 " />
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ContactSection