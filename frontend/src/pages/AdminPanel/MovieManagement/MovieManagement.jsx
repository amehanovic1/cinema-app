import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { archiveDraft, getMovieDrafts, publish } from "../../../services/movieDraftService";
import { archiveMovies, getArchivedMovies, getCurrentlyShowingMovies, getUpcomingMovies, moveToDrafts } from "../../../services/movieService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { getAllVenues } from "../../../services/venueService";
import MovieTable from "../MovieTable/MovieTable";
import Modal from "../../../components/Modal/Modal";

const MovieManagement = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "drafts";

    const [showPublishWarning, setShowPublishWarning] = useState(false);
    const [totalVenues, setTotalVenues] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);
    const [movieData, setMovieData] = useState({ content: [], number: 0, totalPages: 0, totalElements: 0, size: 0, hasNext: false, hasPrevious: false })

    const [currentPage, setCurrentPage] = useState(0);
    const [displayItems, setDisplayItems] = useState(10);
    const [loading, setLoading] = useState(false);

    const [tabCounts, setTabCounts] = useState({ drafts: 0, currently: 0, upcoming: 0, archived: 0 })
    const tabs = [
        { id: "drafts", label: "Drafts", count: tabCounts.drafts },
        { id: "currently", label: "Currently Showing", count: tabCounts.currently },
        { id: "upcoming", label: "Upcoming", count: tabCounts.upcoming },
        { id: "archived", label: "Archived", count: tabCounts.archived }
    ];

    const refreshTabCounts = async () => {
        try {
            const [draftsRes, currentlyRes, upcomingRes, archivedRes] = await Promise.all([
                getMovieDrafts({ page: 0, size: 1 }),
                getCurrentlyShowingMovies({ page: 0, size: 1 }),
                getUpcomingMovies({ page: 0, size: 1 }),
                getArchivedMovies({ page: 0, size: 1 })
            ]);

            setTabCounts({
                drafts: draftsRes.totalElements,
                currently: currentlyRes.totalElements,
                upcoming: upcomingRes.totalElements,
                archived: archivedRes.totalElements
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const params = { page: currentPage, size: displayItems };
            let response;

            switch (activeTab) {
                case "drafts": response = await getMovieDrafts(params); break;
                case "currently": response = await getCurrentlyShowingMovies(params); break;
                case "upcoming": response = await getUpcomingMovies(params); break;
                case "archived": response = await getArchivedMovies(params); break;
                default: return;
            }

            setMovieData(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchVenuesCount = async () => {
            try {
                const response = await getAllVenues({ page: 0, size: 1 });
                setTotalVenues(response.totalElements);
            } catch (error) {
                console.log(error);
            }
        };

        fetchVenuesCount();
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [activeTab, currentPage, displayItems]);

    useEffect(() => {
        setCurrentPage(0);
        setSelectedIds([]);
        setMovieData(prev => ({ ...prev, content: [] }));
        refreshTabCounts();
    }, [activeTab])

    const onRefresh = () => {
        setCurrentPage(0);
        fetchMovies();
        refreshTabCounts();
    };

    const handleAction = async (actionType, ids = selectedIds) => {
        if (!ids || ids.length === 0) return;

        setLoading(true);
        try {
            if (actionType === "publish") {
                const publishableIds = movieData.content
                    .filter(m => ids.includes(m.id) && m.step === "venues")
                    .map(m => m.id);

                if (publishableIds.length === ids.length) await publish(publishableIds);
                else setShowPublishWarning(true);
            }
            else if (actionType === "archive") {
                if (activeTab === "drafts") await archiveDraft(ids);
                else await archiveMovies(ids)
            }
            else if (actionType === "move-to-drafts") {
                await moveToDrafts(ids);
            }

            setSelectedIds([]);
            onRefresh();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col">
            <h1 className="text-neutral-800 font-bold text-lg md:text-xl mb-6">
                Movies
            </h1>

            <div className="flex items-center gap-4 border-b border-neutral-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSearchParams({ tab: tab.id })}
                        className={`relative text-sm md:text-base
                            ${activeTab === tab.id ? "text-dark-red font-semibold" : "text-neutral-800 font-regular"}`}
                    >
                        <span>{tab.label}</span>

                        {tab.count !== null && (
                            <span>({tab.count})</span>
                        )}

                        {activeTab === tab.id &&
                            <div className="absolute left-0 right-0 h-[1px] bg-dark-red" />
                        }
                    </button>
                ))}
            </div>

            <div className={`flex items-center justify-end p-4 rounded-lg mb-4 transition-all ${selectedIds.length > 0 ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className="flex gap-2">
                    {(activeTab === "drafts" || activeTab === "upcoming") && (
                        <button
                            onClick={() => handleAction("archive")}
                            className="px-4 py-2 bg-neutral-0 text-error-500 border border-error-500 rounded-md font-semibold text-xs md:text-sm underline">
                            Archive
                        </button>
                    )}
                    {activeTab === "drafts" && (
                        <button
                            onClick={() => handleAction("publish")}
                            className="px-4 py-2 bg-neutral-0 text-success-600 border border-success-600 rounded-md font-semibold text-xs md:text-sm">
                            Publish </button>
                    )}
                    {(activeTab === "upcoming" || activeTab === "archived") && (
                        <button
                            onClick={() => handleAction("move-to-drafts")}
                            className="px-4 py-2 bg-neutral-0 text-success-600 border border-success-600 rounded-md font-semibold text-xs md:text-sm">
                            Move to Drafts
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <MovieTable
                    movies={movieData.content}
                    loading={loading}
                    activeTab={activeTab}
                    onRefresh={onRefresh}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    totalVenues={totalVenues}
                    onAction={handleAction}
                />
            </div>

            {!loading && movieData.totalPages > 0 && (
                <div
                    className="flex items-center justify-between mt-2 mb-16 text-xs md:text-sm text-neutral-500 font-regular">
                    <div>
                        Showing <span className="font-semibold text-neutral-900">{movieData.number === movieData.totalPages - 1 ? movieData.totalElements : (movieData.number + 1) * movieData.size}
                        </span> out of  <span className="font-semibold text-neutral-900"> {movieData.totalElements}
                        </span> items
                    </div>


                    <div className="flex items-center">
                        <button
                            disabled={!movieData.hasPrevious}
                            onClick={() => setCurrentPage(0)}
                            className={`px-2 ${!movieData.hasPrevious ? "text-neutral-300" : "text-neutral-900"}`}
                        >
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        </button>
                        <button
                            disabled={!movieData.hasPrevious}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            <FontAwesomeIcon
                                icon={faAngleLeft}
                                className={`${movieData.hasPrevious} ? "text-neutral-900" : "text-neutral-300"`} />
                        </button>

                        <div className="flex items-center gap-2">
                            Page
                            <input
                                type="number"
                                value={currentPage + 1}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value) - 1;
                                    if (val >= 0 && val < movieData.totalPages) setCurrentPage(val);
                                }}
                                className="w-8 h-8 text-center rounded-lg border border-neutral-200 text-neutral-900"
                            />
                            out of <span className="font-semibold text-neutral-900">
                                {movieData.totalPages}
                            </span>

                        </div>

                        <button
                            disabled={!movieData.hasNext}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <button
                            disabled={!movieData.hasNext}
                            onClick={() => setCurrentPage(movieData.totalPages - 1)}
                            className={`px-2 ${!movieData.hasNext ? "text-neutral-300" : "text-neutral-900"}`}
                        >
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        Display
                        <select
                            value={displayItems}
                            onChange={(e) => {
                                setDisplayItems(parseInt(e.target.value));
                                setCurrentPage(0);
                            }}
                            className="w-10 h-8 text-center rounded-lg border border-neutral-200"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                        items per page.
                    </div>
                </div>
            )}

            {showPublishWarning && (
                <Modal>
                    <Modal.Header description={"Publish Failed"} />
                    <Modal.Body>
                        <p className="text-neutral-600">
                            Movies that are in progress cannot be published.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="px-4 py-2 bg-dark-red text-white rounded-md font-bold text-sm"
                            onClick={() => setShowPublishWarning(false)}
                        >
                            Okay
                        </button>
                    </Modal.Footer>
                </Modal>
            )}

        </div>
    );
}


export default MovieManagement;