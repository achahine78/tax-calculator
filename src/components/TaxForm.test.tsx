import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TaxForm } from "./TaxForm";
import * as useFetchTaxBracketModule from "../hooks/useFetchTaxBracket";
import type { UseMutationResult } from "@tanstack/react-query";
import type { TaxBracketError, TaxBracketResponse } from "../api/taxBracket";

const mockMutate = vi.fn();

const mockMutation = {
    data: undefined,
    error: null,
    isPending: true,
    mutate: vi.fn(),
} as unknown as UseMutationResult<TaxBracketResponse, TaxBracketError, number>;

const mockHook = (overrides = {}) => ({ ...mockMutation, ...overrides });

vi.mock("../hooks/useFetchTaxBracket", () => ({
    useFetchTaxBracket: vi.fn(),
}));

beforeEach(() => {
    vi.mocked(useFetchTaxBracketModule.useFetchTaxBracket).mockReturnValue(
        mockHook(),
    );
    mockMutate.mockClear();
});

describe("TaxForm", () => {
    describe("rendering", () => {
        it("renders the annual income input", () => {
            render(<TaxForm />);
            expect(screen.getByText("Annual Income ($)")).toBeInTheDocument();
        });

        it("renders the tax year input", () => {
            render(<TaxForm />);
            expect(screen.getByText("Tax Year")).toBeInTheDocument();
        });

        it("renders the submit button", () => {
            render(<TaxForm />);
            expect(screen.getByRole("button")).toHaveAttribute(
                "type",
                "submit",
            );
        });

        it("does not render the tax table initially", () => {
            render(<TaxForm />);
            expect(screen.queryByText("Tax Bracket")).not.toBeInTheDocument();
        });

        it("does not render errors initially", () => {
            render(<TaxForm />);
            expect(
                screen.queryAllByRole("div", { name: "error-box" }).length,
            ).toBe(0);
        });
    });

    describe("form submission", () => {
        it("calls mutate with the entered tax year on submit", () => {
            render(<TaxForm />);
            fireEvent.change(screen.getAllByRole("textbox")[1], {
                target: { value: "2022" },
            });
            fireEvent.submit(screen.getByRole("form", { name: "tax-form" }));
            expect(mockMutation.mutate).toHaveBeenCalledWith(2022);
        });

        it("shows the button in loading state while pending", () => {
            vi.mocked(
                useFetchTaxBracketModule.useFetchTaxBracket,
            ).mockReturnValue(mockHook({ isPending: true }));
            render(<TaxForm />);
            expect(screen.getByRole("button")).toBeDisabled();
        });
    });

    describe("success state", () => {
        const mockData = {
            tax_brackets: [
                {
                    max: 50197,
                    min: 0,
                    rate: 0.15,
                },
                {
                    max: 100392,
                    min: 50197,
                    rate: 0.205,
                },
                {
                    max: 155625,
                    min: 100392,
                    rate: 0.26,
                },
                {
                    max: 221708,
                    min: 155625,
                    rate: 0.29,
                },
                {
                    min: 221708,
                    rate: 0.33,
                },
            ],
        };

        beforeEach(() => {
            vi.mocked(
                useFetchTaxBracketModule.useFetchTaxBracket,
            ).mockReturnValue(mockHook({ data: mockData }));
        });

        it("renders the tax table when brackets are returned", () => {
            render(<TaxForm />);
            expect(screen.getByText("Tax Bracket")).toBeInTheDocument();
        });

        it("displays calculated tax values based on annual income", async () => {
            render(<TaxForm />);
            fireEvent.change(screen.getAllByRole("textbox")[0], {
                target: { value: "100000" },
            });
            await waitFor(() => {
                expect(screen.getByText("Gross Income")).toBeInTheDocument();
                expect(screen.getByText("$100,000.00")).toBeInTheDocument();
            });
        });
    });

    describe("error state", () => {
        it("renders an ErrorBox for each error returned", () => {
            vi.mocked(
                useFetchTaxBracketModule.useFetchTaxBracket,
            ).mockReturnValue(
                mockHook({
                    error: {
                        errors: [
                            { message: "Database not found!" },
                            { message: "That url was not found" },
                        ],
                    },
                }),
            );
            render(<TaxForm />);
            expect(screen.getByText("Database not found!")).toBeInTheDocument();
            expect(
                screen.getByText("That url was not found"),
            ).toBeInTheDocument();
        });

        it("does not render the tax table when there is an error", () => {
            vi.mocked(
                useFetchTaxBracketModule.useFetchTaxBracket,
            ).mockReturnValue(
                mockHook({
                    error: { errors: [{ message: "Database not found!" }] },
                }),
            );
            render(<TaxForm />);
            expect(screen.queryByText("Tax Bracket")).not.toBeInTheDocument();
        });
    });
});
