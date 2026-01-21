const PaymentDetailsSkeleton = () => {
    return (
        <div
            className="m-4 md:m-8 flex flex-col md:flex-row gap-8 animate-pulse"
            data-testid="payment-details-skeleton"
        >

            <div className="flex-1 space-y-6">
                <div className="h-8 w-1/3 bg-neutral-200 rounded"></div>
                <div className="h-48 bg-neutral-100 rounded-xl w-full"></div>
                <div className="h-12 bg-neutral-200 rounded-lg w-full mt-4"></div>
            </div>

            <div className="flex-1 max-w-md space-y-6">
                <div className="h-8 w-1/3 bg-neutral-200 rounded"></div>
                <div className="h-[400px] bg-neutral-800 rounded-2xl w-full"></div>
            </div>

        </div>
    );
};

export default PaymentDetailsSkeleton;