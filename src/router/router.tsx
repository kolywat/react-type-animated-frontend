import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path = '/' element = {<Main/>}/>
            <Route path = '/registration' element = {<Registration/>} />
            <Route path = '/login' element = {<Login/>} />
        </Routes>
    )
}

export default AppRouter;
