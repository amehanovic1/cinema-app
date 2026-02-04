import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { ROUTES } from "../../routes/routes";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import AuthDrawer from "../../pages/AuthDrawer/AuthDrawer";

const Header = () => {
    const { user, logout, isLoading, isAdmin } = useContext(AuthContext)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [authDrawerOpen, setAuthDrawerOpen] = useState(false)
    const navigate = useNavigate()

    const userMenuItems = [];

    if (isAdmin) {
        userMenuItems.push({
            id: "admin-panel",
            label: "Admin",
            onClick: () => {
                navigate(ROUTES.ADMIN_PANEL);
                setUserMenuOpen(false);
            }
        });
    }

    userMenuItems.push({ id: "logout", label: "Logout", onClick: logout });

    useEffect(() => {
        setUserMenuOpen(false);
    }, [user]);

    return (
        <header
            data-testid="header-main-container"
            className="w-full h-16 bg-neutral-800 border-b border-neutral-500 
                    grid grid-cols-3 items-center sticky top-0 z-50 px-6 md:px-14 py-4 md:py-5">

            <div className="flex items-center" data-testid="header-logo-section">
                <NavLink
                    to={ROUTES.HOME}
                    className="flex items-center gap-2"
                    data-testid="header-logo-home-link"
                >

                    <Logo />

                    <h1 className="font-urbanist font-bold text-2xl" data-testid="header-app-name">
                        <span className="text-neutral-25">Cine</span>
                        <span className="text-dark-red">bh.</span>
                    </h1>

                </NavLink>
            </div>

            <div className="flex justify-center gap-4
                            text-semibold shadow-text text-xs sm:text-sm md:text-base">
                <NavLink
                    to={ROUTES.CURRENTLY_SHOWING}
                    data-testid="header-nav-link-currently-showing"
                    className={({ isActive }) =>
                        isActive ? "text-neutral-0 underline" : "text-neutral-200"}>
                    Currently Showing
                </NavLink>

                <NavLink
                    to={ROUTES.UPCOMING_MOVIES}
                    data-testid="header-nav-link-upcoming-movies"
                    className={({ isActive }) =>
                        isActive ? "text-neutral-0 underline" : "text-neutral-200"}>
                    Upcoming Movies
                </NavLink>
            </div>

            <div className="flex justify-end items-center" data-testid="header-auth-section">
                {isLoading ? null : user ?
                    (
                        <div className="relative" data-testid="header-user-menu-container">
                            <button
                                onClick={() => setUserMenuOpen(prev => !prev)}
                                data-testid="header-user-dropdown-trigger"
                                className="flex items-center gap-1 text-neutral-0 
                                        text-semibold shadow-text text-xs sm:text-sm md:text-base 
                                        px-2 py-1 border rounded-lg rounded-neutral-0"
                            >
                                <span data-testid="header-user-name-display">
                                    {user.firstName && user.lastName
                                        ? `${user.firstName} ${user.lastName}`
                                        : user.email.split("@")[0]
                                    }
                                </span>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={`transition-transform
                                    ${userMenuOpen ? "rotate-180 text-dark-red" : "text-neutral-400"}`}
                                />
                            </button>

                            <div className={`absolute right-0 w-48 mt-1 z-50 mt-0 bg-neutral-0 overflow-y-auto transition-all duration-300 rounded-2xl shadow-card  
                                            ${userMenuOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
                                <ul
                                    data-testid="header-user-dropdown-list">
                                    {userMenuItems?.map((item, index) => (
                                        <li
                                            key={index}
                                            data-testid={`header-user-menu-item-${item.id}`}
                                            onClick={item.onClick}
                                            className={`px-4 py-3 cursor-pointer text-xs md:text-sm lg:text-base hover:bg-neutral-50 
                                                    ${item.id === "logout" ? "text-dark-red" : "text-neutral-700"}`}>
                                            {item.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    ) : (
                        <button
                            onClick={() => {
                                setAuthDrawerOpen(true);
                                setUserMenuOpen(false)
                            }}
                            data-testid="sign-in-button"
                            className="text-neutral-0 text-semibold shadow-text text-xs sm:text-sm md:text-base 
                                px-2 py-1 border rounded-lg rounded-neutral-0"
                        >
                            Sign In
                        </button>
                    )
                }
            </div>

            {authDrawerOpen &&
                <div data-testid="auth-drawer-wrapper">
                    <AuthDrawer onClose={() => setAuthDrawerOpen(false)} />
                </div>
            }

        </header>
    );
}

export default Header;