import { AppBar, Toolbar, Typography } from "@mui/material";
import styles from "./Navbar.module.scss"

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { useNavigate } from "react-router-dom";


type NavbarProps = {
    isDark?: boolean;
    onThemeToggle?: () => void;
};

export default function Navbar({
    isDark = true,
    onThemeToggle,
}: NavbarProps) {
    const navigate = useNavigate();
    return (
        <AppBar position="fixed" elevation={0} className={styles.navbar}>
            <Toolbar className={styles.inner}>
                <Typography className={styles.title}
                    onClick={() => navigate("/")}
                    role="button"
                    tabIndex={0}
                >
                    Battery End‑of‑Life Advisor
                </Typography>
                <button
                    className={`${styles.themeToggle} ${isDark ? styles.dark : styles.light
                        }`}
                    onClick={onThemeToggle}
                    aria-label="Toggle theme"
                    aria-pressed={isDark}
                >
                    <LightModeIcon className={`${styles.icon} ${styles.sun}`} aria-hidden />
                    <DarkModeIcon className={`${styles.icon} ${styles.moon}`} aria-hidden />
                </button>


            </Toolbar>
        </AppBar>
    );
}