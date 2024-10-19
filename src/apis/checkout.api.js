import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../configs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = import.meta.env.VITE_API_URL;

class CheckOutApi extends HttpClient {
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

  applyCouponConfig = ApiRoutes.CheckOut.applyCoupon;
  orderSummaryConfig = ApiRoutes.CheckOut.orderSummary;
  createOrderConfig = ApiRoutes.CheckOut.createOrder;
  rentalProductConfig = ApiRoutes.CheckOut.rentalProduct;
  rentalOrderSummaryConfig = ApiRoutes.CheckOut.rentalOrderSummary;
  servicePurchaseSummaryConfig = ApiRoutes.CheckOut.servicePurchaseSummary;
  servicePurchaseConfig = ApiRoutes.CheckOut.servicePurchase;
  deleteServicePurchaseSummaryConfig = ApiRoutes.CheckOut.deleteServicePurchaseSummary;
  deleteRentalProductConfig = ApiRoutes.CheckOut.deleteRentalProduct;
  barnOrderSummaryConfig = ApiRoutes.CheckOut.barnOrderSummary;
  barnPaymentConfig = ApiRoutes.CheckOut.barnPayment;


  applyCoupon = async (reqBody) => {
    return this.instance({
      method: this.applyCouponConfig.Method,
      url: this.applyCouponConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  getOrderSummary = async (reqBody) => {
    return this.instance({
      method: this.orderSummaryConfig.Method,
      url: this.orderSummaryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  rentalOrderSummary = async (reqBody) => {
    return this.instance({
      method: this.rentalOrderSummaryConfig.Method,
      url: this.rentalOrderSummaryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  createOrder = async (reqBody) => {
    return this.instance({
      method: this.createOrderConfig.Method,
      url: this.createOrderConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  barnPayment = async (reqBody) => {
    return this.instance({
      method: this.barnPaymentConfig.Method,
      url: this.barnPaymentConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  rentalProduct = async (reqBody) => {
    return this.instance({
      method: this.rentalProductConfig.Method,
      url: this.rentalProductConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  servicePurchaseSummary = async (reqBody) => {
    return this.instance({
      method: this.servicePurchaseSummaryConfig.Method,
      url: this.servicePurchaseSummaryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  barnOrderSummary = async (reqBody) => {
    return this.instance({
      method: this.barnOrderSummaryConfig.Method,
      url: this.barnOrderSummaryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  servicePurchase = async (reqBody) => {
    return this.instance({
      method: this.servicePurchaseConfig.Method,
      url: this.servicePurchaseConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  deleteServicePurchaseSummary = async (reqBody) => {
    return this.instance({
      method: this.deleteServicePurchaseSummaryConfig.Method,
      url: this.deleteServicePurchaseSummaryConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  deleteRentalProduct = async (reqBody) => {
    return this.instance({
      method: this.deleteRentalProductConfig.Method,
      url: this.deleteRentalProductConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };



}

export default CheckOutApi;