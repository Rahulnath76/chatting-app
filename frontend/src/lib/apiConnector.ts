import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://chatting-app-b23h.onrender.com/api"
});

export const apiConnector = async <T> (
    method: Method,
    url: string,
    bodyData?: unknown,
    headers?: Record<string, string>,
    params?: Record<string, unknown>
): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = {
        method,
        url,
        data: bodyData || null,
        headers: headers || undefined,
        params: params || undefined,
        withCredentials: true,
    }

    return axiosInstance.request<T>(config);
}