import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchProfileData } from "../../../services/adminService";
import UserSettingsCard from "./SettingsCard";
import { userSettingsData } from "../../../utils/constants";

const AdminSettings: React.FC = () => {
  const { profileData } = useSelector((state: RootState) => state.global);
  const isProfileFetched = useRef(false);
  const dispatch = useDispatch();

  const fetchData = async () => {
    await fetchProfileData(dispatch);
  }

  useEffect(() => {
    if (!isProfileFetched.current) {
      fetchData();
      isProfileFetched.current = true;
    }
  }, []);

  console.log(profileData, "profileData");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
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
