import {useEffect, useState} from 'react';
import {useFirstMountState} from 'react-use';
import {ApiCallbacks} from '../types/ajax';
import {ajax} from '../utils/ajax';
import {AxiosResponse} from 'axios';

interface UseApiState<Params, Data> {
    loading?: boolean;
    loaded?: boolean;
    params?: Params;
    data?: Data;
}

interface UseApiConfig<Params, Data, Response> {
    url: string;
    initialState?: UseApiState<Params, Data>;
    fetchOnMount?: boolean;
    method?: 'get' | 'post';
    onSuccess?: (response: Response | any) => any;
    onError?: (err) => any;
    transformer?: (response: AxiosResponse<Response>) => Data;
}

export function useApi<Params, Data, Response>({
                           url,
                           initialState = {},
                           fetchOnMount = false,
                           method = 'get',
                           onSuccess,
                           onError,
                           transformer = (response: any) => response.data,
                       }: UseApiConfig<Params, Data, Response>) {
    const defaultCallBacks = {
        onSuccess,
        onError,
    };
    const firstMount = useFirstMountState();
    const [requestId, setRequestId] = useState(0);
    const [params, setParams] = useState(initialState.params);
    const [callbacks, setCallbacks] = useState(defaultCallBacks);
    const [data, setData] = useState(initialState.data);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(initialState.loading || false);
    const [loaded, setLoaded] = useState(initialState.loaded || false);

    function callApi(params?: Params, customCallbacks?: ApiCallbacks) {
        setLoading(true);
        setParams(params);
        // update callback function
        setCallbacks({
            ...defaultCallBacks,
            ...customCallbacks,
        });
        setRequestId(requestId + 1);
    }

    if (firstMount && fetchOnMount) {
        callApi(initialState.params);
    }


    useEffect(() => {
        if (!loading || requestId === 0) {
            return () => undefined;
        }

        ajax({
            url,
            method,
            params,
        }).then(function (response) {
            if (typeof callbacks.onSuccess === 'function') {
                callbacks.onSuccess(response);
            }

            setData(transformer(response));
        })
            .catch(function (e) {
                if (typeof callbacks.onError === 'function') {
                    callbacks.onError(e);
                }

                setError(e);
            })
            .finally(function () {
                setLoading(false);
                setLoaded(true);
            });

        return () => {
            // reset callbacks
            setCallbacks({
                onSuccess,
                onError,
            });
        }
    }, [requestId]);

    // noinspection JSUnusedGlobalSymbols
    return {
        data,
        setData,

        error,
        setError,

        loading,
        setLoading,

        loaded,
        setLoaded,

        callApi,
    };
}
