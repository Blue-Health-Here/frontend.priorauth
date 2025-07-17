import PharmacyRequests from "@/pages/pharmacy/requests";
import React from "react";
import { useParams } from "react-router-dom";

const PrescriberDetails: React.FC<any> = ({ isAdmin }) => {
    const { username } = useParams();
    return (
        <PharmacyRequests idAdmin={isAdmin} prescriber={username} />
    )
};

export default PrescriberDetails;
