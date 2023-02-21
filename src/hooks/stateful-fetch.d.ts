
export interface FetchResult {
    executeRequest: (requestInit?: RequestInit) => void,
    response: Response,
    error: any,
    loading: boolean,
    called: boolean
}

function useStatefulFetch(input: RequestInfo | URL, init?: RequestInit): FetchResult

export default useStatefulFetch;