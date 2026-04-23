import type { IBatteryInput, IBatteryResult } from "../models/battery";

export function advisorEngine(input: IBatteryInput): IBatteryResult {
    let threshold = 2000;

    if (input.chemistry === "LFP") threshold += 500;
    if (input.chemistry === "NCA") threshold -= 200;

    if (input.physicalDamage || input.deepDischarge) {
        return {
            outcome: "DISPOSE",
            score: 0,
            reason: "Critical damage or deep discharge detected"
        };
    }

    let outcome: IBatteryResult["outcome"];
    let reason = "";

    if (input.soh >= 80 && input.cycles < threshold) {
        outcome = "REMANUFACTURE";
        reason = "High SoH and sofe lifecycle";
    } else if (input.soh >= 60 && input.cycles < threshold) {
        outcome = "REPURPOSE";
        reason = "Suitable for second life useage";
    } else if (input.soh >= 20) {
        outcome = "RECYCLE";
        reason = "Battery recyclable but not reusable";
    } else {
        outcome = "DISPOSE";
        reason = "Battery too degraded";
    }

    const cycleScore = Math.max(0, 100 - (input.cycles / threshold) * 100);
    const ageScore = Math.max(0, 100 - (input.age / 12) * 100);

    const chemistryBonus = input.chemistry === "LFP" ? 10 : input.chemistry === "NCA" ? 5 : 0;

    let score = input.soh * 0.5 + cycleScore * 0.3 + ageScore * 0.15 + chemistryBonus * 0.1;

    score = Math.max(0, Math.min(100, score));

    return { outcome, score: Math.round(score), reason }

}