import PharmacyRequests from "@/pages/pharmacy/requests";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowPasswordModal from "./ShowPasswordModal";
import PrescriberViewOnlyLayout from "@/layouts/PrescriberViewOnlyLayout";
import { useDispatch } from "react-redux";
import { handleAccessInvite, handleInviteValidate } from "@/services/authService";
import toast from "react-hot-toast";

const PrescribersViewOnly: React.FC<any> = () => {
    const { prescriberId, inviteCode } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        const user: any | null = JSON.parse(localStorage?.getItem("user"));
        if (!user?.token && !user.inviteCode) {
            // Do nothing or handle unauthorized state if needed
            return;
        } else {
            setShowModal(true);
        }
    }, []);

    const handleSubmit = async (values: any) => {
        setIsLoading(true);
        try {
            const response = await handleInviteValidate(dispatch, values, inviteCode);
            if (response.isValid) {
                const result = await handleAccessInvite(dispatch, values, inviteCode);
                if (result.isValid) {
                    localStorage.setItem("user", JSON.stringify({
                        token: result?.token,
                        inviteCode
                    }));
                    setShowModal(false);
                }
            } else {
                toast.error(response.message);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

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