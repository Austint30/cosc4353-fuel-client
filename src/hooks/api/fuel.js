import { config } from 'config/firebase';
import useStatefulFetch from "hooks/stateful-fetch";
import { getHeaders } from "util/headers";
import { ApiMutationResponse, ApiQueryResponse } from './model';

export function useSubmitFuelQuote(){

    const result = useStatefulFetch(
        config.functionsUrl + "/fuel/quote/create",
        {
          method: "post",
          headers: getHeaders(),
        }
    );

    return ApiMutationResponse(
        (formData) => result.executeRequest({
            body: JSON.stringify(formData),
            headers: getHeaders()
        }),
        {
            data: result.data,
            loading: result.loading,
            error: result.error,
            called: result.called,
            resp: result.resp
        })
}

export function useCalcFuelQuote(){
    const result = useStatefulFetch(
        config.functionsUrl + "/fuel/quote/calculate",
        {
          method: "post",
          headers: getHeaders(),
        }
    );

    return ApiMutationResponse(
        (gallonsRequested) => result.executeRequest({
            body: JSON.stringify({ gallonsRequested }),
            headers: getHeaders()
        }),
        {
            data: result.data,
            loading: result.loading,
            error: result.error,
            called: result.called,
            resp: result.resp
        })
}

export function useFuelQuoteHistory(){
    const result = useStatefulFetch(
        config.functionsUrl + "/fuel/history",
        {
            executeOnMount: true,
            method: "get",
            headers: getHeaders(),
        }
    );

    return ApiQueryResponse({
        data: result.data,
        loading: result.loading,
        error: result.error,
        called: result.called,
        resp: result.resp
    })
}