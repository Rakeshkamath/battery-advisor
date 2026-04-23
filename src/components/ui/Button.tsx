import type { JSX } from 'react'
import './ui.scss'


interface ButtonProps {
    label: string
    variant?: 'primary' | 'secondary'
    onClick?: () => void
    fullWidth?: boolean
    bgColor?: string
    type?: "button" | "submit" | "reset"
    disabled?: boolean
}


const Button = ({
    label,
    variant = 'primary',
    onClick,
    fullWidth = false,
    bgColor,
    type = "button",
    disabled = false,
}: ButtonProps): JSX.Element => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''}`}
            onClick={onClick}
            style={
                bgColor
                    ? ({ "--btn-bg": bgColor } as React.CSSProperties)
                    : undefined
            }
        >
            {label}
        </button>
    )
}

export default Button