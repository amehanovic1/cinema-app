import { createContext, useState } from "react";
import Drawer from "../components/Drawer/Drawer";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState(null)

    const openDrawer = (title, content) => {
        setTitle(title);
        setContent(content);
        setIsOpen(true);
    }

    const closeDrawer = () => {
        setIsOpen(false);
    }

    return (
        <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
            {children}
            <Drawer title={title}>{content}</Drawer>
        </DrawerContext.Provider>
    );
}

export default DrawerContext;