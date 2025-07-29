import PharmacyRequests from "@/pages/pharmacy/requests";
import React from "react";
import { useParams } from "react-router-dom";

const PrescriberDetails: React.FC<any> = ({ isAdmin }) => {
    const { id } = useParams();
    return (
        <PharmacyRequests idAdmin={isAdmin} prescriberId={id} />
    )
};

export default PrescriberDetails;
