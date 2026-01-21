export const VenueButtonListSkeleton = ({ size = 10 }) => (
    <div className="flex overflow-x-auto items-center justify-center bg-neutral-25 py-2 no-scrollbar" data-testid="venue-button-list-skeleton">

        <div className="flex items-center gap-4 p-2 min-w-max animate-pulse">
            {[...Array(size)].map((_, i) => (
                <div
                    key={i}
                    className="h-10 w-28 bg-neutral-200 rounded-lg"
                />
            ))}
        </div>

    </div>
);
