import PharmacyRequests from "@/pages/pharmacy/requests";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowPasswordModal from "./ShowPasswordModal";
import PrescriberViewOnlyLayout from "@/layouts/PrescriberViewOnlyLayout";

const PrescribersViewOnly: React.FC<any> = () => {
    const { prescriberId, inviteCode } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(true);
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            setIsLoading(false);
            setShowModal(false);
            localStorage.setItem("user", JSON.stringify({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViYjljMGJlLWZkMDMtNGFiZC1hYTU0LTU2NmY3YmNlZjY3ZiIsIm5hbWUiOiJKb2huMSBXaWNrMSIsImNvbXBhbnlJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMSIsInByaXZpbGVnZXMiOltdLCJyb2xlQ29kZSI6InBoYXJtYWN5VXNlciIsImlhdCI6MTc1Mzk4NTk5MywiZXhwIjoxNzU0ODQ5OTkzfQ.rjnWZ4w6NOfGihi8tPw4wtsD9tkbXYMAuzjQVggSSvY" }));
        } catch (error) {
            setIsLoading(false);
        } finally {
            setShowModal(false);
        }
    };

    console.log(prescriberId, inviteCode, showModal, "inviteCode");
    return (
        <PrescriberViewOnlyLayout>
            {showModal ? (
                <ShowPasswordModal isLoading={isLoading} handleSubmit={handleSubmit} />
            ) : (
                <PharmacyRequests prescriberId={prescriberId} inviteCode={inviteCode} />
            )}
        </PrescriberViewOnlyLayout>
    )
};

export default PrescribersViewOnly;