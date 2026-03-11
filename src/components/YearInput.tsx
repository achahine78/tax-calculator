type Props = {
    value: number;
    onChange: (num: number) => void;
};

export const YearInput = ({ value = 0, onChange, ...props }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d.-]/g, "");
        const numeric = parseFloat(raw);

        if (!isNaN(numeric)) {
            onChange?.(numeric);
        } else {
            onChange?.(0);
        }
    };

    return <input {...props} value={value} onChange={handleChange} />;
};
