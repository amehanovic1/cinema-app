import PricingCards from "../../components/PricingCards/PricingCards";
import { seatsData } from "../../data/seatsData";

const Tickets = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center text-center max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 gap-2 sm:gap-3 md:gap-4 lg:gap-6">

                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-neutral-800">Pricing</h1>

                <p className="font-normal text-sm sm:text-base md:text-lg lg:text-xl text-neutral-800 leading-realxed sm:leading-6 md:leading-7 lg:leading-8">
                    Welcome to our cinema ticket pricing options! We offer three tiers to suit everyone's preferences. Explore our pricing options below and treat yourself to a cinematic adventure like never before!
                </p>

            </div>

            <div className="m-4 sm:m-6 md:m-8 lg:m-10">
                <PricingCards seats={seatsData} />
            </div>

        </>
    );
}

export default Tickets;