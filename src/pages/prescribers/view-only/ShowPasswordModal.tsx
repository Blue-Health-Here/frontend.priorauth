import Loading from "@/components/common/Loading";
import ModalHeader from "@/components/common/ModalHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import ThemeButton from "@/components/common/ThemeButton";
import { Input } from "@/components/ui/input";
import React from "react";

const ShowPasswordModal: React.FC<any> = ({ isLoading, handleSubmit }) => {
    return (
        <ModalWrapper>
            <ModalHeader title="Enter your password" />
            <div className="flex flex-col gap-4 min-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-2 p-4">
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="!px-4 !py-2 w-full"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex justify-end items-center gap-2 border-t border-light-stroke px-4 py-4">
                        <ThemeButton
                            type="submit"
                            className="w-full sm:w-24 rounded-lg min-w-max flex justify-center items-center gap-2"
                            variant="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loading />
                                    Submitting...
                                </>
                            ) : "Submit"}
                        </ThemeButton>
                    </div>
                </form>
            </div>
        </ModalWrapper>
    )
};

export default ShowPasswordModal;