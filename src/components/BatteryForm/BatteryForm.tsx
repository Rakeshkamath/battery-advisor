import { useState, useEffect } from "react";
import type { IBatteryFormState, IBatteryInput } from "../../models/battery";
import styles from "./BatteryForm.module.scss";
import Button from "../ui/Button";
import BatteryAnalysisLoading from "../ui/Loading/BatteryAnalysisLoading";

type Props = {
    onSubmit: (data: IBatteryInput) => void;
};

export default function BatteryForm({ onSubmit }: Props) {
    const [data, setData] = useState<IBatteryFormState>({
        id: "",
        chemistry: "",
        soh: "",
        age: "",
        cycles: "",
        physicalDamage: false,
        deepDischarge: false,
        recycled: "",
    });

    const [list, setList] = useState<IBatteryInput[]>([]);
    const [sohError, setSohError] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        fetch("/batteries.json")
            .then(res => res.json())
            .then(setList);
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (e.target instanceof HTMLInputElement) {
            let newValue: any = value;

            if (e.target.type === "number") {
                newValue = value === "" ? "" : Number(value);

                if (name === "soh") {
                    if (newValue === "") {
                        setSohError("SoH is required");
                    } else if (Number.isNaN(newValue)) {
                        setSohError("SoH must be a number");
                    } else if (newValue > 100) {
                        setSohError("SoH should be 100 or below");
                    } else if (newValue < 0) {
                        setSohError("SoH cannot be negative");
                    } else {
                        setSohError("");
                    }
                }
            }

            if (e.target.type === "checkbox") {
                newValue = e.target.checked;
            }

            setData(prev => ({
                ...prev,
                [name]: newValue,
            }));
        } else {
            setData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = () => {
        if (!isValidBatteryInput(data)) return;

        setIsAnalyzing(true);

        setTimeout(() => {
            setIsAnalyzing(false);
            onSubmit(data); // Navigate to next screen
        }, 3000);
    };

    function isValidBatteryInput(
        data: IBatteryFormState
    ): data is IBatteryInput {
        return (
            data.id !== "" &&
            data.chemistry !== "" &&
            data.soh !== "" &&
            data.age !== "" &&
            data.cycles !== "" &&
            data.recycled !== "" &&
            data.physicalDamage !== null &&
            data.deepDischarge !== null
        );
    }

    const isFormValid =
        data.id !== "" &&
        data.chemistry !== "" &&
        data.soh !== "" &&
        data.soh >= 0 &&
        data.soh <= 100 &&
        data.age !== "" &&
        data.age >= 0 &&
        data.cycles !== "" &&
        data.cycles >= 0 &&
        data.recycled !== "" &&
        data.recycled >= 0 &&
        data.recycled <= 100 &&
        !sohError;

    /* -------------------------------- Loading screen -------------------------------- */
    if (isAnalyzing) {
        return <BatteryAnalysisLoading />;
    }

    /* -------------------------------- UI -------------------------------- */
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                {/* Header + Battery selector */}
                <div className={styles.batteryInputRow}>
                    <h2 className={styles.title}>Battery Input</h2>

                    <select
                        className={styles.select}
                        onChange={(e) => {
                            const selected = list.find(
                                b => b.id === e.target.value
                            );
                            if (selected) setData(selected);
                        }}
                    >
                        <option value="">Select Battery</option>
                        {list.map(b => (
                            <option key={b.id} value={b.id}>
                                {b.id}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Grid inputs */}
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <input
                            type="number"
                            name="soh"
                            placeholder="SoH (%)"
                            value={data.soh}
                            onChange={handleChange}
                            min={0}
                            max={100}
                        />
                        {sohError && (
                            <div className={styles.errorText}>{sohError}</div>
                        )}
                    </div>

                    <div className={styles.field}>
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={data.age}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.field}>
                        <input
                            type="number"
                            name="cycles"
                            placeholder="Cycles"
                            value={data.cycles}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.field}>
                        <input
                            type="number"
                            name="recycled"
                            placeholder="Recycled %"
                            value={data.recycled}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.field}>
                        <select
                            name="chemistry"
                            value={data.chemistry}
                            onChange={handleChange}
                        >
                            <option value="">Select chemistry</option>
                            <option value="NMC">NMC</option>
                            <option value="LFP">LFP</option>
                            <option value="NCA">NCA</option>
                        </select>
                    </div>
                </div>

                {/* Toggles */}
                <div className={styles.disposeSection}>
                    <div className={styles.toggleRow}>
                        <span>Physical damage</span>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                name="physicalDamage"
                                checked={data.physicalDamage}
                                onChange={handleChange}
                            />
                            <span className={styles.slider}></span>
                            <span className={styles.toggleText}>
                                {data.physicalDamage ? "Yes" : "No"}
                            </span>
                        </label>
                    </div>

                    <div className={styles.toggleRow}>
                        <span>Deep discharge event</span>
                        <label className={styles.toggle}>
                            <input
                                type="checkbox"
                                name="deepDischarge"
                                checked={data.deepDischarge}
                                onChange={handleChange}
                            />
                            <span className={styles.slider}></span>
                            <span className={styles.toggleText}>
                                {data.deepDischarge ? "Yes" : "No"}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Submit */}
                <div className={styles.button_container}>
                    <Button
                        label="Evaluate"
                        disabled={!isFormValid}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}
