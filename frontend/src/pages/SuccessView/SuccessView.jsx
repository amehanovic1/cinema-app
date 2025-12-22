import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SuccessIcon from "../../components/SuccessIcon/SuccessIcon";

const SuccessView = ({ text, icon, onClose, navigateTo = null, navigateToText, autoClose = false }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!autoClose) return;

        const timer = setTimeout(() => {
            onClose();
            navigate("/");
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose, navigate, navigateTo, autoClose]);

    return (
        <div className="flex flex-col items-center justify-center gap-16">
            {text &&
                <p className="font-normal text-center text-xs md:text-sm text-neutral-300 w-1/2">
                    {text}
                </p>
            }

            <div>
                <SuccessIcon icon={icon} />
            </div>

            {navigateTo && <button
                onClick={() => navigate(navigateTo)}
                className="py-2 text-base font-semibold w-full rounded-lg bg-dark-red text-neutral-25">
                {navigateToText}
            </button>
            }
        </div>
    );
}

export default SuccessView;