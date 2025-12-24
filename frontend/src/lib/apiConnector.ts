import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, Method } from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
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