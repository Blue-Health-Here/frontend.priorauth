import React from "react"

interface Props {
    children: React.ReactNode
    className?: string
}

export default function SettingsCard({ children, className = "" }: Props) {
    return (
        <div className={`bg-card rounded-lg border p-6 ${className}`}>
            {children}
        </div>
    )
}
