import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SuccessIcon from "./SuccessIcon";

const SuccessView = ({ paragraph, icon, onClose, navigateTo = null}) => {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) onClose();
            navigate("/");
        }, 2500);
        return () => clearTimeout(timer);
    }, [onClose, navigate, navigateTo]);

    return (
        <div className="flex flex-col items-center justify-center">
            {paragraph && <p className="text-base md:text-lg text-neutral-300">{paragraph}</p>}

            <div className="mt-12">
                <SuccessIcon icon={icon} />
            </div>

            {navigateTo && <button
                onClick={() => navigate(navigateTo)}
                className="mt-4 py-2 text-base font-semibold w-full rounded-lg bg-dark-red text-neutral-25">
                Sign In
            </button>
            }
        </div>
    );
}

export default SuccessView;