import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SuccessIcon = ({ icon }) => {
    return (
        <div className="flex items-center justify-center" data-testid="success-icon-container">
            <div className="relative p-2">
                <div className="bg-neutral-700 rounded-full flex items-center justify-center
                            h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24">
                    <FontAwesomeIcon
                        icon={icon}
                        data-testid="success-font-awesome-icon"
                        className="text-neutral-400
                            w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10"
                    />
                </div>

                <div className="absolute -top-2 left-1/2 bg-neutral-400 rounded-full h-2 w-2 md:h-3 md:w-3"></div>
                <div className="absolute top-1/2 -right-2 bg-neutral-600 rounded-full h-2 w-2 md:h-3 md:w-3"></div>
                <div className="absolute -bottom-2 left-1/2 bg-neutral-600 rounded-full h-2 w-2 md:h-3 md:w-3"></div>
                <div className="absolute top-1/2 -left-2 bg-neutral-400 rounded-full h-2 w-2 md:h-3 md:w-3"></div>

                <div className="absolute -top-1/4 right-1/4 bg-neutral-600 rounded-full h-1 w-1 md:h-2 md:w-2"></div>
                <div className="absolute top-1/4 -left-1/4 bg-neutral-600 rounded-full h-1 w-1 md:h-2 md:w-2"></div>
                <div className="absolute bottom-1/4 -right-1/4 bg-neutral-600 rounded-full h-1 md:h-2 md:w-2"></div>
                <div className="absolute bottom-1/4 -left-1/4  bg-neutral-600 rounded-full h-1 md:h-2 md:w-2"></div>

                <div className="absolute top-0 bg-neutral-400 rounded-full h-2 w-2 md:h-4 md:w-4"></div>
                <div className="absolute bottom-0 bg-neutral-600 rounded-full h-2 w-2 md:h-4 md:w-4"></div>
                <div className="absolute right-0 bg-neutral-400 rounded-full h-2 w-2 md:h-4 md:w-4"></div>
                <div className="absolute top-0 right-2 bg-neutral-600 rounded-full h-2 w-2 md:h-4 md:w-4"></div>
            </div>
        </div>
    );
}

export default SuccessIcon;