import {AxiosError, AxiosResponse} from 'axios';

export interface ApiCallbacks {
    onSuccess?(response: AxiosResponse): any;
    onError?(error: AxiosError): any;
}

export interface ApiCallbacks {
    onSuccess?(response: AxiosResponse): any;
    onError?(error: AxiosError): any;
}
