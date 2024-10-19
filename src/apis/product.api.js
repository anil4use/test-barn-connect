import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;

class ProductApi extends HttpClient {
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

  getAllProductsConfig = ApiRoutes.Product.getAllProduct;
  getProductByProductIdConfig = ApiRoutes.Product.getProductByProductId;
  getAllProductsPriceRangeConfig = ApiRoutes.Product.getAllProductsPriceRange;
  addReviewConfig = ApiRoutes.Product.addReviewByProductId;
  getReviewConfig = ApiRoutes.Product.getReviewByProductId;
  getAllgetCategoryConfig = ApiRoutes.Product.getAllgetCategory;


  allProducts = async (reqBody) => {
    return this.instance({
      method: this.getAllProductsConfig.Method,
      url: this.getAllProductsConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getProductByProductId = async (reqBody) => {
    return this.instance({
      method: this.getProductByProductIdConfig.Method,
      url: this.getProductByProductIdConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getAllProductsPriceRange = async (reqBody) => {
    return this.instance({
      method: this.getAllProductsPriceRangeConfig.Method,
      url: this.getAllProductsPriceRangeConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  addReviewByProductId = async (reqBody) => {
    return this.instance({
      method: this.addReviewConfig.Method,
      url: this.addReviewConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getReviewByProductId = async (reqBody) => {
    return this.instance({
      method: this.getReviewConfig.Method,
      url: this.getReviewConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getAllgetCategory = async (reqBody) => {
    return this.instance({
      method: this.getAllgetCategoryConfig.Method,
      url: this.getAllgetCategoryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  addToCart = async (reqBody) => {
    return this.instance({
      method: this.addToCartConfig.Method,
      url: this.addToCartConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };




}

export default ProductApi;