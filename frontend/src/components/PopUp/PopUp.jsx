const PopUp = ({ showPopUp, title, text, buttonText, navigateTo }) => {
    if (!showPopUp) return null;

    return (
        <div className="flex justify-center fixed inset-0 bg-neutral-700 bg-opacity-50">
            <div className="flex flex-col gap-2 mt-20 bg-neutral-0 w-full max-w-md md:max-w-lg 
                            h-auto max-h-[40vh] border rounded-lg p-4 md:p-6">

                <h1 className="text-base md:text-lg text-neutral-900 font-bold"> {title} </h1>

                <p className="text-sm md:text-base text-neutral-500 font-regular"> {text} </p>

                <div className="flex justify-end">
                    <button 
                    className="px-2 py-1 border rounded-md border-dark-red text-dark-red font-bold text-xs md:text-sm" 
                    onClick={navigateTo}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopUp;