import StatCard from "@/components/common/StatCard";
import PARequestsSection from "./PARequestsSection";
import { globalStatsData, yearlyRequestsData } from "@/utils/constants";
import GlobalStatsCard from "@/components/common/GlobalStatsCard";
import DashboardRequestCard from "@/components/common/DashboardRequestCard";
import InsuranceWiseChart from "@/components/InsuranceWiseChart";
import MedicationWiseChart from "@/components/MedicationWiseChart";
import ApprovalDenialCards from "@/components/ApprovalDenialCards";
import WithCNOrWithoutCNCards from "@/components/WithCNOrWithoutCNCards";
import CaseAnalysisCard from "./CaseAnalysisCard";

const PharmacyDashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-primary-black font-medium">Dashboard</h1>
      <PARequestsSection />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-4">
        <div className="sm:col-span-2 xl:col-span-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-4 h-full">
            <StatCard
              title="Today's Request"
              className="col-span-2 bg-gradient-to-br from-[#0000FD] to-[#74F8FD] min-h-[120px] rounded-xl"
              value="150"
            />
            <StatCard
              title="Prescribers"
              className="col-span-1 min-h-[120px] rounded-xl"
              value="48"
            />
            <div className="col-span-3">
              <DashboardRequestCard
                title="Requests"
                description=""
                value="42K"
                data={yearlyRequestsData}
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2 xl:col-span-6 h-full">
          <GlobalStatsCard
            title="Global Stats"
            description=""
            data={globalStatsData}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MedicationWiseChart />
        <InsuranceWiseChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ApprovalDenialCards />
        <WithCNOrWithoutCNCards />
        {/* <InsuranceWiseChart /> */}
      </div>
      <div className="grid grid-cols-1 gap-4">
        <CaseAnalysisCard />
      </div>
    </div>
  );
};

export default PharmacyDashboard;
