export type Outcome = "DISPOSE" | "REMANUFACTURE" | "REPURPOSE" | "RECYCLE";


export interface IBatteryInput {
    id: string;
    chemistry: "NMC" | "LFP" | "NCA";
    soh: number;
    age: number;
    cycles: number;
    physicalDamage: boolean;
    deepDischarge: boolean;
    recycled: number;
}

export type IBatteryFormState = {
    id: string;
    chemistry: "" | "NMC" | "LFP" | "NCA";
    soh: number | "";
    age: number | "";
    cycles: number | "";
    physicalDamage: boolean;
    deepDischarge: boolean;
    recycled: number | "";
};



export interface IBatteryFormInput {
    id: string;
    chemistry: "NMC" | "LFP" | "NCA";
    soh: number | "";
    age: number | "";
    cycles: number | "";
    physicalDamage: boolean;
    deepDischarge: boolean;
    recycled: number;
}


export interface IBatteryResult {
    outcome: Outcome;
    score: number;
    reason: string;
}