import axios from "axios";
import { getToken, removeToken } from "@/lib/auth";
import { redirectToSignIn } from "@/lib/redirect";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (!token) {
      // 如果沒有 token，重定向到登入頁面
      redirectToSignIn();
      return Promise.reject(new Error("沒有 token，請重新登入"));
    }

    // 檢查 token 是否過期
    const isTokenExpired = checkTokenExpiration(token);
    if (isTokenExpired) {
      // 如果 token 過期，移除 token 並重定向到登入頁面
      removeToken();
      redirectToSignIn();
      return Promise.reject(new Error("Token 已過期，請重新登入"));
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function checkTokenExpiration(token: string): boolean {
  // 假設 token 是 JWT，並且 payload 中有 exp 屬性
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expirationDate = new Date(payload.exp * 1000);
  return expirationDate < new Date();
}

export default axiosInstance;
