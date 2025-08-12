import React from "react"

interface Props {
    children: React.ReactNode
    className?: string
}

export default function SettingsCard({ children, className = "" }: Props) {
    return (
        <div className={`bg-card rounded-xl border border-border-color p-4 ${className}`}>
            {children}
        </div>
    )
}
