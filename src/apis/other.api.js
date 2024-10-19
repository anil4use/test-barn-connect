import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;

class OtherApi extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${getTokenLocal()}`;
      config.headers["authkey"] = import.meta.env.VITE_AUTH_KEY;
      return config;
    });
  };

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (response) => {
        return Promise.resolve(response);
      }
    );
  };

  trackOrderConfig = ApiRoutes.Other.trackOrder;
  getOrderHistoryConfig = ApiRoutes.Other.getOrderHistory;
  addAdminConfig = ApiRoutes.Other.addAdmin;
  contactUsConfig = ApiRoutes.Other.contactUs;

  trackOrder = async (reqBody) => {
    return this.instance({
      method: this.trackOrderConfig.Method,
      url: this.trackOrderConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getOrderHistory = async (reqBody) => {
    return this.instance({
      method: this.getOrderHistoryConfig.Method,
      url: this.getOrderHistoryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  addAdmin = async (reqBody) => {
    return this.instance({
      method: this.addAdminConfig.Method,
      url: this.addAdminConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  contactUs = async (reqBody) => {
    return this.instance({
      method: this.contactUsConfig.Method,
      url: this.contactUsConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };


}

export default OtherApi;