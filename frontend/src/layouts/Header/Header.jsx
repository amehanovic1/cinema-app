import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { ROUTES } from "../../routes/routes";

const Header = () => {
    return (
        <header className="w-full bg-neutral-800 border-b border-neutral-500 grid grid-cols-3 items-center sticky top-0 z-50 px-6 md:px-14 py-4 md:py-5">

            <div className="flex items-center ">
                <NavLink
                    to={ROUTES.HOME}
                    className="flex items-center gap-2">

                    <Logo />

                    <h1 className="font-urbanist font-bold text-2xl">
                        <span className="text-neutral-25">Cine</span>
                        <span className="text-dark-red">bh.</span>
                    </h1>

                </NavLink>
            </div>

            <div className="flex justify-center gap-4
                            text-semibold shadow-text text-xs sm:text-sm md:text-base">
                <NavLink
                    to={ROUTES.CURRENTLY_SHOWING}
                    className={({ isActive }) =>
                        isActive ? "text-neutral-0 underline" : "text-neutral-200"}>
                    Currently Showing
                </NavLink>

                <NavLink
                    to={ROUTES.UPCOMING_MOVIES}
                    className={({ isActive }) =>
                        isActive ? "text-neutral-0 underline" : "text-neutral-200"}>
                    Upcoming Movies
                </NavLink>
            </div>

            <div className="flex items-center"></div>

        </header>
    );
}

export default Header;