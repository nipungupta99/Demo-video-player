import { Routes, Route, Navigate } from "react-router-dom";
import VideoPlayerScreen from "./pages/VideoPlayerScreen";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";

export default function App() {
    const login = localStorage.getItem('isLogin');

    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={ login == "true" ?  <Navigate replace to="/videos" />: <LoginPage/>} />
                <Route path="/videos" element={login === "true" ? <Homepage /> : <Navigate replace to="/" />} />
                <Route path="/player" element={login === "true" ? <VideoPlayerScreen /> : <Navigate replace to="/" />} />
            </Routes>
            <Footer/>
        </div>
    );
}
