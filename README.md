# Tax Calculator

## Project Overview

A single-page tax calculator built with React and TypeScript. Users enter their annual income and tax year, and the app fetches the corresponding tax brackets from a local API, then calculates and displays their total tax owed, effective rate, and a per-bracket breakdown.

**Stack:** React 19, TypeScript, Vite, TanStack Query, Vitest + Testing Library
## Getting Started

```bash
# prerequisites, install, run
docker pull ptsdocker16/interview-test-server
docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server
npm install
npm run dev
# requires the tax bracket API running on localhost:5001 via
```

## Running Tests

```bash
npm test
```