import "./Button.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
};

export const Button = ({ children, disabled, loading, ...props }: Props) => {
    return (
        <button {...props} className="button" disabled={disabled || loading}>
            {children}
        </button>
    );
};
