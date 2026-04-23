import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PrintPage.module.scss";

type PrintState = {
    data: {
        id: string;
        chemistry: string;
        soh: number;
        age: number;
        cycles: number;
        recycled: number;
        physicalDamage: boolean;
        deepDischarge: boolean;
    };
    result: {
        outcome: string;
        score: number;
        reason: string;
    };
};

export default function PrintPage() {
    const { state } = useLocation() as { state: PrintState | null };
    const navigate = useNavigate();
    const hasPrinted = useRef(false);

    // Guard against refresh / direct access
    if (!state || !state.data || !state.result) {
        return (
            <div className={styles.printContainer}>
                <h2>Report data not available</h2>
                <button onClick={() => navigate("/")}>Go back</button>
            </div>
        );
    }

    const { data, result } = state;

    useEffect(() => {
        if (!hasPrinted.current) {
            hasPrinted.current = true;
            setTimeout(() => window.print(), 300);
        }
    }, []);

    return (
        <div className={styles.printContainer}>
            <div className={styles.header}>
                <h1>Battery End‑of‑Life Assessment Report</h1>
                <p className={styles.timestamp}>
                    Generated on {new Date().toLocaleString()}
                </p>
            </div>

            <section className={styles.section}>
                <div className={styles.sectionTitle}>Battery Input Details</div>
                <div className={styles.dataTable}>
                    <div className={styles.label}>Battery ID</div>
                    <div className={styles.value}>{data.id}</div>

                    <div className={styles.label}>Chemistry</div>
                    <div className={styles.value}>{data.chemistry}</div>

                    <div className={styles.label}>State of Health (SoH)</div>
                    <div className={styles.value}>{data.soh}%</div>

                    <div className={styles.label}>Age</div>
                    <div className={styles.value}>{data.age}</div>

                    <div className={styles.label}>Cycles</div>
                    <div className={styles.value}>{data.cycles}</div>

                    <div className={styles.label}>Recycled Content</div>
                    <div className={styles.value}>{data.recycled}%</div>

                    <div className={styles.label}>Physical Damage</div>
                    <div className={styles.value}>
                        {data.physicalDamage ? "Yes" : "No"}
                    </div>

                    <div className={styles.label}>Deep Discharge Event</div>
                    <div className={styles.value}>
                        {data.deepDischarge ? "Yes" : "No"}
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionTitle}>Assessment Result</div>
                <div className={styles.verdict}>{result.outcome}</div>
                <div className={styles.score}>Score: {result.score}</div>
                <p className={styles.reasoning}>{result.reason}</p>
            </section>

            <div className={styles.footer}>
                Assessment conducted under EU Battery Regulation.
            </div>
        </div>
    );
}