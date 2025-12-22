import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { ROUTES } from "../../routes/routes";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import AuthDrawer from "../../pages/AuthDrawer/AuthDrawer";

const Header = () => {
    const { user, logout, isLoading } = useContext(AuthContext)

    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const userMenuItems = [
        { label: "Logout", onClick: logout }
    ]

    const [isDrawerOpen, setDrawerOpen] = useState(false)

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
                {isLoading ? null : user ?
                    (
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-1 text-neutral-0 text-semibold shadow-text text-xs sm:text-sm md:text-base 
                                        px-2 py-1 border rounded-lg rounded-neutral-0"
                            >
                                {user.firstName && user.lastName
                                    ? `${user.firstName} ${user.lastName}`
                                    : user.email.split("@")[0]
                                }
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={`transition-transform
                                    ${userMenuOpen ? "rotate-180 text-dark-red" : "text-neutral-400 "}`}
                                />
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-1 w-24 bg-neutral-200 rounded-md shadow-lg z-40">
                                    {userMenuItems.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={item.onClick}
                                            className="w-full px-1 py-1 text-right text-neutral-700 text-sm md:text-base
                                                        hover:bg-neutral-400 hover:text-neutral-0 hover:rounded-md">
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                    ) : (
                        <button
                            onClick={() => setDrawerOpen(true)}
                            className="text-neutral-0 text-semibold shadow-text text-xs sm:text-sm md:text-base 
                                px-2 py-1 border rounded-lg rounded-neutral-0"
                        >
                            Sign In
                        </button>
                    )
                }
            </div>

            <AuthDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />

        </header>
    );
}

export default Header;