import {useEffect, useState} from 'react';
import {useFirstMountState} from 'react-use';
import {ApiCallbacks} from '../types/ajax';
import {ajax} from '../utils/ajax';
import {AxiosResponse} from 'axios';
import {Dict} from '../../../types/general';

interface UseApiState<Payload, Data> {
    loading?: boolean;
    loaded?: boolean;
    payload?: Payload;
    data?: Data;
}

interface UseApiConfig<Payload, Data, Response> {
    url: string;
    initialState?: UseApiState<Payload, Data>;
    fetchOnMount?: boolean;
    isForm?: boolean; // if its true, put payload to data instead
    method?: 'get' | 'post';
    onSuccess?: (response: Response | any) => any;
    onError?: (err) => any;
    transformer?: (response: AxiosResponse<Response>) => Data;
}

let timeout: Dict<NodeJS.Timeout> = {};
export function useApi<Payload, Data, Response>({
                           url,
                           initialState = {},
                           fetchOnMount = false,
                           isForm = false,
                           method = 'get',
                           onSuccess,
                           onError,
                           transformer = (response: any) => response.data,
                       }: UseApiConfig<Payload, Data, Response>) {
    const defaultCallBacks = {
        onSuccess,
        onError,
    };
    const firstMount = useFirstMountState();
    const [requestId, setRequestId] = useState(0);
    const [payload, setPayload] = useState(initialState.payload);
    const [callbacks, setCallbacks] = useState(defaultCallBacks);
    const [data, setData] = useState(initialState.data);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(initialState.loading || false);
    const [loaded, setLoaded] = useState(initialState.loaded || false);

    function callApi(payload?: Payload, customCallbacks?: ApiCallbacks) {
        setLoading(true);
        setPayload(payload);
        // update callback function
        setCallbacks({
            ...defaultCallBacks,
            ...customCallbacks,
        });
        setRequestId(requestId + 1);
    }

    if (firstMount && fetchOnMount) {
        callApi(initialState.payload);
    }

    const debouncedCallApi = (...args) => {
        clearTimeout(timeout[url]);
        timeout[url] = setTimeout(function () {
            callApi(...args);
        }, 500);
    }

    useEffect(() => {
        if (!loading || requestId === 0) {
            return () => undefined;
        }

        ajax({
            url,
            method,
            params: isForm ? undefined : payload,
            data: isForm ? payload : undefined,
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

        payload,
        setPayload,

        error,
        setError,

        loading,
        setLoading,

        loaded,
        setLoaded,

        callApi,
        debouncedCallApi,
    };
}
