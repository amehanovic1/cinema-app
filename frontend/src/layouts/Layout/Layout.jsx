import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import Drawer from "../../components/Drawer/Drawer";
import SignUpForm from "../../pages/SignUpForm/SignUpForm";
import SignInForm from "../../pages/SignInForm/SignInForm";
import VerificationCodeForm from "../../pages/VerificationCodeForm/VerificationCodeForm";

const Layout = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState("signup");

    const openDrawer = (contentType) => {
        setDrawerContent(contentType);
        setIsDrawerOpen(true);
    };

    const renderDrawerContent = () => {
        switch (drawerContent) {
            case "signup":
                return <SignUpForm openDrawer={openDrawer} />;
            case "signin":
                return <SignInForm openDrawer={openDrawer} />;
            case "verify":
                return <VerificationCodeForm openDrawer={openDrawer} />;
            default:
                return null;
        }
    };

    const getDrawerTitle = () => {
        switch (drawerContent) {
            case "signup":
                return "Hello";
            case "signin":
                return "Welcome Back";
            case "verify":
                return "Account Activation";
            default:
                return "";
        }
    };

    return (
        <>
            <Header openDrawer={openDrawer} />
            <ScrollToTop />
            <main>{children}</main>
            <Footer />

            <Drawer
                title={getDrawerTitle()}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                children={renderDrawerContent()}
            />
        </>
    );
}

export default Layout;