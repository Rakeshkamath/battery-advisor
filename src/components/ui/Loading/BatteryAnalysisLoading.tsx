import styles from "./BatteryAnalysisLoading.module.scss";

export default function BatteryAnalysisLoading() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.battery}>
                    <div className={styles.level}></div>
                </div>

                <div className={styles.text}>
                    <h2>Analyzing Battery Health</h2>
                    <p>Calculating end‑of‑life impact…</p>
                </div>

                <div className={styles.calculation}>
                    <span>SoH</span>
                    <span>→</span>
                    <span>Cycles</span>
                    <span>→</span>
                    <span>EoL Score</span>
                </div>
            </div>
        </div>
    );
}
``