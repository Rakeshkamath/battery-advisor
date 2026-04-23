import { useState } from "react";
import { advisorEngine } from "../engine/advisorEngine";
import type { IBatteryInput, IBatteryResult } from "../models/battery";

export function useBatteryAdvisor() {
    const [result, setResult] = useState<IBatteryResult | null>(null);

    const evaluate = (input: IBatteryInput) => {
        const res = advisorEngine(input);
        setResult(res);
        return res;
    };

    return { result, evaluate };
}