export const HttpMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Patch: "PATCH",
  Delete: "DELETE",
};

const ApiRoutes = {
  Auth: {
    Login: {
      Endpoint: "/login",
      Method: HttpMethod.Post,
    },
    Register: {
      Endpoint: "/signUp",
      Method: HttpMethod.Post,
    },
    updateUser: {
      Endpoint: "/editProfile",
      Method: HttpMethod.Post,
    },
    forgetPassword: {
      Endpoint: "/forgetPassword",
      Method: HttpMethod.Post,
    },
    setPassword: {
      Endpoint: "/setPassword",
      Method: HttpMethod.Post,
    },
    socialLogin: {
      Endpoint: "/socialLogin",
      Method: HttpMethod.Post,
    },
    verifyOTP: {
      Endpoint: "/verifyOtp",
      Method: HttpMethod.Post,
    },
    horseProfile: {
      Endpoint: "/horseProfile",
      Method: HttpMethod.Post,
    },
    updatehorseProfile: {
      Endpoint: "/horseProfileUpdate",
      Method: HttpMethod.Post,
    },
    getUserDetail: {
      Endpoint: "/getUserDetail",
      Method: HttpMethod.Post,
    },
    verifyEmail: {
      Endpoint: "/verifyEmail",
      Method: HttpMethod.Post,
    },
    verifyToken: {
      Endpoint: "/verifyToken",
      Method: HttpMethod.Post,
    },
    reSendOtp: {
      Endpoint: "/reSendOtp",
      Method: HttpMethod.Post,
    },
   
  },
  Product: {
    getAllProduct: {
      Endpoint: "/getAllProducts",
      Method: HttpMethod.Post,
    },
    getProductByProductId: {
      Endpoint: "/getProductByProductId",
      Method: HttpMethod.Post,
    },
    getAllProductsPriceRange: {
      Endpoint: "/getAllProductsBetweenPriceRange",
      Method: HttpMethod.Post,
    },
    addReviewByProductId: {
      Endpoint: "/addReviewByProductId",
      Method: HttpMethod.Post,
    },
    getReviewByProductId: {
      Endpoint: "/getReviewByProductId",
      Method: HttpMethod.Post,
    },
    getAllgetCategory: {
      Endpoint: "/getCategoryAndSubCategory",
      Method: HttpMethod.Post,
    },

  },
  Wishlist: {
    addWishlist: {
      Endpoint: "/addWishlistByProductId",
      Method: HttpMethod.Post,
    },
    removeWishlist: {
      Endpoint: "/removeWishlistByProductId",
      Method: HttpMethod.Post,
    },
    getWishlist: {
      Endpoint: "/getWishlist",
      Method: HttpMethod.Post,
    },

  },
  Cart: {
    addToCart: {
      Endpoint: "/addToCart",
      Method: HttpMethod.Post,
    },
    removeProductFromCart: {
      Endpoint: "/removeProductFromCart",
      Method: HttpMethod.Post,
    },
    getCart: {
      Endpoint: "/getCart",
      Method: HttpMethod.Post,
    },
    resetCart: {
      Endpoint: "/resetCart",
      Method: HttpMethod.Post,
    },

  },
  CheckOut: {
    applyCoupon: {
      Endpoint: "/applyCoupon",
      Method: HttpMethod.Post,
    },
    orderSummary: {
      Endpoint: "/orderSummary",
      Method: HttpMethod.Post,
    },
    createOrder: {
      Endpoint: "/createOrder",
      Method: HttpMethod.Post,
    },
    barnPayment: {
      Endpoint: "/barnPayment",
      Method: HttpMethod.Post,
    },
    rentalProduct: {
      Endpoint: "/rentalProduct",
      Method: HttpMethod.Post,
    },
    servicePurchaseSummary: {
      Endpoint: "/servicePurchaseSummary",
      Method: HttpMethod.Post,
    },
    barnOrderSummary: {
      Endpoint: "/barnOrderSummary",
      Method: HttpMethod.Post,
    },
    rentalOrderSummary: {
      Endpoint: "/rentalOrderSummary",
      Method: HttpMethod.Post,
    },
    servicePurchase: {
      Endpoint: "/servicePurchase",
      Method: HttpMethod.Post,
    },
    deleteServicePurchaseSummary: {
      Endpoint: "/deleteServicePurchaseSummary",
      Method: HttpMethod.Post,
    },
    deleteRentalProduct: {
      Endpoint: "/deleteRentalProduct",
      Method: HttpMethod.Post,
    },


  },
  Address: {
 
    getallAddress: {
      Endpoint: "/getAllAddressOfLoginUser",
      Method: HttpMethod.Post,
    },
    addAddress: {
      Endpoint: "/addAddress",
      Method: HttpMethod.Post,
    },
    deleteAddress: {
      Endpoint: "/deleteAddressByAddressId",
      Method: HttpMethod.Post,
    },
    updateAddress: {
      Endpoint: "/updateAddressByAddressId",
      Method: HttpMethod.Post,
    },
    getAddress: {
      Endpoint: "/getAddressByAddressId",
      Method: HttpMethod.Post,
    },

  },
  Services: {
    getAllService: {
      Endpoint: "/getAllService",
      Method: HttpMethod.Post,
    },
    getServiceCategory: {
      Endpoint: "/getAllServiceCategory",
      Method: HttpMethod.Post,
    },
    getServiceById: {
      Endpoint: "/getServiceByServiceId",
      Method: HttpMethod.Post,
    },
    getReviewByServicesId: {
      Endpoint: "/getReviewByServiceId",
      Method: HttpMethod.Post,
    },

    addReviewByServicesId: {
      Endpoint: "/addReviewByServiceId",
      Method: HttpMethod.Post,
    },
    serviceEnquiry: {
      Endpoint: "/serviceEnquiry",
      Method: HttpMethod.Post,
    },
  },
  Other: {
    trackOrder: {
      Endpoint: "/trackOrder",
      Method: HttpMethod.Post,
    },
    getOrderHistory: {
      Endpoint: "/getOrderHistory",
      Method: HttpMethod.Post,
    },
    addAdmin: {
      Endpoint: "/becomeMember",
      Method: HttpMethod.Post,
    },
    contactUs: {
      Endpoint: "/contactUs",
      Method: HttpMethod.Post,
    },

  },
  Jobs: {
    getJobDetails: {
      Endpoint: "/getJobDetails",
      Method: HttpMethod.Post,
    },
    applyForJob: {
      Endpoint: "/applyForJob",
      Method: HttpMethod.Post,
    },
    getJobById: {
      Endpoint: "/getJobById",
      Method: HttpMethod.Post,
    },

  },
  Barns: {
    getAllBarn: {
      Endpoint: "/getAllBarn",
      Method: HttpMethod.Post,
    },
    getBarnById: {
      Endpoint: "/getBarnById",
      Method: HttpMethod.Post,
    },
    addReviewByBarnId: {
      Endpoint: "/addReviewByBarnId",
      Method: HttpMethod.Post,
    },
    getReviewByBarnId: {
      Endpoint: "/getReviewByBarnId",
      Method: HttpMethod.Post,
    },

  },
  Horses: {
    getAllHorseOfUser: {
      Endpoint: "/getAllHorseOfUser",
      Method: HttpMethod.Post,
    },
    getHorseById: {
      Endpoint: "/getHorseById",
      Method: HttpMethod.Post,
    },
    deleteHorse: {
      Endpoint: "/deleteHorse",
      Method: HttpMethod.Post,
    },
    horseProfileUpdate: {
      Endpoint: "/horseProfileUpdate",
      Method: HttpMethod.Post,
    },
    horseProfile: {
      Endpoint: "/horseProfile",
      Method: HttpMethod.Post,
    },
  },
  Coupon: {
    getAllCoupon: {
      Endpoint: "/getAllCoupon",
      Method: HttpMethod.Post,
    },
  }
};

export default ApiRoutes;
