import { Link } from 'react-router-dom';
import { adminSidebarItems } from '../../../constants';

const AdminSidebar: React.FC= () => {
    return (
        <>
        <aside className="bg-primary-white rounded-2xl">
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
        </aside></>)
}

export default AdminSidebar