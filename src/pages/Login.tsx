import type React from "react";
import Header from "../components/layouts/Header/Header";
import LoginForm from "../components/auth/Login/Login";
import Footer from "../components/layouts/Footer/Footer";
import { useTheme } from "../context/ThemeContext";

const Login: React.FC = () => {
    const { theme} = useTheme();
    return (
        <>
            <Header/>
            <LoginForm/>
            <Footer theme={theme}/>
        </>
    )
}

export default Login;