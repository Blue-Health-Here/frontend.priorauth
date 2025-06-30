import ThemeButton from "@/components/common/ThemeButton"
import { FiEdit } from "react-icons/fi"

interface Props {
    name: string
    isEditing: boolean
    onEdit: () => void
}

export default function ProfileCardHeader({ name, isEditing, onEdit }: Props) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">{name.charAt(0)}</span>
                    </div>
                    {isEditing && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <FiEdit className="w-3 h-3 text-primary-foreground" />
                        </div>
                    )}
                </div>
                <div>
                    {!isEditing && <h2 className="text-xl font-semibold">{name}</h2>}
                    <p className="text-sm text-muted-foreground">Medical Organization</p>
                </div>
            </div>
            {!isEditing && (
                <ThemeButton onClick={onEdit} variant="outline" className="gap-2">
                    <FiEdit className="w-4 h-4" />
                    Edit Details
                </ThemeButton>
            )}
        </div>
    )
}
