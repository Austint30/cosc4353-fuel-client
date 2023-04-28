import { useEffect } from "react";

const { useState } = require("react");

/**
 * Wrapper around the fetch module where react components can consume the data returned and/or errors.
 * @param {RequestInfo | URL} input 
 * @param {RequestInit | StatefulFetchOptions} init
 * @returns {FetchResult}
 */
function useStatefulFetch(input, init){
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ called, setCalled ] = useState(false);
    let [ resp, setResp ] = useState({});

    const { executeOnMount, ...restInit } = init;

    // Execute request
    function execute(excInit){
        setLoading(true);
        setError(null);
        setCalled(true);
        return fetch(input, { ...restInit, ...excInit })
            .then(async resp => {
                if (!resp.ok){
                    let content = await resp.text();
                    setError(content)
                    try {
                        let parsed = JSON.parse(content);
                        setData(parsed);
                    }
                    catch(e){}
                }
                else
                {
                    setData(await resp.json());
                }
                setResp(resp);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err)
                setError(String(err));
                setLoading(false);
            });
    }

    useEffect(() => {
        if (executeOnMount){
            execute();
        }
    }, [ executeOnMount ])

    return {
        executeRequest: execute,
        data: data,
        error: error,
        loading: loading,
        called: called,
        resp: resp
    }
}

export default useStatefulFetch;