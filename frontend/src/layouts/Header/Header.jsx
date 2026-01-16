import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { ROUTES } from "../../routes/routes";
import { useContext, useEffect, useState } from "react";
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

    const [authDrawerOpen, setAuthDrawerOpen] = useState(false)

    useEffect(() => {
        setUserMenuOpen(false);
    }, [user]);

    return (
        <header className="w-full h-16 bg-neutral-800 border-b border-neutral-500 
                        grid grid-cols-3 items-center sticky top-0 z-50 px-6 md:px-14 py-4 md:py-5">

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
                                onClick={() => setUserMenuOpen(prev => !prev)}
                                className="flex items-center gap-1 text-neutral-0 
                                        text-semibold shadow-text text-xs sm:text-sm md:text-base 
                                        px-2 py-1 border rounded-lg rounded-neutral-0"
                            >
                                {user.firstName && user.lastName
                                    ? `${user.firstName} ${user.lastName}`
                                    : user.email.split("@")[0]
                                }
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={`transition-transform
                                    ${userMenuOpen ? "rotate-180 text-dark-red" : "text-neutral-400"}`}
                                />
                            </button>


                            <ul className={`absolute left-0 right-0 z-40 mt-0 w-full bg-neutral-0 mt-1 
                                            overflow-y-auto transition-all duration-300 rounded  
                                             ${userMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                                {userMenuItems?.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={item.onClick}
                                        className="py-2 px-3 text-neutral-700 bg-neutral-200 
                                                text-xs md:text-sm lg:text-base 
                                                hover:bg-neutral-600 hover:text-white">
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    ) : (
                        <button
                            onClick={() => {
                                setAuthDrawerOpen(true);
                                setUserMenuOpen(false)
                            }}
                            className="text-neutral-0 text-semibold shadow-text text-xs sm:text-sm md:text-base 
                                px-2 py-1 border rounded-lg rounded-neutral-0"
                        >
                            Sign In
                        </button>
                    )
                }
            </div>

            {authDrawerOpen &&
                <AuthDrawer onClose={() => setAuthDrawerOpen(false)} />
            }

        </header>
    );
}

export default Header;