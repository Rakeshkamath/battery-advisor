// import { useLocation, useNavigate } from "react-router-dom";
// import ResultCard from "../components/ResultCard/ResultCard";
// import ScoreGauge from "../components/ScoreGauge/ScoreGauge";
// import styles from "./Result.module.scss";

// export default function ResultPage() {
//     const { state } = useLocation() as any;
//     const navigate = useNavigate();

//     if (!state) {
//         return <h2>No data available</h2>;
//     }

//     const { data, result } = state;

//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className={styles.container}>
//             <div className={styles.inner}>
//                 {/* ✅ Header */}
//                 <h2 className={styles.heading}>
//                     Battery End‑of‑Life Assessment Report
//                 </h2>

//                 <p className={styles.subHeading}>
//                     Generated on {new Date().toLocaleString()}
//                 </p>

//                 {/* ✅ INPUT DATA (THIS IS WHAT YOU ASKED FOR) */}
//                 <section className={styles.section}>
//                     <h3>Battery Input Details</h3>

//                     <div className={styles.table}>
//                         <div><strong>ID</strong></div><div>{data.id}</div>
//                         <div><strong>Chemistry</strong></div><div>{data.chemistry}</div>
//                         <div><strong>SoH (%)</strong></div><div>{data.soh}</div>
//                         <div><strong>Age</strong></div><div>{data.age}</div>
//                         <div><strong>Cycles</strong></div><div>{data.cycles}</div>
//                         <div><strong>Recycled (%)</strong></div><div>{data.recycled}</div>
//                         <div><strong>Physical Damage</strong></div><div>{data.physicalDamage ? "Yes" : "No"}</div>
//                         <div><strong>Deep Discharge</strong></div><div>{data.deepDischarge ? "Yes" : "No"}</div>
//                     </div>
//                 </section>

//                 {/* ✅ RESULT */}
//                 <section className={styles.section}>
//                     <h3>Evaluation Result</h3>
//                     <ResultCard result={result} />
//                     <ScoreGauge score={result.score} />
//                 </section>

//                 <p className={styles.note}>
//                     ✅ EU recycled content requirements met
//                 </p>

//                 {/* ✅ Buttons (hidden in print) */}
//                 <div className={styles.buttonGroup}>
//                     <button
//                         className={styles.secondary}
//                         onClick={() => navigate("/")}
//                     >
//                         Re‑assess
//                     </button>

//                     <button
//                         className={styles.primary}
//                         onClick={handlePrint}
//                     >
//                         Print / Download PDF
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }



import { useLocation, useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard/ResultCard";
import ScoreGauge from "../components/ScoreGauge/ScoreGauge";
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