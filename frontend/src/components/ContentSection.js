import Pagination from "./Pagination";

function ContentSection({ title, items, getAll, renderItem }) {
    return (
        <div className="bg-neutral-25 px-[92px] py-[40px] space-y-[24px]">
            
            <h1 className="font-bold text-[32px] text-neutral-800">{title}</h1>

            <div className="flex flex-cols-4 justify-start items-center gap-[10px]">
                {
                    items?.content?.length > 0 &&
                    items.content.map(item => <div key={item.id}>{renderItem(item)}</div>)
                }
            </div>

            {items?.content?.length > 0 && (
                <div className="w-full">
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