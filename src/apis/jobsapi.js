import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;

class JobsApi extends HttpClient {
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

  getJobDetailsConfig = ApiRoutes.Jobs.getJobDetails;
  applyForJobConfig = ApiRoutes.Jobs.applyForJob;
  getJobByIdConfig = ApiRoutes.Jobs.getJobById;
 
  getAllJobs = async (reqBody) => {
    return this.instance({
      method: this.getJobDetailsConfig.Method,
      url: this.getJobDetailsConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  applyForJob = async (reqBody) => {
    return this.instance({
      method: this.applyForJobConfig.Method,
      url: this.applyForJobConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getJobById = async (reqBody) => {
    return this.instance({
      method: this.getJobByIdConfig.Method,
      url: this.getJobByIdConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };


}

export default JobsApi;