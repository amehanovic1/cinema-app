import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

const AdminPanel = () => {
    return (
        <div className="flex min-h-screen" data-testid="admin-panel-container">
            <aside
                className="w-64 bg-neutral-900 text-neutral-25 p-6 flex flex-col shrink-0"
                data-testid="admin-panel-sidebar">
                <h2
                    className="font-bold mb-10 text-xl md:text-2xl"
                    data-testid="admin-panel-title">
                    Admin
                </h2>

                <hr className="mb-4 border-neutral-400" />

                <nav data-testid="admin-panel-nav">
                    <NavLink
                        to={ROUTES.ADMIN_PANEL_MOVIES}
                        data-testid="admin-panel-nav-link-movies"
                        className={({ isActive }) =>
                            `flex items-center gap-2 text-sm md:text-base 
                            ${isActive ? 'text-neutral-25 underline' : 'text-neutral-300 hover:text-neutral-25'}`}
                    >
                        <FontAwesomeIcon icon={faFilm} />
                        <span>Movies</span>
                    </NavLink>
                </nav>

            </aside>

            <main className="flex-1 p-6" data-testid="admin-panel-main-content">
                <Outlet />
            </main>
        </div>
    );
}


export default AdminPanel;