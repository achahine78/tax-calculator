import { TaxForm } from "./components/TaxForm";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <h1>Tax Calculator</h1>
            <TaxForm />
        </QueryClientProvider>
    );
}

export default App;
