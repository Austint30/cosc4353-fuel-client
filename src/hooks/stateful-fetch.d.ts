
export interface FetchResult {
    executeRequest: (requestInit?: RequestInit) => void,
    data: any,
    error: any,
    loading: boolean,
    called: boolean,
    resp: Response
}

export interface StatefulFetchOptions {
    executeOnMount?: boolean
}

function useStatefulFetch(input: RequestInfo | URL, init?: RequestInit | StatefulFetchOptions): FetchResult

export default useStatefulFetch;