import { useMutation } from "@tanstack/react-query";
import {
    fetchTaxBracket,
    type TaxBracketError,
    type TaxBracketResponse,
} from "../api/taxBracket";

export const useFetchTaxBracket = () => {
    const mutation = useMutation<TaxBracketResponse, TaxBracketError, number>({
        mutationFn: fetchTaxBracket,
        retry: 2,
        retryDelay: (attempt) => attempt * 1000, // linear backoff
    });

    return mutation;
};
