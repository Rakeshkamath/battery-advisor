import { useState, useEffect } from "react";
import type { IBatteryFormState, IBatteryInput } from "../../models/battery";
import styles from "./BatteryForm.module.scss";
import Button from "../ui/Button/Button";
import BatteryAnalysisLoading from "../ui/Loading/BatteryAnalysisLoading";
import MuiSelect from "../ui/Dropdown/Dropdown";

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
            onSubmit(data);
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

    if (isAnalyzing) {
        return <BatteryAnalysisLoading />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.batteryInputRow}>
                    <h2 className={styles.title}>Battery Input</h2>
                    <div className={styles.batterySelect}>
                        <MuiSelect
                            label="Select Battery"
                            value={data.id}
                            options={list.map(b => ({
                                label: b.id,
                                value: b.id,
                            }))}
                            onChange={(batteryId) => {
                                const selected = list.find(b => b.id === batteryId);
                                if (selected) setData(selected);
                            }}
                        />
                    </div>
                </div>

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
                        <MuiSelect
                            label="Chemistry"
                            value={data.chemistry}
                            options={[
                                { label: "NMC", value: "NMC" },
                                { label: "LFP", value: "LFP" },
                                { label: "NCA", value: "NCA" },
                            ]}
                            onChange={(value) =>
                                setData(prev => ({
                                    ...prev,
                                    chemistry: value,
                                }))
                            }
                        />
                    </div>
                </div>

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
