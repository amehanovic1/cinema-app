import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { ROUTES } from "../../routes/routes";
import { useContext, useState } from "react";
import DrawerContext from "../../context/DrawerContext";
import SignInForm from "../../pages/SignInForm/SignInForm";
import AuthContext from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { openDrawer } = useContext(DrawerContext)
    const { user, logout } = useContext(AuthContext)

    return (
        <header className="w-full h-16 bg-neutral-800 border-b border-neutral-500 grid grid-cols-3 items-center sticky top-0 z-50 px-6 md:px-14 py-4 md:py-5">

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

            <div className="flex justify-end items-center">
                {user ?
                    (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-1 text-neutral-0 text-semibold shadow-text text-xs sm:text-sm md:text-base 
                                px-2 py-1 border rounded-lg rounded-neutral-0"
                            >
                                {user.firstName + " " + user.lastName}
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={`transition-transform
                                    ${dropdownOpen ? "rotate-180 text-dark-red" : "text-neutral-400 "}`}
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-1 w-40 bg-neutral-200 border border-neutral-500 rounded-md shadow-lg z-40">
                                    <button
                                        className="w-full hover:bg-neutral-400" onClick={logout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                    ) : (
                        <button
                            onClick={() => openDrawer("Welcome Back", <SignInForm />)}
                            className="text-neutral-0 text-semibold shadow-text text-xs sm:text-sm md:text-base 
                                px-2 py-1 border rounded-lg rounded-neutral-0"
                        >
                            Sign In
                        </button>
                    )
                }
            </div>

        </header>
    );
}

export default Header;