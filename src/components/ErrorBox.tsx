import type { APIError } from "../api/taxBracket";
import "./ErrorBox.css";

type Props = {
    error: APIError;
};

export const ErrorBox = ({ error }: Props) => {
    return (
        <div className="error-box" aria-label="error-box">
            {error.message || "Something went wrong!"}
        </div>
    );
};
