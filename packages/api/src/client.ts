import axios, { type AxiosInstance } from "axios";

export type CreateApiClientOptions = {
  baseURL: string;
};

export function createApiClient({ baseURL }: CreateApiClientOptions): AxiosInstance {
  const client = axios.create({
    baseURL,
    withCredentials: true,
  });

  client.interceptors.response.use(
    (res) => res,
    (error) => {
      return Promise.reject(error);
    },
  );

  return client;
}

