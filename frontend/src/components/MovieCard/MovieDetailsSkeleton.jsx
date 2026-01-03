const MovieDetailsSkeleton = ({ size = 3 }) => {
    const skeletons = Array.from({ length: size });

    return (
        <>
            {skeletons.map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col mb-6 bg-neutral-100 border border-neutral-200
                               rounded-3xl shadow-card animate-pulse">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 px-4">

                        <div className="md:col-span-3 flex aspect-square overflow-hidden rounded-xl bg-neutral-200" />

                        <div className="md:col-span-4 flex flex-col justify-between">
                            <div>
                                <div className="h-6 w-3/4 bg-neutral-200 rounded mb-2" />
                                <div className="flex gap-2 mb-2">
                                    <div className="h-4 w-12 bg-neutral-200 rounded" />
                                    <div className="h-4 w-12 bg-neutral-200 rounded" />
                                    <div className="h-4 w-12 bg-neutral-200 rounded" />
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    <div className="h-6 w-16 bg-neutral-200 rounded" />
                                    <div className="h-6 w-16 bg-neutral-200 rounded" />
                                    <div className="h-6 w-16 bg-neutral-200 rounded" />
                                </div>
                            </div>
                            <div className="h-4 w-2/3 bg-neutral-200 rounded mt-4" />
                        </div>

                        <div className="md:col-span-5 flex flex-col">
                            <div className="h-6 w-1/4 bg-neutral-200 rounded mb-2" />
                            <div className="flex gap-2 flex-wrap">
                                <div className="h-8 w-20 bg-neutral-200 rounded" />
                                <div className="h-8 w-20 bg-neutral-200 rounded" />
                                <div className="h-8 w-20 bg-neutral-200 rounded" />
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </>
    );
}

export default MovieDetailsSkeleton;
