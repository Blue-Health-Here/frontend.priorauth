import { Input } from "@/components/ui/input"
import { useField } from "formik"
import type React from "react"

interface DataPointProps {
    icon?: React.ReactNode
    label?: string
    data?: string
    name: string
    isEditing?: boolean
    type?: string
}

export default function DataPoint({
    icon,
    label,
    data,
    name,
    isEditing = false,
    type = "text"
}: DataPointProps) {
    const [field, meta] = useField(name)

    return (
        <div className="flex items-center gap-3 ">
            {icon && (
                <div 
                    className="w-8 h-8 rounded-md flex items-center justify-center p-0.5 bg-settings-info-icons-bg"
                 
                >
                    {icon}
                </div>
            )}
            <div className="flex-1">
                {label && <p className="text-sm text-muted-foreground text-settings-info-label-text">{label}</p>}
                {isEditing ? (
                    <>
                        <div className="max-w-full sm:w-[456px]">
                            <Input
                                type={type}
                                {...field}
                                className="mt-1 h-8 font-medium w-full"
                            />
                        </div>
                        {meta.touched && meta.error ? (
                            <p className="text-xs text-red-500 mt-1">{meta.error}</p>
                        ) : null}
                    </>
                ) : (
                    <p className="text-md font-medium">{data}</p>
                )}
            </div>
        </div>
    )
}