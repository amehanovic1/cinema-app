const BookingLayoutSkeleton = () => {
    return (
        <div className="animate-pulse w-full">
            <div className="flex justify-between m-4 md:m-8">
                <div className="h-8 w-48 bg-neutral-200 rounded"></div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-20 bg-neutral-200 rounded"></div>
                    <div className="h-10 w-16 bg-neutral-200 rounded"></div>
                </div>
            </div>

            <div className="w-full h-1 bg-neutral-100">
                <div className="bg-neutral-200 w-1/2 h-full"></div>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="h-64 bg-neutral-100 rounded-xl"></div>
                        <div className="h-12 bg-neutral-100 rounded-lg"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-10 w-1/2 bg-neutral-100 rounded"></div>
                        <div className="h-32 bg-neutral-100 rounded-lg"></div>
                        <div className="h-12 bg-neutral-200 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingLayoutSkeleton;