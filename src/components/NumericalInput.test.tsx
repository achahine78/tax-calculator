import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NumericalInput } from "./NumericalInput";

describe("NumericalInput", () => {
    describe("rendering", () => {
        it("renders an input element", () => {
            render(<NumericalInput value={0} onChange={vi.fn()} />);
            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });

        it("displays the given value", () => {
            render(<NumericalInput value={42} onChange={vi.fn()} />);
            expect(screen.getByRole("textbox")).toHaveValue("42");
        });

        it("renders label when provided", () => {
            render(
                <NumericalInput
                    value={0}
                    onChange={vi.fn()}
                    label="Annual Income"
                />,
            );
            expect(screen.getByText("Annual Income")).toBeInTheDocument();
        });

        it("does not render label when omitted", () => {
            render(<NumericalInput value={0} onChange={vi.fn()} />);
            expect(screen.queryByText("Annual Income")).not.toBeInTheDocument();
        });
    });

    describe("onChange", () => {
        it("calls onChange with parsed number for a valid integer", () => {
            const handleChange = vi.fn();
            render(<NumericalInput value={0} onChange={handleChange} />);
            fireEvent.change(screen.getByRole("textbox"), {
                target: { value: "123" },
            });
            expect(handleChange).toHaveBeenCalledWith(123);
        });

        it("calls onChange with parsed number for a valid decimal", () => {
            const handleChange = vi.fn();
            render(<NumericalInput value={0} onChange={handleChange} />);
            fireEvent.change(screen.getByRole("textbox"), {
                target: { value: "3.14" },
            });
            expect(handleChange).toHaveBeenCalledWith(3.14);
        });

        it("strips non-numeric characters before parsing", () => {
            const handleChange = vi.fn();
            render(<NumericalInput value={0} onChange={handleChange} />);
            fireEvent.change(screen.getByRole("textbox"), {
                target: { value: "$1,000" },
            });
            expect(handleChange).toHaveBeenCalledWith(1000);
        });

        it("calls onChange with 0 for non-numeric input", () => {
            const handleChange = vi.fn();
            render(<NumericalInput value={0} onChange={handleChange} />);
            fireEvent.change(screen.getByRole("textbox"), {
                target: { value: "abc" },
            });
            expect(handleChange).toHaveBeenCalledWith(0);
        });
    });

    describe("html attributes", () => {
        it("forwards extra props to the input element", () => {
            render(
                <NumericalInput
                    value={0}
                    onChange={vi.fn()}
                    data-testid="my-input"
                />,
            );
            expect(screen.getByTestId("my-input")).toBeInTheDocument();
        });
    });
});
