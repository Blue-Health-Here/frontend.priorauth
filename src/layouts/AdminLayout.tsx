
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/sidebar";
import Topbar from "../components/common/Topbar";
import AskAIButton from "../components/common/AskAIButton";
const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary-background overflow-x-hidden p-4">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        <div className="ml-auto lg:ml-[250px] xl:ml-[260px] lg:pl-4 pt-[3.7rem] sm:pt-[4.7rem] pb-[3.5rem] overflow-hidden">
          <Outlet />
          <div className="flex justify-end items-end">
            <AskAIButton />
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default AdminLayout;
