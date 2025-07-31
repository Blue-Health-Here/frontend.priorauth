import PrescriberViewOnlyLayout from "@/layouts/PrescriberViewOnlyLayout";
import PharmacyRequestDetails from "@/pages/pharmacy/requests/details";
import { useParams } from "react-router-dom";

const PrescribersRequestDetailsPage = () => {
    const { prescriberId, inviteCode } = useParams();
    return (
        <PrescriberViewOnlyLayout>
            <PharmacyRequestDetails inviteCode={inviteCode} prescriberId={prescriberId} />
        </PrescriberViewOnlyLayout>
    )
};

export default PrescribersRequestDetailsPage;
