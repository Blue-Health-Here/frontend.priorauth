import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import { Label } from "@/components/common/Label";
import React from "react";

const ByLinkEmail: React.FC<any> = () => {
    return (
        <div className="space-y-2">
            <Label className="text-quaternary-white text-sm font-secondary">
                Invite by Email
            </Label>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-[390px]">
                    <InputField name="email" placeholder="Enter Email" />
                </div>
                <div className="w-full md:w-[249px]">
                    <SelectField
                        name="role"
                        options={[
                            { value: "Viewer", label: "Viewer" },
                            { value: "Editor", label: "Editor" }
                        ]}
                        placeholder="Select role"
                    />
                </div>
            </div>
        </div>
    )
};

export default ByLinkEmail;