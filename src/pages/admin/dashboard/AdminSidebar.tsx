import { Link } from 'react-router-dom';
import { adminSidebarItems } from '../../../constants';

const AdminSidebar: React.FC= () => {
    return (
        <div className="w-16 md:w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="ml-2 font-semibold text-gray-800 hidden md:block">priorauth</span>
          </div>
        </div>
        
        {/* Navigation Items */}
        <div className="flex-1 py-4">
          <ul>
            {adminSidebarItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`flex items-center px-4 py-3 text-sm ${
                    item.active 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {/* <span className="w-6 h-6 flex items-center justify-center">
                    <i className={`feather-${item.icon}`}></i>
                  </span> */}
                  <img src={item.icon} alt={`${item.name} Icon`} width={20} height={20} />
                  <span className="ml-3 hidden md:block">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  

export default AdminSidebar
{/* <aside className="bg-primary-white rounded-2xl">
    <h1 className="text-xl text-center font-semibold">LOGO</h1>
    <ul className="mt-16 flex flex-col gap-y-2 text-[15px]">
        {adminSidebarItems.map((item, index) => {
            return (
                <Link  key={index} to={''}>
                    <li className={`flex items-center gap-x-3 p-3 h-9 md:h-11 rounded-lg cursor-pointer transition font-medium
                      
                      `}>
                        <img src={item.icon} alt={`${item.name} Icon`} width={20} height={20} className={item.icon === '/sidebar-checklist.svg' ? 'max-h-5' : item.icon === '/sidebar-docs-verification.svg' || '/sidebar-operations-checklis.svg' ? 'max-h-4' : ''}/>
                        <span className='text-xs sm:text-sm xl:text-[16px]'>{item.name}</span>
                    </li>
                </Link>
            )
        })}
    </ul>
</aside> */}