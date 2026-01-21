import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { ROUTES } from "../../routes/routes";

const Footer = () => {
    return (
        <footer
            data-testid="app-footer"
            className="bg-gradient-to-r from-dark-gray from-opacity-50 to-dark-red flex flex-col 
                        items-center justify-center gap-4 p-6 md:p-8 lg:p-10">

            <div className="flex flex-row items-center justify-center gap-1 lg:gap-2" data-testid="footer-logo">
                <Logo />
                <h1 className="font-bold text-2xl text-neutral-0">Cinebh.</h1>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 font-bold text-sm text-neutral-25">
                <NavLink
                    to={ROUTES.ABOUT_US}
                    className="hover:underline"
                    data-testid="footer-link-about-us"
                >
                    ABOUT US
                </NavLink>
                <span className="text-neutral-0">|</span>
                <NavLink
                    to={ROUTES.TICKETS}
                    className="hover:underline"
                    data-testid="footer-link-tickets"
                >
                    TICKETS
                </NavLink>
            </div>

            <p className="font-normal text-base text-light-rose" data-testid="footer-copyright">
                Copyright @Cinebh. Built with love in Sarajevo. All rights reserved.
            </p>

        </footer>
    );
}

export default Footer;