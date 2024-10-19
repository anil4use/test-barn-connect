import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;

class HorseApi extends HttpClient {
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

  getAllHorseOfUserConfig = ApiRoutes.Horses.getAllHorseOfUser;
  horseProfileConfig = ApiRoutes.Horses.horseProfile;
  horseProfileUpdateConfig = ApiRoutes.Horses.horseProfileUpdate;
  deleteHorseConfig = ApiRoutes.Horses.deleteHorse;
  getHorseByIdConfig = ApiRoutes.Horses.getHorseById;



  getAllHorseOfUser = async (reqBody) => {
    return this.instance({
      method: this.getAllHorseOfUserConfig.Method,
      url: this.getAllHorseOfUserConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  horseProfile = async (reqBody) => {
    return this.instance({
      method: this.horseProfileConfig.Method,
      url: this.horseProfileConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  horseProfileUpdate= async (reqBody) => {
    return this.instance({
      method: this.horseProfileUpdateConfig.Method,
      url: this.horseProfileUpdateConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getHorseById= async (reqBody) => {
    return this.instance({
      method: this.getHorseByIdConfig.Method,
      url: this.getHorseByIdConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  deleteHorse= async (reqBody) => {
    return this.instance({
      method: this.deleteHorseConfig.Method,
      url: this.deleteHorseConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
}

export default HorseApi;