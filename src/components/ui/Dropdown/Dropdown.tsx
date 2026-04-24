import * as React from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
} from "@mui/material";
import "./Dropdown.scss";

export interface IMuiSelectOption<T extends string | number = string | number> {
    label: string;
    value: T;
}

interface MuiSelectProps<T extends string | number = string | number> {
    label: string;
    value: T | "";
    options: IMuiSelectOption<T>[];
    onChange: (value: T | "") => void;
    fullWidth?: boolean;
    minWidth?: number;
}

export default function MuiSelect<T extends string | number = string | number>({
    label,
    value,
    options,
    onChange,
    fullWidth = true,
    minWidth = 120,
}: MuiSelectProps<T>) {
    const handleChange = (event: SelectChangeEvent<T>) => {
        onChange(event.target.value as T);
    };

    return (
        <Box className="muiSelectRoot" sx={{ minWidth }}>
            <FormControl fullWidth={fullWidth} size="medium">
                < InputLabel > {label}</InputLabel >
                <Select value={value} label={label} onChange={handleChange}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {options.map(option => (
                        <MenuItem key={String(option.value)} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl >
        </Box >
    );
}