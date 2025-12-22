import { useEffect, useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import SuccessView from "../SuccessView/SuccessView";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import VerificationCodeForm from "../VerificationCodeForm/VerificationCodeForm";

const AuthDrawer = ({ isOpen, onClose }) => {
    const viewsMap = {
        signIn: { component: SignInForm, title: "Welcome back" },
        signUp: { component: SignUpForm, title: "Hello" },
        verify: { component: VerificationCodeForm, title: "Activate Account" },
        signInSuccess: {
            component: SuccessView, title: "Sign In Successful!",
            props: {
                text: "Please, wait. You will be directed to the homepage.",
                icon: faVideoCamera,
                autoClose: true
            }
        },
        signUpSuccess: {
            component: SuccessView, title: "You're all set!",
            props: {
                text: "Start exploring latest movies, venues, and ticket options!",
                icon: faFilm,
                navigateTo: "/currently-showing",
                navigateToText: "See movies"
            }
        },
    }

    const [view, setView] = useState("signIn")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (onClose) {
            setView("signIn");
            setEmail("")
        }
    }, [isOpen])

    const Component = viewsMap[view].component;

    return (
        <Drawer title={viewsMap[view].title} isOpen={isOpen} onClose={onClose}>
            {Component && <Component
                setView={setView}
                email={email}
                setEmail={setEmail}
                onClose={onClose}
                {...viewsMap[view].props}
            />}
        </Drawer>
    );
}

export default AuthDrawer;