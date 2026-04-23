import BatteryForm from "../components/BatteryForm/BatteryForm";
import { useNavigate } from "react-router-dom";
import { useBatteryAdvisor } from "../hooks/useBatteryAdvisor";
import type { IBatteryInput } from "../models/battery";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";

export default function InputPage() {
    const navigate = useNavigate();
    const { evaluate } = useBatteryAdvisor();

    const handleSubmit = (data: IBatteryInput) => {
        const result = evaluate(data);
        navigate("/result", { state: { data, result } });
    };

    const [darkMode, setDarkMode] = useState(true);


    useEffect(() => {
        document.body.classList.remove("theme-dark", "theme-light");
        document.body.classList.add(darkMode ? "theme-dark" : "theme-light");
    }, [darkMode]);


    return (<>

        <div className={darkMode ? "theme-dark" : "theme-light"}>
            <Navbar
                isDark={darkMode}
                onThemeToggle={() => setDarkMode(prev => !prev)}
            />

            <main>
                <BatteryForm onSubmit={handleSubmit} />
            </main>
        </div>

    </>);
}