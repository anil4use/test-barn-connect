import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;

class CartApi extends HttpClient {
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

  addToCartConfig = ApiRoutes.Cart.addToCart;
  removeCartConfig = ApiRoutes.Cart.removeProductFromCart;
  getCartConfig = ApiRoutes.Cart.getCart;
  resetCartConfig = ApiRoutes.Cart.resetCart;


  addToCart = async (reqBody) => {
    return this.instance({
      method: this.addToCartConfig.Method,
      url: this.addToCartConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getCart = async (reqBody) => {
    return this.instance({
      method: this.getCartConfig.Method,
      url: this.getCartConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  removeProductFromCart = async (reqBody) => {
    return this.instance({
      method: this.removeCartConfig.Method,
      url: this.removeCartConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  resetCart = async (reqBody) => {
    return this.instance({
      method: this.resetCartConfig.Method,
      url: this.resetCartConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };


}

export default CartApi;