import type { IBatteryResult } from "../../models/battery";
import styles from "./ResultCard.module.scss";

type Props = {
    result: IBatteryResult;
}

export default function ResultCard({ result }: Props) {
    return (
        <div className={styles.card}>
            <h1>{result.outcome}</h1>
            <p>{result.reason}</p>
        </div>
    )
}