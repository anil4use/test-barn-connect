import React from "react";
import {
  Box,
  Text,
  HStack,
  FormControl,
  FormLabel,
  Image,
  Flex,
  SimpleGrid,
  Grid,
  Heading,
  Stack,
  Card,
  CardBody,
  VStack,
  Checkbox,
  Input,
  InputGroup,
  Button,
  TableContainer,
  Table,
  Tr,
  Th,
  Tbody,
  Thead,
  Td,
  Tfoot,
  InputRightElement,
  Divider,
  RadioGroup,
  Radio,
  Spinner,
  FormErrorMessage,
  SkeletonText,
} from "@chakra-ui/react";
import BannerImg from "../../assets/images/checkoutBanner.png";
import ProductBanner from "../../components/shared/banner/Index";
import { useState } from "react";
import {
  ArrowForwardIcon,
  DeleteIcon,
  EditIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import toast from "react-hot-toast";
import AddressApi from "../../apis/address.api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CheckOutApi from "../../apis/checkout.api";
import CartApi from "../../apis/cart.api";
import Select from "react-select";
import noCardFound from "../../assets/images/noCardFound.png";
import HorseApi from "../../apis/horse.api";
import { useSelector } from "react-redux";
import CouponApi from "../../apis/Coupon.api";

function Index() {
  const options = [
    { value: 1, label: "1 day" },
    { value: 2, label: "2 days" },
    { value: 3, label: "3 days" },
    { value: 4, label: "4 days" },
    { value: 5, label: "5 days" },
    { value: 6, label: "6 days" },
    { value: 7, label: "7 days" },
    { value: 14, label: "2 weeks" },
    { value: 21, label: "3 weeks" },
    { value: 28, label: "4 weeks" },
    { value: 30, label: "1 month" },
    { value: 60, label: "2 months" },
    { value: 90, label: "3 months" },
  ];
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [orderSummaryLoading, setOrderSummaryLoading] = useState(false);

  const [loadingAddress, setLoadingAddress] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [allAddress, setAllAddress] = useState([]);
  const [selectedHorses, setSelectedHorses] = useState([]);
  const [horse, setHorse] = useState([]);
  const [horseLoading, setHorseLoading] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [orderSummary, setOrderSummary] = useState();
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDays, setSelectedDays] = useState(options[0]);
  const [rentId, setRentId] = useState("");
  const [selectedCouponCode, setSelectedCouponCode] = useState(null);
  const [barnRentalId, setBarnRentalId] = useState("");
  const [check, setCheck] = useState(false);
  const [serviceRentId, setServiceRentId] = useState("");
  // const getCartData = useSelector((state) => state.Cart.Cart);
  // console.log(getCartData,'--09-09-0');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const rental = searchParams.get("rental");
  const service = searchParams.get("service");
  const serviceId = searchParams.get("serviceId");
  const isBarn = searchParams.get("isBarn");
  const barnId = searchParams.get("barnId");
  const servicePurchaseDay = searchParams.get("servicePurchaseDay");
  const id = searchParams.get("id");

  console.log("getCardID", barnId);
  // setId(searchParams.get('id'))
  const couponApi = new CouponApi();
  const navigate = useNavigate();
  const addressApi = new AddressApi();
  const checkOutApi = new CheckOutApi();
  const cartApi = new CartApi();
  const horseApi = new HorseApi();

  const [couponData, setCouponData] = useState([]);

  const getAllCoupon = async () => {
    try {
      const couponResponse = await couponApi.getAllCoupon();
      if (couponResponse?.data?.code === 200) {
        let items = couponResponse?.data?.data;
        console.log("couponResponse successfully");
        setCouponData(items);
      } else {
        toast.error(couponResponse?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const CouponOptions = couponData
    .filter((coupon) => coupon?.isActive)
    .map((coupon) => ({
      value: coupon?.couponCode,
      label: `${coupon?.couponCode} - ${coupon?.discount}${
        coupon?.discountType === "percent" ? "%" : " $"
      }`, // Customize label as needed
      discount: coupon?.discount, // Store discount for further use
      discountType: coupon?.discountType, // Store discount type
    }));

  const handleSelectCouponCode = (selectedOption) => {
    setSelectedCouponCode(selectedOption);
  };

  const getAllAddress = async () => {
    setLoadingAddress(true);
    try {
      const response = await addressApi.getAllAddress();
      if (response?.data?.code === 200) {
        console.log("all addresses successfully");

        setAllAddress(response?.data?.data);
        setSelectedAddressId(response?.data?.data[0]?.addressId);
      } else {
        console.log("all addresses failed");

        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingAddress(false);
    }
  };

  const ApplyCouponHandler = async (e) => {
    e.preventDefault();

    if (selectedCouponCode == null) {
      return toast.error("please select or enter a coupon");
    }
    try {
      setCouponLoading(true);
      const Response = await checkOutApi.applyCoupon({
        couponCode: selectedCouponCode?.value,
      });
      if (Response.data.code === 200) {
        setShowCoupon(true);
        toast.success(Response?.data?.message);
        let coupon = Response?.data?.data?.couponCode;
        if (rental) {
          getRentalSummary(coupon);
        } else if (service) {
          GetServicePurchaseSummary(coupon);
        } else if (isBarn) {
          getBarnSummary(coupon);
        } else {
          getOrderSummary(coupon);
        }
      } else {
        toast.error(Response?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setCouponLoading(false);
      // setCouponCode("");
    }
  };
  // const resetCartHandler = async () => {
  //   try {
  //     const resetCartResponse = await cartApi.resetCart({
  //       cardId:''
  //     });
  //     if (resetCartResponse.data.code === 200) {
  //     } else {
  //       // toast.error(resetCartResponse.data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  const resetServicesSummary = async () => {
    try {
      const Response = await checkOutApi.deleteServicePurchaseSummary({
        serviceRentId,
      });
      if (Response?.data?.code === 200) {
        navigate("/services");
      } else {
        toast.error(Response?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const resetRentalProductSummary = async () => {
    try {
      const Response = await checkOutApi.deleteRentalProduct({
        rentId,
      });
      if (Response?.data?.code === 200) {
        navigate("/products");
      } else {
        toast.error(Response?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getOrderSummary = async (couponCode) => {
    if (selectedAddressId !== null || selectedAddressId === undefined || selectedAddressId === '') {
    setCheck(false);
    setOrderSummaryLoading(true);
    try {
      const getResponse = await checkOutApi.getOrderSummary({
        couponCode,
        addressId: selectedAddressId,
      });

      if (getResponse?.data?.code === 200) {
        setOrderSummaryLoading(false);
        setOrderSummary(getResponse?.data?.data);
        setCheck(getResponse?.data?.data?.items ? false : true);
      } else if(error){
        toast.error('error', error);
      }else{
        toast.error('something went wrong');
      }
    } catch (error) {
      toast.error('service is not available try after some time');
    } finally {
    }}
  };

  const getRentalSummary = async (couponCode) => {
    setOrderSummaryLoading(true);
    try {
      const rentalOrderSummaryResponse = await checkOutApi.rentalOrderSummary({
        quantity,
        productId,
        couponCode,
        addressId: selectedAddressId,
        days: selectedDays?.value,
      });

      if (rentalOrderSummaryResponse?.data?.code === 200) {
        setOrderSummary(rentalOrderSummaryResponse?.data?.data);
        setCheck(rentalOrderSummaryResponse?.data?.data?.items ? false : true);
        setRentId(rentalOrderSummaryResponse?.data?.data?.rentId);
      } else {
        // toast.error(rentalOrderSummaryResponse.data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      // if (selectedAddressId === null) {
      //   setOrderSummaryLoading(true);
      //   toast.error('please select address')
      // }
      setOrderSummaryLoading(false);
    }
  };
  const GetServicePurchaseSummary = async (couponCode) => {
    setOrderSummaryLoading(true);
    try {
      const ServicePurchaseResponse = await checkOutApi.servicePurchaseSummary({
        serviceId,
        servicePurchaseDay,
        couponCode,
        addressId: selectedAddressId,
      });
      if (ServicePurchaseResponse?.data?.code === 200) {
        setOrderSummary(ServicePurchaseResponse?.data?.data);
        setCheck(ServicePurchaseResponse?.data?.data?.items ? false : true);
        setServiceRentId(ServicePurchaseResponse?.data?.data?.serviceRentId);
      } else {
        toast.error(ServicePurchaseResponse?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setOrderSummaryLoading(false);
    }
  };
  const PaymentHandler = async () => {
    if (selectedAddressId === undefined || selectedAddressId === null) {
      return toast.error("Please select or Add New  Address");
    }
    setPaymentLoading(true);
    try {
      const PaymentResponse = await checkOutApi.createOrder({
        addressId: selectedAddressId,
        couponCode: selectedCouponCode?.value,
      });
      if (PaymentResponse.data.code === 200) {
        // toast.success(PaymentResponse.data.message);
        window.open(PaymentResponse?.data?.data?.data?.url);
        console.log(PaymentResponse?.data?.data?.data?.url, "createOrder");

        // resetCartHandler();
        navigate("/order-history");
      } else {
        toast.error(PaymentResponse?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setPaymentLoading(false);
    }
  };
  const RentalPaymentHandler = async () => {
    if (selectedAddressId === undefined || selectedAddressId === null) {
      return toast.error("Please select or Add New  Address");
    }
    if (!selectedDate.length != 0) {
      return toast.error("Please select or Add New Date");
    }
    if (selectedDays === null) {
      return toast.error("Please select Days");
    }
    console.log(selectedCouponCode?.value);

    setPaymentLoading(true);
    try {
      const PaymentResponse = await checkOutApi.rentalProduct({
        quantity,
        couponCode: selectedCouponCode?.value,
        productId,
        addressId: selectedAddressId,
        rentId,
        days: selectedDays?.value,
        productOutDate: selectedDate,
      });
      if (PaymentResponse.data.code === 200) {
        // toast.success(PaymentResponse.data.message);
        console.log(PaymentResponse?.data?.data?.data?.url, "rentalProduct");
        window.open(PaymentResponse?.data?.data?.data?.url);

        resetRentalProductSummary();
      } else {
        toast.error(PaymentResponse?.data?.message);
      }
    } catch (error) {
      // toast.error(error);
      console.log("test error: " + error);

      toast.error("error");
    } finally {
      setPaymentLoading(false);
    }
  };
  const ServicePaymentHandler = async () => {
    if (selectedAddressId === undefined || selectedAddressId === null) {
      return toast.error("Please select or Add New  Address");
    }
    setPaymentLoading(true);
    try {
      const PaymentResponse = await checkOutApi?.servicePurchase({
        addressId: selectedAddressId,
        serviceId,
        servicePurchaseDay,
        couponCode: selectedCouponCode?.value,
        serviceRentId,
      });
      if (PaymentResponse?.data?.code === 200) {
        // toast.success(PaymentResponse.data.message);
        // resetCartHandler();
        window.open(PaymentResponse?.data?.data?.data?.url);
        console.log(PaymentResponse?.data?.data?.data?.url, "servicePurchase");
        // resetServicesSummary()
      } else {
        toast.error(PaymentResponse?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setPaymentLoading(false);
    }
  };
  const BarnPaymentHandler = async () => {
    if (setSelectedHorses === undefined || setSelectedHorses === null) {
      return toast.error("Please select or Add New Horse");
    }
    setPaymentLoading(true);
    try {
      const PaymentResponse = await checkOutApi.barnPayment({
        days: selectedDays?.value,
        barnOutDate: selectedDate,
        barnId,
        couponCode: selectedCouponCode?.value,
        userId: userData?.userId,
        horseId: selectedHorses,
        numberOfHorses: selectedHorses?.length,
        barnRentalId: barnRentalId,
      });
      if (PaymentResponse?.data?.code === 200) {
        // toast.success(PaymentResponse.data.message);
        console.log(PaymentResponse?.data?.data?.data?.url, "barnPayment");
        window.open(PaymentResponse?.data?.data?.data?.url);
        navigate("/barns");
      } else {
        toast.error(PaymentResponse?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setPaymentLoading(false);
    }
  };
  const getAllHorses = async () => {
    setHorseLoading(true);
    try {
      const Response = await horseApi.getAllHorseOfUser();
      if (Response?.data?.code === 200) {
        console.log("Horse successfully");

        if (Response?.data?.data?.length <= 0) {
          console.log("Horse successfully if");
          navigate("/horse/register");
        }
        setHorse(Response?.data?.data[0]);
        setSelectedHorses([Response?.data?.data?.[0]?.horseId]);
      } else {
        toast.error(Response?.data?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setHorseLoading(false);
    }
  };
  const getBarnSummary = async (couponCode) => {
    setOrderSummaryLoading(true);
    try {
      const barnResponse = await checkOutApi.barnOrderSummary({
        barnId,
        userId: userData?.userId,
        selectedDate,
        couponCode,
        days: selectedDays?.value,
        addressId: selectedAddressId,
        horseId: selectedHorses,
      });
      if (barnResponse?.data?.code === 200) {
        setOrderSummary(barnResponse?.data?.data);
        setCheck(barnResponse?.data?.data?.items ? false : true);
        setBarnRentalId(barnResponse?.data?.data?.rentId);
        setServiceRentId(barnResponse?.data?.data?.serviceRentId);
      } else {
        // toast.error(barnResponse.data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setOrderSummaryLoading(false);
    }
  };

  useEffect(() => {
    if (isBarn) {
      getAllHorses();
    } else {
      getAllAddress();
    }
    // getAllCoupon();
  }, []);

  useEffect(() => {
    if (rental) {
      getRentalSummary();
    } else if (service) {
      GetServicePurchaseSummary();
    } else if (isBarn) {
      getBarnSummary();
    } else {
      getOrderSummary();
    }
  }, [selectedAddressId, selectedDays, selectedHorses]);
  ``;
  const handleRadioChange = (event) => {
    setSelectedAddressId(event);
  };

  const handleHorseChange = (event) => {
    const horseId = event.target.value;

    const isSelected = selectedHorses.includes(horseId);

    if (isSelected) {
      const filteredHorses = selectedHorses.filter((id) => id != horseId);
      setSelectedHorses(filteredHorses);
    } else {
      setSelectedHorses([...selectedHorses, horseId]);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSelectChange = (option) => {
    setSelectedDays(option);
  };
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
    setSelectedDate(formattedDate);
  }, []);

  return (
    <Box minH={"90vh"}>
      {!check ? (
        <Box pos={"relative"}>
          <ProductBanner
            BannerImage={BannerImg}
            Heading={"Check-Out"}
            Breadcrumb={"Home Product Check-out"}
          />
          <Box mx={2}>
            <Text
              mx={2}
              mt={4}
              fontWeight={"600"}
              fontSize={{ base: "20px", md: "20px" }}
              textColor={"black"}
              mb={2}
            >
              Shipping Card
            </Text>
            <HStack
              mx={2}
              gap={"4"}
              m={"auto"}
              flexDir={{ base: "column", md: "row" }}
            >
              <Flex
                flexDir={"column"}
                gap={4}
                justify={"start"}
                alignSelf={"start"}
                p={4}
                w={{ base: "100%", md: "68%" }}
                bg={"white"}
                h={"fit-content"}
                // border={'1px solid #cccccc'}
                rounded={"8px"}
                // boxShadow={'md'}
              >
                <Box display={isBarn ? "none" : "block"}>
                  <Box
                    fontWeight={"700"}
                    // onClick={() => navigate(`/manage-address?checkOut=${true}?&rental=${rental}&quantity=${quantity}&productId=${productId}`)}
                    onClick={() => {
                      if (rental) {
                        navigate(
                          `/manage-address?checkOut=${true}?&rental=${rental}&quantity=${quantity}&productId=${productId}`
                        );
                      } else if (service) {
                        navigate(
                          `/manage-address?checkOut=${true}?&service=${service}&servicePurchaseDay=${servicePurchaseDay}&serviceId=${serviceId}`
                        );
                      } else {
                        navigate(`/manage-address?checkOut=${true}`);
                      }
                    }}
                    textColor={"#2b8f65"}
                    cursor={"pointer"}
                  >
                    + Add New Address
                  </Box>
                </Box>
                {loadingAddress || horseLoading ? (
                  <>
                    <Box
                      h={"60vh"}
                      display={"flex"}
                      justifyContent={"center"}
                      justifyItems={"center"}
                      alignItems={"center"}
                    >
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="#2b8f65"
                        size="xl"
                      />
                    </Box>
                  </>
                ) : (
                  <Box>
                    {allAddress?.length > 0 ? (
                      <Box
                        boxShadow={"md"}
                        p={1}
                        rounded={"md"}
                        border={"1px solid #cccccc"}
                        display={isBarn ? "none" : "flex"}
                        flexDirection={"column"}

                        // gap={3}
                      >
                        {allAddress?.map((item, index) => {
                          return (
                            <Box key={index} p={2} w={"100%"}>
                              <HStack
                                w={"100%"}
                                justifyContent={"space-between"}
                              >
                                <Box>
                                  <Text fontSize={"16px"} fontWeight={"bold"}>
                                    {item?.firstName} {item?.lastName}
                                  </Text>
                                  <Text
                                    fontSize={"14px"}
                                    noOfLines={2}
                                    textColor={"#222222"}
                                    fontFamily={"Sofia Sans"}
                                  >
                                    {item?.street},{item?.city},{item?.state},
                                    {item?.zipCode}
                                  </Text>
                                  <HStack>
                                    <RadioGroup
                                      value={selectedAddressId}
                                      onChange={handleRadioChange}
                                    >
                                      <Radio
                                        size="md"
                                        colorScheme="green"
                                        value={item.addressId}
                                        // isChecked={selectedAddressId === item.addressId}
                                      >
                                        Use as the shipping address
                                      </Radio>
                                    </RadioGroup>
                                  </HStack>
                                </Box>
                                <VStack>
                                  <Button
                                    onClick={() => {
                                      if (rental) {
                                        navigate(
                                          `/manage-address?id=${
                                            item.addressId
                                          }&checkOut=${true}?&rental=${rental}&quantity=${quantity}&productId=${productId}`
                                        );
                                      } else if (service) {
                                        navigate(
                                          `/manage-address?id=${
                                            item.addressId
                                          }&checkOut=${true}?&service=${service}&servicePurchaseDay=${servicePurchaseDay}&serviceId=${serviceId}`
                                        );
                                      } else {
                                        navigate(
                                          `/manage-address?id=${
                                            item.addressId
                                          }&checkOut=${true}`
                                        );
                                      }
                                    }}
                                    colorScheme="teal"
                                    variant={"outline"}
                                    gap={1}
                                    w={20}
                                    justify={"space-between"}
                                    cursor={"pointer"}
                                    fontWeight={"bold"}
                                    textColor={"#00a3e2"}
                                  >
                                    Edit
                                    <EditIcon />
                                  </Button>
                                  <DeleteAddressComponent
                                    getAllAddress={getAllAddress}
                                    item={item}
                                  />
                                </VStack>
                              </HStack>
                            </Box>
                          );
                        })}
                      </Box>
                    ) : (
                      <Box display={isBarn ? "none" : "flex"}>
                        No Address found
                      </Box>
                    )}

                    {!isBarn ? null : (
                      <Box
                        mt={2}
                        textColor={"#2b8f65"}
                        fontWeight={"600"}
                        onClick={() =>
                          navigate(
                            `/horse/register?isBarn=${true}&id=${barnId}`
                          )
                        }
                        fontSize={"18px"}
                        mb={2}
                        cursor={"pointer"}
                      >
                        + Add horse
                      </Box>
                    )}
                    <Box
                      p={"4"}
                      boxShadow={"md"}
                      rounded={"md"}
                      border={"1px solid #cccccc"}
                      display={horse?.length != 0 ? "block" : "none"}
                      flexDirection={"column"}
                      gap={3}
                    >
                      {horse &&
                        horse?.map((item, index) => {
                          return (
                            <Box key={index} p={2} w={"100%"}>
                              <HStack
                                w={"100%"}
                                justifyContent={"space-between"}
                              >
                                <Box>
                                  <HStack>
                                    <Text
                                      fontSize={"16px"}
                                      fontWeight={"normal"}
                                    >
                                      <b>Horse Name</b> : {item?.horseName},
                                    </Text>
                                    <Text
                                      fontSize={"16px"}
                                      fontWeight={"normal"}
                                    >
                                      <b>Breed Name</b> : {item?.horseBreed},
                                    </Text>
                                    <Text
                                      fontSize={"16px"}
                                      fontWeight={"normal"}
                                    >
                                      <b>Horse Age</b> : {item?.horseAge}
                                    </Text>
                                  </HStack>

                                  <HStack>
                                    <Checkbox
                                      size="md"
                                      colorScheme="green"
                                      value={item?.horseId}
                                      defaultChecked={selectedHorses.includes(
                                        item?.horseId
                                      )}
                                      onChange={handleHorseChange}
                                    >
                                      Associate this Horse with Barn
                                    </Checkbox>
                                  </HStack>
                                </Box>
                              </HStack>
                            </Box>
                          );
                        })}
                    </Box>
                  </Box>
                )}
                {rental || isBarn ? (
                  <HStack
                    p={4}
                    boxShadow={"md"}
                    rounded={"md"}
                    border={"1px solid #cccccc"}
                    flexDirection={"row"}
                    gap={3}
                  >
                    <FormControl>
                      <FormLabel>Select Date</FormLabel>
                      <Input
                        border="1px solid #79747E"
                        focusBorderColor="none"
                        bg="white"
                        value={selectedDate}
                        onChange={handleDateChange}
                        color="black"
                        outline="none"
                        placeholder="Select Date"
                        size="md"
                        type="date"
                      />
                      <FormErrorMessage>{""}</FormErrorMessage>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Duration</FormLabel>
                      <Select
                        value={selectedDays}
                        onChange={handleSelectChange}
                        options={options}
                        placeholder="Select duration"
                      />
                      <FormErrorMessage>{""}</FormErrorMessage>
                    </FormControl>
                  </HStack>
                ) : null}
              </Flex>

              <Flex
                alignSelf={"start"}
                flexDirection={"column"}
                gap={3}
                w={{ base: "100%", md: "380px" }}
                pb={10}
              >
                {/* <form onSubmit={ApplyCouponHandler}> */}
                <form>
                  <FormControl>
                    <FormLabel fontWeight={"bold"}>Apply Coupon Code</FormLabel>
                    <InputGroup
                      display={"flex"}
                      flexDir={"column"}
                      w={{ base: "100%", md: "100%" }}
                      size="md"
                      zIndex={9}
                    >
                      {/* <Input
                        pr="8.5rem"
                        color={"black"}
                        placeholder="Enter Here code"
                        focusBorderColor="none"
                        bg={"white"}
                        value={couponCode}
                        outline={"none"}
                        onChange={(e) => setCouponCode(e.target.value)}
                        w={"100%"}
                      /> */}
                      <Select
                        value={selectedCouponCode}
                        onChange={handleSelectCouponCode}
                        options={CouponOptions}
                        placeholder="Enter or Select Code"
                      />
                      <InputRightElement w={32}>
                        <Button
                          w={"100%"}
                          _hover={{ disable: true }}
                          type="submit"
                          colorScheme="#E537"
                          bg={"#2b8f65"}
                          isLoading={couponLoading}
                          isDisabled
                        >
                          Apply
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {showCoupon && (
                      <div style={{ marginTop: "10px", color: "green" }}>
                        You saved {selectedCouponCode.discount}
                        {selectedCouponCode.discountType === "percent"
                          ? "%"
                          : " $"}
                        !
                      </div>
                    )}
                  </FormControl>
                </form>
                <Flex
                  alignSelf={"start"}
                  flexDirection={"column"}
                  gap={3}
                  p={4}
                  boxShadow={"md"}
                  borderRadius={"10px"}
                  w={{ base: "100%", md: "380px" }}
                  // h={"480px"}
                  bg={"#F0F0F0"}
                >
                  <Text
                    mt={3}
                    mb={4}
                    fontSize={"20px"}
                    fontWeight={"600"}
                    textColor={"#000000"}
                  >
                    Order Summary
                  </Text>
                  <HStack
                    justifyContent={"space-between"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                    textColor={"#575757"}
                  >
                    <Text>
                      {!service ? "Items" : "Days"} ({orderSummary?.items})
                    </Text>
                    {orderSummaryLoading ? (
                      <LoadingText />
                    ) : (
                      <>
                        <Text>$ {orderSummary?.totalPrice}</Text>
                      </>
                    )}
                  </HStack>
                  {orderSummary?.couponDiscount ? (
                    <HStack
                      justifyContent={"space-between"}
                      fontSize={"16px"}
                      fontWeight={"600"}
                      textColor={"#575757"}
                    >
                      <Text>Coupon Discount</Text>
                      {orderSummaryLoading ? (
                        <LoadingText />
                      ) : (
                        <>
                          <Text>$ {orderSummary?.couponDiscount}</Text>
                        </>
                      )}
                    </HStack>
                  ) : null}

                  <HStack
                    justifyContent={"space-between"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                    display={isBarn ? "none" : "flex"}
                    textColor={"#575757"}
                  >
                    <Text>Shipping and handling:</Text>
                    {orderSummaryLoading ? (
                      <LoadingText />
                    ) : (
                      <Text> $ {orderSummary?.shipping}</Text>
                    )}
                  </HStack>
                  <Flex flexDir={"column"} justify={"space-between"} h={"90%"}>
                    <Box>
                      {/* <HStack
                        justifyContent={"space-between"}
                        fontSize={"16px"}
                        display={isBarn ? "none" : "flex"}

                        fontWeight={"600"}
                        textColor={"#575757"}
                      >
                        <Text>Before tax:</Text>
                        {orderSummaryLoading ? (
                          <LoadingText />
                        ) : (
                          <Text>
                            {"$"} {orderSummary?.beforeTex}
                          </Text>
                        )}
                      </HStack> */}
                      {/* <HStack
                        justifyContent={"space-between"}
                        fontSize={"16px"}
                        fontWeight={"600"}
                        textColor={"#575757"}
                      >
                        <Text>Tax Collected:</Text>
                        {orderSummaryLoading ? (
                          <LoadingText />
                        ) : (
                          <Text> $ {orderSummary?.taxCollected}</Text>
                        )}
                      </HStack> */}
                      <Divider zIndex={"0"} border={"1px solid #cccccc"} />
                    </Box>
                    <HStack
                      mt={4}
                      justifyContent={"space-between"}
                      fontSize={"16px"}
                      fontWeight={"600"}
                      textColor={"#575757"}
                    >
                      <Text
                        fontSize={"20px"}
                        fontWeight={"600"}
                        textColor={"#000000"}
                      >
                        Order Total:
                      </Text>
                      {orderSummaryLoading ? (
                        <LoadingText />
                      ) : (
                        <Text
                          fontSize={"20px"}
                          fontWeight={"600"}
                          textColor={"#000000"}
                        >
                          $ {orderSummary?.orderTotal}
                        </Text>
                      )}
                    </HStack>
                  </Flex>

                  <Text
                    mt={4}
                    fontSize={"14px"}
                    fontWeight={"600"}
                    textColor={"#575757"}
                  >
                    By placing your order, you agree to our company Privacy
                    policy and Conditions of use.
                  </Text>

                  <Button
                    isDisabled={orderSummaryLoading}
                    isLoading={paymentLoading}
                    onClick={() => {
                      if (rental) {
                        RentalPaymentHandler();
                      } else if (service) {
                        ServicePaymentHandler();
                      } else if (isBarn) {
                        BarnPaymentHandler();
                      } else {
                        PaymentHandler();
                      }
                    }}
                    mt={10}
                    w={"full"}
                    variant={"outline"}
                    textColor={"white"}
                    border={"none"}
                    colorScheme=""
                    _hover={{ bg: "#176b46" }}
                    bg={"#2b8f65"}
                  >
                    Place Order
                    <ArrowForwardIcon ml={3} />
                  </Button>
                </Flex>
              </Flex>
            </HStack>
          </Box>
        </Box>
      ) : (
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
          display={"flex"}
          flexDir={"column"}
          p={4}
        >
          <Image
            w={{ base: "60%", md: "20%" }}
            m={"auto"}
            src={noCardFound}
            alt="no data found"
          />
          <Button
            mt={"10"}
            w={{ md: "20%", base: "50%" }}
            onClick={() => {
              navigate("/products");
            }}
            borderRadius={"none"}
            colorScheme="#E537"
            bg={"#2b8f65"}
          >
            Continue Shopping
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Index;

const LoadingText = () => {
  return (
    <SkeletonText
      rounded={"full"}
      w={"28"}
      mt="4"
      noOfLines={1}
      spacing="4"
      skeletonHeight="2"
    />
  );
};
const DeleteAddressComponent = ({ item, getAllAddress }) => {
  const addressApi = new AddressApi();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddressHandler = async (addressId) => {
    setLoadingDelete(true);
    try {
      const Response = await addressApi.deleteAddress({
        addressId,
      });
      if (Response?.data?.code === 200) {
        toast.success(Response?.data?.message);
        getAllAddress();
      } else {
        toast.error(Response?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingDelete(false);
    }
  };
  return (
    <Button
      gap={1}
      colorScheme="teal"
      variant={"outline"}
      isLoading={loadingDelete}
      onClick={() => deleteAddressHandler(item.addressId)}
      w={20}
      justify={"space-between"}
      cursor={"pointer"}
      fontWeight={"bold"}
      textColor={"#ff7f7f"}
    >
      Delete
      <DeleteIcon />
    </Button>
  );
};
