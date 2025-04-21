
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/sidebar";
import Topbar from "../components/common/Topbar";
const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden p-4">
    <Sidebar  />
    <div className="w-full">
      <Topbar  />
      <div className="ml-auto lg:ml-[250px] xl:ml-[260px] lg:pl-4 pt-[4.7rem] pb-14 overflow-hidden">
      <Outlet />
      </div>
    </div>
   <Footer/>
  </div>

  );
};

export default AdminLayout;
