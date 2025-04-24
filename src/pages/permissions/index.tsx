import React, { useState } from 'react';
import CustomCheckbox from '../../components/common/form/CustomCheckbox';

interface Permission {
    id: string;
    label: string;
}

interface PermissionGroup {
    name: string;
    permissions: Permission[];
}

interface PermissionMatrix {
    [role: string]: {
        [permissionId: string]: boolean;
    };
}

const RolesAndPermissions: React.FC = () => {
    const roles: string[] = ["Admin", "Clinician"];
    const permissionGroups: PermissionGroup[] = [
        {
            name: "Requests",
            permissions: [
                { id: "viewRequest", label: "View Request" },
                { id: "addRequest", label: "Add Request" },
                { id: "editRequestDetails", label: "Edit Request Details" },
                { id: "blockUnblockRequest", label: "Block/Unblock Request" },
                { id: "removeRequest", label: "Remove Request" },
            ]
        },
        {
            name: "Tasks",
            permissions: [
                { id: "viewTask", label: "View Task" },
                { id: "addTask", label: "Add Task" },
                { id: "editTaskDetails", label: "Edit Task Details" },
                { id: "blockUnblockTask", label: "Block/Unblock Task" },
                { id: "deleteTask", label: "Delete Task" },
            ]
        }
    ];

    const [permissionMatrix, setPermissionMatrix] = useState<PermissionMatrix>({
        Admin: {
            viewRequest: false, addRequest: false, editRequestDetails: false, blockUnblockRequest: false, removeRequest: true,
            viewTask: true, addTask: true, editTaskDetails: true, blockUnblockTask: false, deleteTask: false
        },
        Clinician: {
            viewRequest: true, addRequest: true, editRequestDetails: true, blockUnblockRequest: true, removeRequest: false,
            viewTask: false, addTask: false, editTaskDetails: false, blockUnblockTask: true, deleteTask: true
        }
    });

    const togglePermission = (role: string, permissionId: string) => {
        setPermissionMatrix(prev => ({
            ...prev,
            [role]: {
                ...prev[role],
                [permissionId]: !prev[role][permissionId]
            }
        }));
    };

    return (
        <div className="min-h-[calc(100vh-17rem)] bg-primary-white rounded-2xl shadow-lg px-4 sm:px-6 pt-9 pb-4">
            <div className="flex justify-between items-center">
                <h1 className="text-base sm:text-lg md:text-xl font-semibold text-primary-black">Roles & Permissions</h1>
                <div className="sm:hidden block text-center">
                    <div className="text-primary-navy-blue hover:text-primary-sky-blue font-semibold text-xs sm:text-sm  cursor-pointer">+Add Role</div>
                </div>
            </div>
            <div className="pt-3">
                <div className="flex items-center border-b border-light-stroke py-2">
                   <div className="flex justify-between sm:justify-normal  items-center w-4xl">
                   <div className="w-1/2 text-tertiary-black text-xs sm:text-sm md:text-base">Roles</div>
                    {roles.map(role => (
                        <div key={role} className="w-1/6 text-center text-tertiary-black text-xs sm:text-sm md:text-base">{role}</div>
                    ))}
                <div className="hidden sm:block flex-shrink-0 w-1/6 text-center">
                    <div className="text-primary-navy-blue hover:text-primary-sky-blue font-semibold text-xs sm:text-sm  cursor-pointer">+Add Role</div>
                </div>
                   </div>
                </div>
            </div>

            {permissionGroups.map(group => (
                <div key={group.name} className="pt-2 xl:w-4xl">
                    <div className="text-tertiary-black text-xs sm:text-sm">{group.name}</div>
                    {group.permissions.map(permission => (
                        <div key={permission.id} className="flex justify-between sm:justify-normal border-b border-light-stroke py-4">
                            <div className="w-1/2 text-secondary-black text-xs sm:text-sm md:text-base">{permission.label}</div>
                            {roles.map(role => (
                                <div key={`${role}-${permission.id}`} className="w-1/6 flex justify-center">
                                    <CustomCheckbox
                                        checked={permissionMatrix[role][permission.id] || false}
                                        onChange={() => togglePermission(role, permission.id)} id={''} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
            <div className="flex-shrink-0 pt-2">
                <button className="text-primary-navy-blue hover:text-primary-sky-blue font-semibold text-xs sm:text-sm  cursor-pointer">+Add Permission</button>
            </div>
        </div>
    );
};

export default RolesAndPermissions;