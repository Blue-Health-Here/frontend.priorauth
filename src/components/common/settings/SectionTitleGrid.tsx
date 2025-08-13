import React from "react"

interface SectionProps {
    title: string
    children: React.ReactNode
    columns?: number
}

export default function SectionTitleGrid({ title, children, columns = 2 }: SectionProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-base font-semibold text-primary-black">{title}</h3>
            <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
                {children}
            </div>
        </div>
    )
}
