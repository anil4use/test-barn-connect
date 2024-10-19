import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;

class BarnApi extends HttpClient {
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

  getAllBarnConfig = ApiRoutes.Barns.getAllBarn;
  getBarnByIdConfig = ApiRoutes.Barns.getBarnById;
  addReviewConfig = ApiRoutes.Barns.addReviewByBarnId;
  getReviewConfig = ApiRoutes.Barns.getReviewByBarnId;



  getAllBarns = async (reqBody) => {
    return this.instance({
      method: this.getAllBarnConfig.Method,
      url: this.getAllBarnConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getBarnById = async (reqBody) => {
    return this.instance({
      method: this.getBarnByIdConfig.Method,
      url: this.getBarnByIdConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
 
  addReviewByBarnId= async (reqBody) => {
    return this.instance({
      method: this.addReviewConfig.Method,
      url: this.addReviewConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getReviewByBarnId= async (reqBody) => {
    return this.instance({
      method: this.getReviewConfig.Method,
      url: this.getReviewConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  



}

export default BarnApi;