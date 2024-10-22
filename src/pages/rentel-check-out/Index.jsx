import React from "react";
import {
  Box,
  Text,
  HStack,
  FormControl,
  FormLabel,
  Image,
  Select,
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
import { CustomCheckbox } from "../../components/shared/custom design/Index";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CheckOutApi from "../../apis/checkout.api";
import CartApi from "../../apis/cart.api";
function Index() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [orderSummaryLoading, setOrderSummaryLoading] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [allAddress, setAllAddress] = useState([]);
  const [orderSummary, setOrderSummary] = useState();
  const [addressActive, setAddressActive] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // const [id, setId] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  // setId(searchParams.get('id'))
  const navigate = useNavigate();
  const addressApi = new AddressApi();
  const checkOutApi = new CheckOutApi();
  const cartApi = new CartApi();
  const handleSelect = (name) => {
    setSelectedOption(name);
  };
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate input
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else {
      switch (name) {
        case "email":
          if (!/\S+@\S+\.\S+/.test(value)) {
            error = "Invalid email address";
          }
          break;
        case "contact":
          if (!/^\d{10}$/.test(value)) {
            error = "Mobile number must be 10 digits";
          }
          break;
        case "zipCode":
          if (!/^\d{6}$/.test(value)) {
            error = "zipCode code must be 6 digits";
          }
          break;

        default:
          break;
      }
    }
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const SumbitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await addressApi.addAddress(formData);
      if (response.data.code === 200) {
        toast.success(response.data.message);
        setLoading(false);
        setAddressActive(false);
        getAllAddress();
        setFormData(initialState);
      } else {
        toast.error(
          response?.data?.message ? response.data.message : "not found"
        );
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  // const ApplyCouponHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setCouponLoading(true);
  //     const response = await checkOutApi.applyCoupon({
  //       couponCode,
  //     });
  //     if (response.data.code === 200) {
  //       toast.success(response.data.message);
  //       getOrderSummary();
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error);
  //   } finally {
  //     setCouponLoading(false);
  //     setCouponCode("");
  //   }
  // };

  const resetCartHandler = async () => {
    try {
      const resetCartResponse = await cartApi.resetCart();
      if (resetCartResponse?.data?.code === 200) {
      } else {
        toast.error(resetCartResponse?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getOrderSummary = async () => {
    setOrderSummaryLoading(true);
    console.log("getOrderSummary calling outer");

    if (selectedAddressId !== null || selectedAddressId === undefined || selectedAddressId === '') {
      console.log("getOrderSummary calling inner");
      try {
        const Response = await checkOutApi.getOrderSummary({
          couponCode,
          addressId: selectedAddressId,
        });
        if (Response?.data?.code === 200) {
          setOrderSummary(Response?.data?.data);
        } else {
          toast.error(Response?.data?.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setOrderSummaryLoading(false);
      }
    }
    // try {
    //   const Response = await checkOutApi.getOrderSummary({
    //     couponCode,
    //     addressId: selectedAddressId,
    //   });
    //   if (Response?.data?.code === 200) {
    //     setOrderSummary(Response?.data?.data);
    //     console.log(Response?.data?.data <= 0);
    //   } else {
    //     toast.error(Response?.data?.message);
    //   }
    // } catch (error) {
    //   toast.error(error);
    // } finally {
    //   setOrderSummaryLoading(false);
    // }
  };

  const UpdateHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await addressApi.updateAddress({
        city: formData.city,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        zipCode: formData.zipCode,
        country: formData.country,
        state: formData.state,
        street: formData.street,
        contact: formData.contact,
        addressId: id,
      });
      if (response.data.code === 200) {
        toast.success(response.data.message);
        setLoading(false);
        getAllAddress();
        setAddressActive(!addressActive);
        setFormData(initialState);
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const getAllAddress = async () => {
    setLoadingAddress(true);
    try {
      const response = await addressApi.getAllAddress();
      if (response.data.code === 200) {
        setAllAddress(response.data.data);
        setSelectedAddressId(response?.data?.data[0]?.addressId);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingAddress(false);
    }
  };

  const deleteAddressHandler = async (addressId) => {
    setLoadingDelete(true);
    try {
      const response = await addressApi.deleteAddress({
        addressId,
      });
      if (response.data.code === 200) {
        toast.success(response.data.message);
        getAllAddress();
        setLoadingDelete(false);
      } else {
        toast.error(response.data.message);
        setLoadingDelete(false);
      }
    } catch (error) {
      toast.error(error);
      setLoadingDelete(false);
    }
  };
  // if (id) {
  //     formData.append('addressId', id)
  // }

  const getAddressHandler = async (addressId) => {
    try {
      const response = await addressApi.getAddress({
        addressId,
      });
      if (response.data.code === 200) {
        const e = response.data.data;
        setFormData({
          city: e.city,
          firstName: e.firstName,
          lastName: e.lastName,
          email: e.email,
          zipCode: e.zipCode,
          country: e.country,
          state: e.state,
          street: e.street,
          contact: e.contact,
        });
      } else {
        toast.error(response?.data?.message);
        // navigate("/check-out");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const PaymentHandler = async () => {
    if (selectedAddressId === undefined || selectedAddressId === null) {
      return toast.error("Please select or Add New  Address");
    }
    setPaymentLoading(true);
    try {
      const Paymentresponse = await checkOutApi.createOrder({
        addressId: selectedAddressId,
      });
      if (Paymentresponse.data.code === 200) {
        // toast.success(Paymentresponse.data.message);
        resetCartHandler();
        window.open(Paymentresponse.data.data.data.url);
      } else {
        toast.error(Paymentresponse.data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setPaymentLoading(false);
    }
  };

  useEffect(() => {
    getAllAddress();
    getOrderSummary();
    console.log("getOrderSummary calling");
  }, [selectedAddressId]);
  useEffect(() => {
    if (id) {
      getAddressHandler(id);
      setAddressActive(true);
    } else {
      // navigate("/check-out");
      setAddressActive(false);
      setFormData(initialState);
    }
  }, [id]);
  // const TotalPrice = orderSummary?.totalPrice
  // console.log(orderSummary);

  const handleRadioChange = (event) => {
    setSelectedAddressId(event);
  };

  return (
    <Box pos={"relative"}>
      <ProductBanner
        BannerImage={BannerImg}
        Heading={"Check-Out"}
        Breadcrumb={"Home Product Check-out"}
      />
      <Box mx={2}>
        <Text
          mx={2}
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
            <Box>
              {!id ? (
                <CustomCheckbox
                  display={allAddress.length <= 0 ? "none" : "block"}
                  isChecked={addressActive}
                  setIsChecked={() => setAddressActive(!addressActive)}
                >
                  {"Add New Address"}
                </CustomCheckbox>
              ) : (
                <Box fontWeight={"600"} textColor={"#2b8f65"}>
                  Update Address
                </Box>
              )}
              <Box
                display={!allAddress.length <= 0 ? "none" : "block"}
                fontWeight={"600"}
                textColor={"#2b8f65"}
              >
                Add New Address
              </Box>
            </Box>

            {loadingAddress ? (
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
              <Box
                p={addressActive ? "4" : 0}
                boxShadow={"md"}
                rounded={"md"}
                border={"1px solid #cccccc"}
                display={addressActive ? "none" : "inline-block"}
                flexDirection={"column"}
                gap={3}
              >
                {allAddress &&
                  allAddress?.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        p={2}
                        borderTop={index >= 1 ? "1px solid #cccccc" : ""}
                        w={"100%"}
                      >
                        <HStack w={"100%"} justifyContent={"space-between"}>
                          <Box>
                            <Text fontSize={"16px"} fontWeight={"bold"}>
                              {item.firstName} {item.lastName}
                            </Text>
                            <Text
                              fontSize={"14px"}
                              noOfLines={2}
                              textColor={"#222222"}
                              fontFamily={"Sofia Sans"}
                            >
                              {item.street},{item.city},{item.state},
                              {item.zipCode}
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
                                setAddressActive(!addressActive);
                                navigate(`/check-out/?id=${item.addressId}`);
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
            )}

            <Box
              display={
                loadingAddress || (!allAddress.length <= 0 && !addressActive)
                  ? "none"
                  : "inline-block"
              }
            >
              <form onSubmit={!id ? SumbitHandler : UpdateHandler}>
                <Flex flexDir={{ base: "column", md: "row" }} gap={4}>
                  <FormControl isRequired isInvalid={errors.firstName}>
                    <FormLabel>First name</FormLabel>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      w="100%"
                      color="black"
                      placeholder="First Name"
                      focusBorderColor="none"
                      bg="white"
                      outline="none"
                    />
                    {errors.firstName && (
                      <Text as={"span"} textColor={"red"}>
                        {errors.firstName}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl isRequired isInvalid={errors.lastName}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      w="100%"
                      color="black"
                      placeholder="Last Name"
                      focusBorderColor="none"
                      bg="white"
                      outline="none"
                    />
                    {errors.lastName && (
                      <Text as={"span"} textColor={"red"}>
                        {errors.lastName}
                      </Text>
                    )}
                  </FormControl>
                </Flex>
                <Flex flexDir={{ base: "column", md: "row" }} gap={4}>
                  <FormControl isRequired isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      w="100%"
                      color="black"
                      type="email"
                      placeholder="Email"
                      focusBorderColor="none"
                      bg="white"
                      outline="none"
                    />
                    {errors.email && (
                      <Text as={"span"} textColor={"red"}>
                        {errors.email}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl isRequired isInvalid={errors.contact}>
                    <FormLabel>Mobile Number</FormLabel>
                    <Input
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      w="100%"
                      color="black"
                      type="tel"
                      placeholder="Mobile Number"
                      minLength={10}
                      maxLength={10}
                      focusBorderColor="none"
                      bg="white"
                      outline="none"
                    />
                    {errors.contact && (
                      <Text as={"span"} textColor={"red"}>
                        {errors.contact}
                      </Text>
                    )}
                  </FormControl>
                </Flex>
                <FormControl isRequired isInvalid={errors.street}>
                  <FormLabel>Street Address</FormLabel>
                  <Input
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    w="100%"
                    color="black"
                    type="text"
                    placeholder="Street Address"
                    focusBorderColor="none"
                    bg="white"
                    outline="none"
                  />
                  {errors.street && (
                    <Text as={"span"} textColor={"red"}>
                      {errors.street}
                    </Text>
                  )}
                </FormControl>
                <Flex flexDir={{ base: "column", md: "row" }} gap={4}>
                  <FormControl isRequired isInvalid={errors.city}>
                    <FormLabel>City Name</FormLabel>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      w="100%"
                      color="black"
                      type="text"
                      placeholder="City Name"
                      focusBorderColor="none"
                      bg="white"
                      outline="none"
                    />
                    {errors.city && (
                      <Text as={"span"} textColor={"red"}>
                        {errors.city}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl isRequired isInvalid={errors.state}>
                    <FormLabel>State Name</FormLabel>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      w="100%"
                      color="black"
                      type="text"
                      placeholder="State Name"
                      focusBorderColor="none"
                      bg="white"
                      outline="none"
                    />
                    {errors.state && (
                      <Text as={"span"} textColor={"red"}>
                        {errors.state}
                      </Text>
                    )}
                  </FormControl>
                </Flex>
                <Flex flexDir={{ base: "column", md: "row" }} gap={4}>
                  <FormControl isRequired isInvalid={errors.state}>
                    <FormLabel>Country Name</FormLabel>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      w="100%"
                      color="black"
                      type="text"
                      placeholder="Country Name"
                      focusBorderColor="none"
                      bg="white"
                      outline="none"
                    />
                    {errors.country && (
                      <Text as={"span"} textColor={"red"}>
                        {errors.country}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl isRequired isInvalid={errors.zipCode}>
                    <FormLabel>zipCode</FormLabel>
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      w="100%"
                      color="black"
                      type="tel"
                      placeholder="zipCode Code"
                      minLength={6}
                      maxLength={6}
                      focusBorderColor="none"
                      bg="white"
                      outline="none"
                    />
                    {errors.zipCode && (
                      <Text as={"span"} textColor={"red"}>
                        {errors.zipCode}
                      </Text>
                    )}
                  </FormControl>
                </Flex>
                {/* <Checkbox my={4} defaultChecked>
                                    Ship to different address
                                </Checkbox> */}
                <HStack my={8}>
                  <Button
                    w={40}
                    variant="outline"
                    outline="none"
                    onClick={() => {
                      if (id) {
                        navigate("/check-out");
                      } else {
                        setAddressActive(!addressActive);
                      }
                    }}
                    colorScheme=""
                    bg="none"
                  >
                    {id ? "Go back" : "Cancel"}
                  </Button>
                  <Button
                    isLoading={loading}
                    w={80}
                    variant="outline"
                    textColor="white"
                    border="none"
                    colorScheme=""
                    _hover={{ bg: "#196644" }}
                    bg="#2b8f65"
                    type="submit"
                  >
                    {!id ? " Save this Address" : "Update"}
                  </Button>
                </HStack>
              </form>
            </Box>

            {/* <Box p={4} boxShadow={'md'} rounded={'md'} border={'1px solid #cccccc'} flexDirection={'column'} gap={3}>
                            <Text as={'h2'} fontWeight={'600'}
                                fontSize={{ base: "20px", md: "20px" }}
                                textColor={'black'}>Rent Duration</Text>
                            <Box gap={4} display={'flex'} flexDir={{base:"column",lg:"row"}} textAlign={'start'}>
                                <FormControl >
                                    <FormLabel>Select Date</FormLabel>
                                    <Input
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        defaultValue={''}
                                        color="black"
                                        outline="none" placeholder='Select Date' size='md' type='date' />
                                    <FormErrorMessage>{''}</FormErrorMessage>
                                </FormControl>
                                <FormControl >
                                    <FormLabel>Months</FormLabel>
                                    <Select
                                        name="selectDate"
                                        // value={formData.visaSponsorship}
                                        // onChange={handleChange}
                                        placeholder='Select option'
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        defaultValue={'6months'}
                                        color="black"
                                        outline="none"
                                    >
                                        <option value='12months'>12 months</option>
                                        <option value='6months'>6 months</option>
                                        <option value='3months'>3 months</option>
                                        <option value='1months'>1 months</option>
                                        <option value='7days'>7 Days</option>
                                    </Select>
                                    <FormErrorMessage>{''}</FormErrorMessage>
                                </FormControl>
                            </Box>
                        </Box> */}
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
                >
                  <Input
                    pr="8.5rem"
                    color={"black"}
                    placeholder="Enter Here code"
                    focusBorderColor="none"
                    bg={"white"}
                    value={couponCode}
                    outline={"none"}
                    onChange={(e) => setCouponCode(e.target.value)}
                    w={"100%"}
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
              h={"480px"}
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
                <Text>Items ({orderSummary?.items})</Text>
                {orderSummaryLoading ? (
                  <LoadingText />
                ) : (
                  <Text>$ {orderSummary?.orderTotal}</Text>
                )}
              </HStack>
              <HStack
                justifyContent={"space-between"}
                fontSize={"16px"}
                fontWeight={"600"}
                textColor={"#575757"}
              >
                <Text>Shipping and handling:</Text>
                {orderSummaryLoading ? (
                  <LoadingText />
                ) : (
                  <Text> $ {orderSummary?.shipping}</Text>
                )}
              </HStack>
              {/* <HStack
                justifyContent={"space-between"}
                fontSize={"16px"}
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
              </HStack>
              <Divider border={"1px solid #cccccc"} /> */}
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
                    $ {orderSummary?.totalPrice}
                  </Text>
                )}
              </HStack>
              <Text
                mt={4}
                fontSize={"14px"}
                fontWeight={"600"}
                textColor={"#575757"}
              >
                By placing your order, you agree to our company Privacy policy
                and Conditions of use.
              </Text>

              <Button
                isDisabled={orderSummaryLoading}
                isLoading={paymentLoading}
                onClick={() => {
                  PaymentHandler();
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
      const response = await addressApi.deleteAddress({
        addressId,
      });
      if (response.data.code === 200) {
        toast.success(response.data.message);
        getAllAddress();
      } else {
        toast.error(response.data.message);
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
