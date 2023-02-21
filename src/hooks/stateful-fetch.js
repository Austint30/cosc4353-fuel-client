const { useState } = require("react");

/**
 * Wrapper around the fetch module where react components can consume the data returned and/or errors.
 * @param {RequestInfo | URL} input 
 * @param {RequestInit} init
 * @returns {FetchResult}
 */
function useStatefulFetch(input, init){
    const [ resp, setResp ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ called, setCalled ] = useState(false);

    // Execute request
    function execute(excInit){
        setLoading(true);
        setError(null);
        setCalled(true);
        fetch(input, { ...init, ...excInit })
            .then(async resp => {
                if (!resp.ok){
                    setError(await resp.text());
                }
                setResp(resp);
                setLoading(false);
            })
            .catch((err) => {
                setError(String(err));
                setLoading(false);
            });
    }

    return {
        executeRequest: execute,
        response: resp,
        error: error,
        loading: loading,
        called: called
    }
}

export default useStatefulFetch;