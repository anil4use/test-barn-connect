import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;

class ServicesApi extends HttpClient {
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

  getAllServiceConfig = ApiRoutes.Services.getAllService;
  getServiceCategoryConfig = ApiRoutes.Services.getServiceCategory;
  getServiceByIdConfig = ApiRoutes.Services.getServiceById;
  addReviewConfig = ApiRoutes.Services.addReviewByServicesId;
  getReviewConfig = ApiRoutes.Services.getReviewByServicesId;
  serviceEnquiryConfig = ApiRoutes.Services.serviceEnquiry;
  
  getAllService = async (reqBody) => {
    return this.instance({
      method: this.getAllServiceConfig.Method,
      url: this.getAllServiceConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getServiceCategory = async (reqBody) => {
    return this.instance({
      method: this.getServiceCategoryConfig.Method,
      url: this.getServiceCategoryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getServiceById = async (reqBody) => {
    return this.instance({
      method: this.getServiceByIdConfig.Method,
      url: this.getServiceByIdConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  addReviewByServicesId = async (reqBody) => {
    return this.instance({
      method: this.addReviewConfig.Method,
      url: this.addReviewConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getReviewByServicesId = async (reqBody) => {
    return this.instance({
      method: this.getReviewConfig.Method,
      url: this.getReviewConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  serviceEnquiry = async (reqBody) => {
    return this.instance({
      method: this.serviceEnquiryConfig.Method,
      url: this.serviceEnquiryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };


}

export default ServicesApi;