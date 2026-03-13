type Props = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
> & {
    value: number;
    onChange: (num: number) => void;
    label?: string;
};

export const NumericalInput = ({
    value = 0,
    onChange,
    label,
    ...props
}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d.-]/g, "");
        const numeric = parseFloat(raw);

        if (!isNaN(numeric)) {
            onChange?.(numeric);
        } else {
            onChange?.(0);
        }
    };

    return (
        <div>
            {label ? <div>{label}</div> : null}
            <input
                {...props}
                value={value}
                className="numerical-input"
                onChange={handleChange}
            />
        </div>
    );
};
