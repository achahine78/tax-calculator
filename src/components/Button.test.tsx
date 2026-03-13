import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
    describe("rendering", () => {
        it("renders children correctly", () => {
            render(<Button>Click me</Button>);
            expect(screen.getByText("Click me")).toBeInTheDocument();
        });
    });

    describe("disabled", () => {
        it("is not disabled by default", () => {
            render(<Button>Click me</Button>);
            expect(screen.getByRole("button")).not.toBeDisabled();
        });

        it("is disabled when disabled prop is true", () => {
            render(<Button disabled>Click me</Button>);
            expect(screen.getByRole("button")).toBeDisabled();
        });

        it("does not fire onClick when disabled", () => {
            const handleClick = vi.fn();
            render(
                <Button disabled onClick={handleClick}>
                    Click me
                </Button>,
            );
            fireEvent.click(screen.getByRole("button"));
            expect(handleClick).not.toHaveBeenCalled();
        });
    });

    describe("loading", () => {
        it("shows spinner and hides children when loading", () => {
            render(<Button loading>Click me</Button>);
            expect(screen.queryByText("Click me")).not.toBeInTheDocument();
            expect(
                document.querySelector(".button-spinner"),
            ).toBeInTheDocument();
        });

        it("is disabled when loading", () => {
            render(<Button loading>Click me</Button>);
            expect(screen.getByRole("button")).toBeDisabled();
        });

        it("does not fire onClick when loading", () => {
            const handleClick = vi.fn();
            render(
                <Button loading onClick={handleClick}>
                    Click me
                </Button>,
            );
            fireEvent.click(screen.getByRole("button"));
            expect(handleClick).not.toHaveBeenCalled();
        });

        it("shows children and no spinner when not loading", () => {
            render(<Button>Click me</Button>);
            expect(screen.getByText("Click me")).toBeInTheDocument();
            expect(
                document.querySelector(".button-spinner"),
            ).not.toBeInTheDocument();
        });
    });
});
