import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

export class HttpClient {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
    });
    this._initializeResponseInterceptor();
  }

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  _handleResponse = (data) => data;

  _handleError = async ({ response, config }) => {
    const originalRequest = config;
    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return this.instance(originalRequest);
    }
    return Promise.resolve(response);
  };
  
}

export default HttpClient;