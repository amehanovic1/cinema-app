import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <ScrollToTop />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;