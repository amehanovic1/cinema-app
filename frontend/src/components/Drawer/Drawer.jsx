import Logo from "../Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Drawer = ({ onClose, title, children }) => {
    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity 
                           duration-300 opacity-100 pointer-events-auto">
            </div>

            <div className="fixed top-16 right-0 fixed z-50 
                            h-[calc(100vh-64px)] 
                            bg-neutral-800 
                            flex flex-col gap-6 
                            p-4 sm:p-6 md:p-8 lg:p-10
                            w-full sm:w-[80vw] md:w-[50vw] lg:w-[35vw]
                            transform transition-transform ease-in-out duration-300 translate-x-0">

                <div className="flex items-center justify-center gap-2">

                    <Logo />

                    <h1 className="font-bold text-xl sm:text-2xl">
                        <span className="text-neutral-25">Cine</span>
                        <span className="text-dark-red">bh.</span>
                    </h1>

                </div>

                <div className="relative flex items-center justify-center">
                    <button
                        onClick={onClose}
                        className="absolute left-0 justify-start bg-neutral-700 rounded-lg p-2">
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-400"
                        />
                    </button>

                    <h1 className="flex justify-center text-neutral-300 font-bold text-xl sm:text-2xl">
                        {title}
                    </h1>
                </div>

                {children}

            </div>
        </>
    );
}

export default Drawer;