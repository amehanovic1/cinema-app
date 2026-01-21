import { NavLink } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

const ContentSection = ({ title, linkTo = null, items, getAll, renderItem }) => {
    const content = items?.content || [];
    const size = items?.size || 0;
    const emptySlots = size > content.length ? size - content.length : 0;

    return (
        <div data-testid = "content-section">

            <div className="flex items-center justify-between">
                <h1
                    className="font-bold text-base sm:text-xl md:text-2xl lg:text-3xl text-neutral-800 mb-2 sm:mb-3 md:mb-4 lg:mb-5"
                    data-testid="content-section-title"
                >
                    {title}
                </h1>

                {linkTo && (
                    <NavLink
                        to={linkTo}
                        className="font-semibold text-dark-red text-xs sm:text-sm md:text-base lg:text-lg"
                        data-testid="content-section-see-all"
                    >
                        See all
                    </NavLink>
                )}

            </div>


            <div className="grid gap-4 justify-center grid-cols-[repeat(auto-fit,minmax(8rem,1fr))]" data-testid="content-section-grid">  
                {
                items?.content?.length > 0 &&
                items.content.map(item =>
                    <div key={item.id}
                        className="bg-neutral-0 border border-neutral-200 rounded-2xl shadow-card flex justify-center p-2"
                    >
                        {renderItem(item)}
                    </div>
                )
            }
                {[...Array(emptySlots)].map((_, i) => (
                    <div key={`Empty Slots ${i}`} className="invisible" aria-hidden="true" />
                ))}
            </div>

            {items?.content?.length > 0 && (
                <div className="w-full flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-10" data-testid="content-section-pagination">
                    <Pagination
                        number={items.number}
                        totalElements={items.totalElements}
                        size={items.size}
                        hasNext={items.hasNext}
                        hasPrevious={items.hasPrevious}
                        onPageChange={getAll}
                    />
                </div>
            )}

        </div>
    );
}

export default ContentSection;