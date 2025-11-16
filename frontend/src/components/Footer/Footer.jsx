import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-dark-gray from-opacity-50 to-dark-red flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12">

            <div className="flex flex-row items-center justify-center gap-1 lg:gap-2">
                <Logo />
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-0">Cinebh.</h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 font-bold text-xs sm:text-base md:text-lg lg:text-xl text-neutral-25">
                <Link
                    to="/about-us"
                    className="hover:underline"
                >
                    ABOUT US
                </Link>
                <span className="text-neutral-0">|</span>
                <Link
                    to="/tickets"
                    className="hover:underline"
                >
                    TICKETS
                </Link>
            </div>
            <p className="font-normal font-[10px] sm:text-xs md:text-sm lg:text-base text-light-rose mt-1 sm:mt-2 md:mt-3 lg:mt-4">
                Copyright @Cinebh. Built with love in Sarajevo. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;