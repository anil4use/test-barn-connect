import { getTokenLocal } from "../../utils/localStorage.util";
import ApiRoutes from "../../configs/endpoints.config";
import HttpClient from "../index.api";
const baseURL = import.meta.env.VITE_API_URL;

class Auth extends HttpClient {
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

  loginConfig = ApiRoutes.Auth.Login;
  registerConfig = ApiRoutes.Auth.Register;
  updateUserConfig = ApiRoutes.Auth.updateUser;
  forgetPasswordConfig = ApiRoutes.Auth.forgetPassword;
  setPasswordConfig = ApiRoutes.Auth.setPassword;
  verifyOTPConfig = ApiRoutes.Auth.verifyOTP;
  socialLoginConfig = ApiRoutes.Auth.socialLogin;
  horseProfileConfig = ApiRoutes.Auth.horseProfile;
  updatehorseProfileConfig = ApiRoutes.Auth.updatehorseProfile;
  getUserDetailConfig = ApiRoutes.Auth.getUserDetail;
  verifyEmailConfig = ApiRoutes.Auth.verifyEmail;
  verifyTokenConfig = ApiRoutes.Auth.verifyToken;
  reSendOtpConfig = ApiRoutes.Auth.reSendOtp;

  login = async (reqBody) => {
    return this.instance({
      method: this.loginConfig.Method,
      url: this.loginConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  Register = async (reqBody) => {
    return this.instance({
      method: this.registerConfig.Method,
      url: this.registerConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  updateUser = async (reqBody) => {
    return this.instance({
      method: this.updateUserConfig.Method,
      url: this.updateUserConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  forgetPassword = async (reqBody) => {
    return this.instance({
      method: this.forgetPasswordConfig.Method,
      url: this.forgetPasswordConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  setPassword = async (reqBody) => {
    return this.instance({
      method: this.setPasswordConfig.Method,
      url: this.setPasswordConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  verifyOTP = async (reqBody) => {
    return this.instance({
      method: this.verifyOTPConfig.Method,
      url: this.verifyOTPConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  socialLogin = async (reqBody) => {
    return this.instance({
      method: this.socialLoginConfig.Method,
      url: this.socialLoginConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  HorseProfile = async (reqBody) => {
    return this.instance({
      method: this.horseProfileConfig.Method,
      url: this.horseProfileConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  updatehorseProfile = async (reqBody) => {
    return this.instance({
      method: this.updatehorseProfileConfig.Method,
      url: this.updatehorseProfileConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  getUserDetail = async (reqBody) => {
    return this.instance({
      method: this.getUserDetailConfig.Method,
      url: this.getUserDetailConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
  verifyEmail = async (reqBody) => {
    return this.instance({
      method: this.verifyEmailConfig.Method,
      url: this.verifyEmailConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  verifyToken = async (reqBody) => {
    return this.instance({
      method: this.verifyTokenConfig.Method,
      url: this.verifyTokenConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };

  reSendOtp = async (reqBody) => {
    return this.instance({
      method: this.reSendOtpConfig.Method,
      url: this.reSendOtpConfig.Endpoint,
      headers: {},
      data: reqBody,
    });
  };
}

export default Auth;
