import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { differenceInDays, format } from "date-fns";

const MovieTable = ({ movies, loading, activeTab, selectedIds, setSelectedIds, totalVenues, onAction }) => {
    const [showSessionInfo, setShowSessionInfo] = useState(false)
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openMenuId && menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenuId]);


    if (!loading && movies.length === 0) {
        return (
            <div
                className="text-neutral-400 text-center italic"
                data-testid="movie-table-no-movies-message"
            >
                No movies found in this category.
            </div>
        );
    }

    const getStatusBadge = (movie) => {
        const today = new Date();
        const badge = "px-2 py-1 rounded-lg text-xs md:text-sm font-regular";

        if (activeTab === "drafts") {
            const isVenuesStep = movie?.step === "venues";
            const stepText = isVenuesStep ? "Step 3/3" : `Step ${movie?.step === "general" ? '1/3' : '2/3'}`;
            return <span className={`${badge} ${isVenuesStep ? "bg-success-100 text-success-700" : "bg-warning-100 text-warning-700"}`}>{stepText}</span>;
        }
        if (activeTab === "currently") {
            const daysLeft = Math.max(0, differenceInDays(new Date(movie?.projectionEndDate), today));
            return <span className={`${badge} ${daysLeft > 7 ? "bg-success-100 text-success-700" : "bg-warning-100 text-warning-700"}`}>Ending in {daysLeft} days</span>;
        }
        if (activeTab === "upcoming") {
            const daysUntil = differenceInDays(new Date(movie?.projectionStartDate), today);
            return <span className={`${badge} ${daysUntil > 7 ? "bg-success-100 text-success-700" : "bg-warning-100 text-warning-700"}`}>Coming in {daysUntil} days</span>;
        }
        return <span className={`${badge} bg-error-100 text-error-700`}>Ended</span>;
    };

    return (
        <div className={`transition-opacity duration-300 ${loading ? "opacity-50" : "opacity-100"}`}>

            <div className="rounded-lg border border-neutral-200">
                <table className="w-full text-left bg-neutral-50 border-collapse table-fixed">
                    <thead>
                        <tr className="font-bold text-xs md:tex-sm text-neutral-500">
                            <th className="px-4 py-2 w-[25%] text-left">NAME</th>
                            <th className="px-4 py-2 w-[25%] text-left">PROJECTION DATE</th>
                            <th className="px-4 py-2 w-[20%] text-left">VENUE</th>
                            <th className="px-4 py-2 w-[20%] text-left">
                                <div className="flex items-center gap-2">
                                    <span>STATUS</span>
                                    {activeTab === "drafts" && (
                                        <div className="relative cursor-pointer"
                                            onMouseEnter={() => setShowSessionInfo(true)}
                                            onMouseLeave={() => setShowSessionInfo(false)}
                                            data-testid="movie-table-session-info"
                                        >
                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                                data-testid="movie-table-session-info-icon"
                                                className="text-neutral-400 hover:text-dark-red transition-colors"
                                            />
                                            {showSessionInfo && (
                                                <div
                                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-80 p-3 bg-neutral-800 text-center 
                                                            text-neutral-0 text-xs rounded-lg shadow-xl z-50"
                                                >
                                                    <p className="font-regular" data-testid="movie-session-info-text">
                                                        Status shows completion of multiple steps. In order to publish movie, all steps must be completed.
                                                    </p>

                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-lg border-x-transparent border-t-lg"></div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </th>
                            {activeTab !== "currently" && <th className="px-4 py-2 w-[10%] text-left">ACTION</th>}
                        </tr>
                    </thead>

                    <tbody className="bg-neutral-0 divide-y divide-neutral-200">
                        {movies.map((movie) => {
                            const isSelected = selectedIds.includes(movie.id);
                            const posterUrl = movie.images?.find(img => img.type === "poster")?.url;

                            return (
                                <tr key={movie.id} className="text-sm md:text-base text-neutral-900 hover:bg-neutral-50">
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            {activeTab !== "currently" && (
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => setSelectedIds(prev => isSelected ? prev.filter(id => id !== movie.id) : [...prev, movie.id])}
                                                    className="w-4 h-4 accent-dark-red cursor-pointer"
                                                />
                                            )}
                                            <div className="w-10 h-10 rounded-lg bg-neutral-200 overflow-hidden flex-shrink-0">
                                                {posterUrl && <img src={posterUrl} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <span className="truncate font-medium">{movie.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        {format(new Date(movie.projectionStartDate), 'd. MMM')} - {format(new Date(movie.projectionEndDate), 'd. MMM yyyy.')}
                                    </td>
                                    <td className="px-4 py-2 text-xs md:text-sm text-neutral-600">
                                        {movie.venues?.length === totalVenues ? "All Venues" : movie.venues?.slice(0, 2).join(", ") + (movie.venues?.length > 2 ? ` +${movie.venues.length - 2}` : "")}
                                    </td>
                                    <td className="px-4 py-2">{getStatusBadge(movie)}</td>
                                    {activeTab !== "currently" && (
                                        <td className="px-4 py-2 relative">
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === movie.id ? null : movie.id)}
                                                className="w-8 h-8 hover:bg-neutral-100 rounded-full"
                                            >...</button>

                                            {openMenuId === movie.id && (
                                                <div ref={menuRef} className="absolute right-4 top-10 z-50 bg-white shadow-xl border border-neutral-100 rounded-md py-1 w-40">
                                                    {activeTab === "drafts" && (
                                                        <button onClick={() => { onAction("publish", [movie.id]); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm">Publish</button>
                                                    )}
                                                    {(activeTab === "upcoming" || activeTab === "archived") && (
                                                        <button onClick={() => { onAction("move-to-drafts", [movie.id]); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm">Move to Drafts</button>
                                                    )}
                                                    {activeTab !== "archived" && (
                                                        <button onClick={() => { onAction("archive", [movie.id]); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 hover:bg-neutral-100 text-sm text-error-600">Archive</button>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default MovieTable;