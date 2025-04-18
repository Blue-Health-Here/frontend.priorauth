
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/sidebar";
import Topbar from "../components/common/Topbar";

const AdminLayout: React.FC<{ children: any }> = ({ children }) => {
  return (

    <div className="min-h-screen bg-gray-100 overflow-x-hidden p-4">
    <Sidebar  />
    <div className="w-full">
      <Topbar  />
      <div className="ml-auto lg:ml-[250px] xl:ml-[260px] pl-4 pt-[4.7rem] overflow-hidden">
        {children}
      </div>
    </div>
   <Footer/>
  </div>

  );
};

export default AdminLayout;
