import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const Header = () => {
    return (
        <header className="w-full bg-neutral-800 border-b border-neutral-500 flex items-center sticky top-0 z-50 px-6 md:px-14 py-4 md:py-5">
            <Link to="/" className="flex items-center gap-2">

                <Logo />

                <h1 className="font-urbanist font-bold text-xl md:text-2xl lg:text-3xl">
                    <span className="text-neutral-25">Cine</span>
                    <span className="text-dark-red">bh.</span>
                </h1>

            </Link>
        </header>
    );
}

export default Header;