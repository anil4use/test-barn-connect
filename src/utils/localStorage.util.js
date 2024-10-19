import Cookies from "js-cookie";
// import { useState } from "react";
// const [isLoggedIn, setIsLoggedIn] = useState(false);

export const getTokenLocal = () => {
  return Cookies.get("x_auth_token");
};

export const getUserLocal = () => {
  const user = Cookies.get("x_ufo");

  if (user !== null && user !== undefined) {
    return JSON.parse(user);
    // setIsLoggedIn(true);
  } else {
    return null;
    // setIsLoggedIn(false);
  }
};
export const getCartLocal = () => {
  const cart = Cookies.get("x_cart_barn");

  if (cart) {
    return JSON.parse(cart);
  } else {
    return null;
  }
};
export const getPriceLocal = () => {
  return parseFloat(Cookies.get("x_total_price_barn"));
};

export const setCartLocal = (cart) => {
  Cookies.set("x_cart_barn", JSON.stringify(cart), { expires: 28 });
};

export const setPriceLocal = (price) => {
  Cookies.set("x_total_price_barn",price , { expires: 28 });
};
export const setTokenLocal = (token) => {
  Cookies.set("x_auth_token", token, { expires: 30 });
};

export const setUserLocal = (user) => {
  Cookies.set("x_ufo", JSON.stringify(user), { expires: 30 });
};
