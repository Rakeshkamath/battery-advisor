import { useLocation, useNavigate } from "react-router-dom";
import ScoreGauge from "../../components/ScoreGauge/ScoreGauge";
import styles from "./Result.module.scss";

export default function ResultPage() {
    const { state } = useLocation() as any;
    const navigate = useNavigate();

    if (!state) return <h2>No data available</h2>;

    const { result } = state;

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <h2 className={styles.verdict}>
                    {result.outcome}
                </h2>
                <ScoreGauge score={result.score} />

                <p className={styles.reasoning}>
                    {result.reason}
                </p>

                <p className={styles.note}>
                    ✅ EU recycled content requirements met
                </p>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.secondary}
                        onClick={() => navigate("/")}
                    >
                        Re‑assess
                    </button>

                    <button
                        className={styles.primary}
                        onClick={() => navigate("/print", { state })}
                    >
                        Print
                    </button>
                </div>
            </div>
        </div>
    );
}