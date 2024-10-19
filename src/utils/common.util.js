import Cookies from "js-cookie";
import { getUserLocal } from "./localStorage.util";
export const logout = (history) => {
  Cookies.remove("x_ufo");
  Cookies.remove("x_auth_token");
  return history("/login");
};

export const findProduct = (productId, wishlist) => {
  const data = wishlist.some((d) => {
    return d.productId == productId;
  });
  return data;
};


export const userReviewAlready = (review) => {
  const userData = getUserLocal()
  if (userData) {
    const data = review.find((d) => {
      return d.userId === userData.userId;
    });
    return !data;
  } else {
    return null;
  }
};
export const formatDate = (date)=> {
  return new Date(date).toLocaleString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const formatTime = (date)=> {
  return new Date(date).toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
export const getRedirectPath = () => {
  return localStorage.getItem('redirectPath');
};

export const setRedirectPath = (path) => {
  localStorage.setItem('redirectPath', path);
};

export const clearRedirectPath = () => {
  localStorage.removeItem('redirectPath');
};