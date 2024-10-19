import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;

class AddressApi extends HttpClient {
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

  addAddressConfig = ApiRoutes.Address.addAddress;
  getAllAddressConfig = ApiRoutes.Address.getallAddress;
  deleteAddressConfig = ApiRoutes.Address.deleteAddress;
  updateAddressConfig = ApiRoutes.Address.updateAddress;
  getAddressConfig = ApiRoutes.Address.getAddress;
  addAddress = async (reqBody) => {
    return this.instance({
      method: this.addAddressConfig.Method,
      url: this.addAddressConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getAllAddress = async (reqBody) => {
    return this.instance({
      method: this.getAllAddressConfig.Method,
      url: this.getAllAddressConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  deleteAddress = async (reqBody) => {
    return this.instance({
      method: this.deleteAddressConfig.Method,
      url: this.deleteAddressConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  updateAddress = async (reqBody) => {
    return this.instance({
      method: this.updateAddressConfig.Method,
      url: this.updateAddressConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getAddress = async (reqBody) => {
    return this.instance({
      method: this.getAddressConfig.Method,
      url: this.getAddressConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };


}

export default AddressApi;