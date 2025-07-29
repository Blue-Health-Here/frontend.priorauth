
import { Outlet } from "react-router-dom";
// import Footer from "../components/common/Footer";
import Sidebar from "../components/common/sidebar";
import Topbar from "../components/common/Topbar";
import { useSelector } from "react-redux";
import { RootState } from "../store";
// import { useEffect } from "react";

const AdminLayout: React.FC = () => {
  const { isSidebarCollapsed } = useSelector((state: RootState) => state.global);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const userData = localStorage.getItem("user");
  //   const token = userData ? JSON.parse(userData) : null;

  //   if (!token) {
  //     navigate("/login")
  //     return;
  //   }
  // }, []);

  const mainContentClass = isSidebarCollapsed ? `
    ml-auto lg:ml-[80px]
  ` : 'ml-auto lg:ml-[280px] xl:ml-[280px]'

  return (
    <div className="min-h-screen bg-primary-background overflow-x-hidden">
      <Sidebar />
      <div className="w-full">
        <Topbar isAdmin={true} />
        <div className={`${mainContentClass} pt-[110px] transition-all duration-500 md:pt-[95px] px-4 pb-4 md:px-6 md:pb-6 overflow-hidden`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
