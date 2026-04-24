import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import "../styles/global.scss";

export default function AppLayout() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        document.body.classList.remove("theme-dark", "theme-light");
        document.body.classList.add(darkMode ? "theme-dark" : "theme-light");
    }, [darkMode]);

    return (
        <>
            <Navbar
                isDark={darkMode}
                onThemeToggle={() => setDarkMode(prev => !prev)}
            />
            <main className="pageContent">
                <Outlet />
            </main>
        </>
    );
}