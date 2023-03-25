
export function ApiQueryResponse({ data, loading, error, called, resp }){
    return { data, loading, error, called, resp }
}

export function ApiMutationResponse(executeFn, { data, loading, error, called, resp }){
    return [ executeFn, { data, loading, error, called, resp } ]
}