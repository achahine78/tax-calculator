import { TaxForm } from "./components/TaxForm";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TaxForm />
        </QueryClientProvider>
    );
}

export default App;
