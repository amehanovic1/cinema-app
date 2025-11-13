import Logo from "./Logo";

const Header = () => {
    return (
        <header
            className="w-full h-[80px] bg-neutral-800 border-b border-neutral-500 flex items-center px-[24px] pl-[92px] sticky top-0 z-50">
            <div className="flex items-center gap-[4px]">

                <Logo />

                <h1 className="font-urbanist font-bold text-[24px]">
                    <span className="text-neutral-25">Cine</span>
                    <span className="text-red-dark">bh.</span>
                </h1>
            </div>
        </header>
    );
}

export default Header;