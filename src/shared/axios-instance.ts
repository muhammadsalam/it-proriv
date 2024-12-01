import _axios from "axios";
import { useAllStore } from "src/entities/stores";

export const http = _axios.create({
  baseURL:
    "https://37f0-2a03-d000-1419-4f4f-f5a6-fec2-9bff-73ba.ngrok-free.app/",
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    const token = useAllStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(response => {
//     return response;
// }, async error => {
//     if (error.response.status === 401) {
//         $token.reset();
//     }
//     return Promise.reject(error);
// });
