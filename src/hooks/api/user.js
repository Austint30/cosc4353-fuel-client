import { config } from 'config/firebase';
import useStatefulFetch from "hooks/stateful-fetch";
import { getHeaders } from "util/headers";
import { ApiMutationResponse, ApiQueryResponse } from './model';

export function useUserProfile(){

    const result = useStatefulFetch(
        config.functionsUrl + "/user/profile",
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

export function useUpdateUserProfile(){
    const result = useStatefulFetch(
        config.functionsUrl + "/user/profile",
        {
          method: "post",
          headers: getHeaders(),
        }
    );

    return ApiMutationResponse(
        (newProfile) => result.executeRequest({
            body: JSON.stringify(newProfile),
            headers: getHeaders()
        }),
        {
            data: result.data,
            loading: result.loading,
            error: result.error,
            called: result.called,
            resp: result.resp
        }
    )
}