import { TaxForm } from "./components/TaxForm";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="app-container">
                <div className="form-container">
                    <h1>Tax Calculator</h1>
                    <TaxForm />
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default App;
