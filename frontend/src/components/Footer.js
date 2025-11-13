import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = ()  => {
    return (
        <footer className="h-[212px] max-w-full bg-gradient-to-r from-dark-grey from-opacity-50 to-red-dark text-neutral-0 flex flex-col items-center justify-center gap-5">
            
            <div className="flex items-center justify-center gap-1">
                <Logo />
                <h1 className="font-bold text-[24px]">Cinebh.</h1>
            </div>

            <div className="font-bold text-[12px] flex items-center gap-2">
                <Link
                    to="/about-us"
                    className="hover:underline"
                >
                    ABOUT US
                </Link>
                <span>|</span>
                <Link
                    to="/tickets"
                    className="hover:underline"
                >
                    TICKETS
                </Link>
            </div>
            <p className="font-normal font-[14px]">
                Copyright @Cinebh. Built with love in Sarajevo. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;