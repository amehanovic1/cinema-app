import PricingCards from "../../components/PricingCards/PricingCards";
import { seatsData } from "../../data/seatsData";

const Tickets = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center text-center max-w-[632px] mx-auto p-4 gap-2">
                <h1 className="heading-h4">Pricing</h1>
                <p className="font-normal text-[16px] text-neutral-800">
                    Welcome to our cinema ticket pricing options! We offer three tiers to suit everyone's preferences. Explore our pricing options below and treat yourself to a cinematic adventure like never before!
                </p>
            </div>

            <PricingCards seats={seatsData}/>
        </>
    );
}

export default Tickets;