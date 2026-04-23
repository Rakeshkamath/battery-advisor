import { useEffect, useState } from "react";
import styles from "./ScoreGauge.module.scss"

type Props = {
    score: number;
}

export default function ScoreGauge({ score }: Props) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            i++;
            if (i >= score) clearInterval(interval);
            setValue(i);
        }, 10);

        return () => clearInterval(interval);
    }, [score]);

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.score}> {value} </div>
                <p className={styles.label}> Second Life Score</p>
            </div>
        </div>
    );
}