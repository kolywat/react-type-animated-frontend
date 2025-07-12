import type React from "react";
import RegistrationForm from "../components/auth/Registration/Registration";
import Header from "../components/layouts/Header/Header";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/layouts/Footer/Footer";

const Registration: React.FC = () => {
    const { theme} = useTheme();
    return (
        <>
            <Header/>
            <RegistrationForm/>
            <Footer theme={theme}/>
        </>
    )
}

export default Registration;