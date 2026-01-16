const Modal = ({ children }) => {
    return (
        <div className="flex justify-center fixed inset-0 bg-neutral-700 bg-opacity-50 z-50">
            <div className="flex flex-col gap-2 mt-20 bg-neutral-0 w-full max-w-md 
                            h-fit max-h-[90vh] border rounded-lg p-4">
                {children}
            </div>
        </div>
    );
};

Modal.Header = ({ description }) => {
    return (
        <div className="mb-2">
            {description &&
                <h1 className="text-base md:text-lg text-neutral-900 font-bold">
                    {description}
                </h1>
            }
        </div>
    );
};

Modal.Body = ({ children }) => {
    return (
        <div className="text-sm md:text-base text-neutral-700 mb-2">
            {children}
        </div>
    );
};

Modal.Footer = ({ children }) => {
    return (
        <div className="flex justify-end mt-2">
            {children}
        </div>
    );
};

export default Modal;