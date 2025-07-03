import ThemeButton from "@/components/common/ThemeButton";
import { User } from "@/utils/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageHeader = () => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    let user: User | null = null;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                try {
                    if (storedUser) {
                        user = JSON.parse(storedUser);
                    }
                } catch (error) {
                    console.error("Failed to parse user from localStorage", error);
                }

                navigate(user?.roleCode === "pharmacyUser" ? '/pharmacy/requests' : '/admin/requests');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]);

    return (
        <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
            <h2 className="text-lg font-bold text-gray-800 inline-flex gap-2 items-center">
                <img onClick={() => navigate("/pharmacy/requests")} src='/header-left-logo-arrow.svg'
                    alt='header left logo arrow' className={`w-8 h-8 bg-gray-100 p-2 rounded-lg cursor-pointer`} />
                <span>UBRELVY 50MG TAB</span>
            </h2>
            <div className="flex gap-3 self-end sm:self-auto flex-wrap">
                <ThemeButton className="h-full min-h-12" variant="secondary">Open Portal</ThemeButton>
                <ThemeButton className="h-full min-h-12" variant="primary">Submit Progress Notes</ThemeButton>
            </div>
        </div>
    )
};

export default PageHeader;