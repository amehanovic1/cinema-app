import Pagination from "../Pagination/Pagination";

const ContentSection = ({ title, items, getAll, renderItem }) => {
    return (
        <div className="bg-neutral-25 px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 ly:py-5">

            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-800 mb-2 sm:mb-3 md:mb-4 lg:mb-5">
                {title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3 lg:gap-3">
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
            </div>

            {items?.content?.length > 0 && (
                <div className="w-full flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-10">
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