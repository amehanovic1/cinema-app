import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoDataFound = ({ icon, title, text, actionText }) => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-neutral-0 
                        rounded-3xl border-neutarl-200 shadow-input
                        p-4 sm:p-6 md:p-8 lg:p-10">

            <div className="max-w-xl flex flex-col gap-4 items-center justify-center 
                            text-xs sm:text-sm md:text-base lg:text-lg p-6">

                {icon && (
                    <FontAwesomeIcon
                        icon={icon}
                        className="w-5 h-5 sm:w-10 sm:h-10 md:w-15 md:h-15 text-neutral-600"
                    />
                )}

                {title && (
                    <h1 className="font-semibold text-neutral-800"> {title} </h1>
                )}

                {text && (
                    <p className="font-normal text-neutral-600 text-center"> {text} </p>
                )}

                {actionText && (
                    <h1 className="font-semibold text-dark-red underline"> {actionText} </h1>
                )}

            </div>

        </div>
    );


}

export default NoDataFound;