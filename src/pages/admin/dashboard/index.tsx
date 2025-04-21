import PharmacySection from "./PharmacySection";
import PrescribersSection from "./PrescribersSection";
import RequestsSection from "./RequestsSection";
import StaffSection from "./StaffSection";
import StatsSection from "./StatsSection";
import TasksSection from "./TasksSection";

const AdminDashboard = () => {
  return (
    <div>
      <StatsSection />
      <PharmacySection />
      <RequestsSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
        <PrescribersSection />
        <StaffSection />
      </div>
      <TasksSection />
    </div>
  );
};

export default AdminDashboard;