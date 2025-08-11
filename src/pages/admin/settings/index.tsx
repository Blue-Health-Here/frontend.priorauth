import React from "react";
import UserSettingsCard from "./SettingsCard";
import { userSettingsData } from "../../../utils/constants";

const AdminSettings: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {userSettingsData.map((item, idx) => (
        <UserSettingsCard
          key={idx}
          icon={item.icon}
          title={item.title}
          description={item.description}
          path={item.path}
        />
      ))}
    </div>
  );
};

export default AdminSettings;
