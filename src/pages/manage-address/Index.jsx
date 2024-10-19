import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Image,
  HStack,
  Button,
  RadioGroup,
  Radio,
  VStack,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { ProfileSideBarComponent } from "../../components/profileSideBarComponent/Index";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import statesData from "../../../json/provinantCode.json";
import {
  ArrowForwardIcon,
  DeleteIcon,
  EditIcon,
  SmallAddIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import AddressApi from "../../apis/address.api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { manageAddress } from "../../redux/redux-slice/others.slice";

function Index() {
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressActive, setAddressActive] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.other.ManageAddress);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const rental = searchParams.get("rental");
  const service = searchParams.get("service");
  const serviceId = searchParams.get("serviceId");
  const checkOut = searchParams.get("checkOut");
  const servicePurchaseDay = searchParams.get("servicePurchaseDay");
  const navigate = useNavigate();
  const addressApi = new AddressApi();

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
    stateOrProvinceCode: "",
  };
  
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const CartData = useSelector((state) => state.cart.Cart);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  //     console.log(formData, "formData");
  //   validateInput(name, value);
  // };

 
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      const selectedState = statesData.find(state => state.name === value);
      if (selectedState) {
        setFormData(prevData => ({
          ...prevData,
          state: selectedState.name, 
          stateOrProvinceCode: selectedState.abbreviation
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
    console.log(formData, "formData");
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
          if (!/^\d{5}$/.test(value)) {
            error = "zipCode code must be 5 digits";
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
  const SubmitHandler = async (e) => {
    console.log("click");
    e.preventDefault();
    try {
      setLoading(true);
      console.log("click");
      const response = await addressApi.addAddress(formData);
      if (response.data.code === 200) {
        toast.success(response.data.message);
        setLoading(false);
        setAddressActive(false);
        getAllAddress();
        setFormData(initialState);
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
      console.log("click");
    }
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
        stateOrProvinceCode: formData.stateOrProvinceCode,
      });
      if (response.data.code === 200) {
        toast.success(response.data.message);
        setLoading(false);
        getAllAddress();
        setAddressActive(!addressActive);
        setFormData(initialState);
        if (rental) {
          navigate(
            `/manage-address?checkOut=${true}&rental=${rental}&quantity=${quantity}&productId=${productId}`
          );
        } else if (service) {
          navigate(
            `/manage-address?checkOut=${true}&service=${service}&servicePurchaseDay=${servicePurchaseDay}&serviceId=${serviceId}`
          );
        } else {
          navigate(`/manage-address?checkOut=${true}`);
        }
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
    setAddressLoading(true);
    try {
      const response = await addressApi.getAllAddress();
      if (response.data.code === 200) {
        dispatch(manageAddress(response.data.data));
        setSelectedAddressId(response?.data?.data[0]?.addressId);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setAddressLoading(false);
    }
  };

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
        toast.error(response.data.message);
        navigate("/manage-address");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  // useEffect(() => {
  //   getAllAddress()
  // }, [])

  useEffect(() => {
    if (data.length === 0) {
      getAllAddress();
    }
  }, [data.length]);
  useEffect(() => {
    if (id) {
      getAddressHandler(id);
      setAddressActive(true);
    } else {
      // navigate('/manage-address')
      setAddressActive(false);
      setFormData(initialState);
    }
  }, [id]);
  const handleRadioChange = (event) => {
    setSelectedAddressId(event);
  };

  return (
    <Box minH={"80vh"} pos={"relative"}>
      <HStack
        flexDir={{ base: "column", lg: "row" }}
        w={{ base: "98%", lg: "95%" }}
        m={"auto"}
        pb={10}
      >
        <Box display={{ base: "none", lg: "contents" }}>
          <ProfileSideBarComponent />
        </Box>
        <Flex
          mt={4}
          w={{ base: "100%", lg: "100%" }}
          h={{ base: "fit-content", xl: "640px" }}
          bg={"white"}
          border={"1px solid #cccccc"}
          rounded={"md"}
          boxShadow={"md"}
          flexDir={"column"}
          gap={2}
        >
          <Flex p={{ base: "4", md: "4" }} gap={2} flexDirection={"column"}>
            <HStack w={"100%"} justify={"space-between"}>
              <Heading
                w={"80%"}
                fontSize={"20px"}
                fontWeight={"500"}
                className="pc1"
                primary={"primary"}
              >
                Manage Address
              </Heading>
              <Box display={{ lg: "none" }}>
                <ProfileSideBarComponent />
              </Box>
            </HStack>
            <Flex
              flexDir={"column"}
              gap={4}
              justify={"start"}
              alignSelf={"start"}
              w={{ base: "100%", md: "100%" }}
              bg={"white"}
            >
              <>
                {!id ? (
                  <>
                    <Box
                      cursor={"pointer"}
                      display={data.length <= 0 ? "none" : "block"}
                      onClick={() => setAddressActive(!addressActive)}
                      fontWeight={"600"}
                      textColor={"#2b8f65"}
                    >
                      {" "}
                      <SmallAddIcon fontSize={20} /> Add New Address
                    </Box>

                    {/* // <CustomCheckbox display={allAddress.length <= 0 ? "none" : "block"} isChecked={addressActive} setIsChecked={() => setAddressActive(!addressActive)}>
                    //   {"Add New Address"}
                    // </CustomCheckbox> */}
                  </>
                ) : (
                  <Box fontWeight={"600"} textColor={"#2b8f65"}>
                    Update Address
                  </Box>
                )}
                <Box
                  display={!data.length <= 0 ? "none" : "block"}
                  fontWeight={"600"}
                  textColor={"#2b8f65"}
                >
                  Add New Address
                </Box>
              </>

              <Box
                display={
                  addressLoading || (!data.length <= 0 && !addressActive)
                    ? "none"
                    : "inline-block"
                }
              >
                <form onSubmit={!id ? SubmitHandler : UpdateHandler}>
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
                      {errors.firstName && <span>{errors.firstName}</span>}
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
                      {errors.lastName && <span>{errors.lastName}</span>}
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
                      {errors.email && <span>{errors.email}</span>}
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
                      {errors.contact && <span>{errors.contact}</span>}
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
                    {errors.street && <span>{errors.street}</span>}
                  </FormControl>
                  {/* <FormControl isRequired isInvalid={errors.StateOrProvinceCode}>
                    <FormLabel>Province Code</FormLabel>
                    <Input
                      name='provinceCode'
                      value={formData.StateOrProvinceCode}
                      onChange={handleChange}
                      w='100%'
                      color='black'
                      type='text'
                      placeholder='State Province Code Select'
                      focusBorderColor='none'
                      bg='white'
                      outline='none'
                    />
                    {errors.StateOrProvinceCode && <span>{errors.StateOrProvinceCode}</span>}
                  </FormControl> */}
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
                      {errors.city && <span>{errors.city}</span>}
                    </FormControl>

                    {/* <FormControl isRequired isInvalid={errors.state}>
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
                      {errors.state && <span>{errors.state}</span>}
                    </FormControl> */}

                    {/* <FormControl isRequired isInvalid={errors.state}>
                      <FormLabel>State Name </FormLabel>
                      <Select
                        name="state"
                        value={formData.state} // Using province abbreviation for value
                        onChange={handleChange}
                        w="100%"
                        color="black"
                        placeholder="Select a state"
                        bg="white"
                        focusBorderColor="none"
                        _focus={{ boxShadow: "none" }}
                        maxHeight="600px"
                        overflowY="auto"
                      >
                        {statesData.map((state) => (
                          <option
                            key={state.abbreviation}
                            value={state.name}
                          >
                            {state.name}
                          </option>
                        ))}
                      </Select>
                      {errors.state && <span>{errors.state}</span>}
                    </FormControl> */}
                   <FormControl isRequired isInvalid={errors.state}>
                    <FormLabel>State Name</FormLabel>
      <Select
        name='state'
        value={formData.province} // Using province abbreviation for value
        onChange={handleChange}
        w='100%'
        color='black'
        placeholder='Select a state'
        bg='white'
        focusBorderColor='none'
        _focus={{ boxShadow: 'none' }}
        maxHeight='600px'
        overflowY='auto'
      >
        {statesData.map((state) => (
          <option key={state.abbreviation} value={state.name}>
            {state.name}
          </option>
        ))}
      </Select>
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
                      {errors.country && <span>{errors.country}</span>}
                    </FormControl>
                    <FormControl isRequired isInvalid={errors.zipCode}>
                      <FormLabel>Zip code</FormLabel>
                      <Input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        w="100%"
                        color="black"
                        type="tel"
                        placeholder="zipCode Code"
                        minLength={5}
                        maxLength={5}
                        focusBorderColor="none"
                        bg="white"
                        outline="none"
                      />
                      {errors.zipCode && <span>{errors.zipCode}</span>}
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
                          if (rental) {
                            navigate(
                              `/manage-address?checkOut=${true}?&rental=${rental}&quantity=${quantity}&productId=${productId}`
                            );
                          } else if (service) {
                            navigate(
                              `/manage-address?checkOut=${true}?&service=${service}&servicePurchaseDay=${servicePurchaseDay}&serviceId=${serviceId}`
                            );
                          } else {
                            navigate(`/manage-address?checkOut=${true}?`);
                          }
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
              {addressLoading ? (
                <HStack
                  w="100%"
                  h="60vh"
                  justifyContent="center"
                  alignItems="center"
                  justify="center"
                >
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#2b8f65"
                    size="xl"
                  />
                </HStack>
              ) : (
                <Box
                  display={addressActive ? "none" : "inline-block"}
                  flexDirection={"column"}
                  gap={3}
                >
                  {data &&
                    data?.map((item, index) => {
                      return (
                        <ViewAddressComponent
                          item={item}
                          key={index}
                          setAddressActive={setAddressActive}
                          selectedAddressId={selectedAddressId}
                          getAllAddress={getAllAddress}
                          handleRadioChange={handleRadioChange}
                        />
                      );
                    })}
                </Box>
              )}
            </Flex>
          </Flex>

          {checkOut && (
            <Button
              onClick={() => {
                if (rental) {
                  navigate(
                    `/check-out?&rental=${rental}&quantity=${quantity}&productId=${productId}`
                  );
                } else if (service) {
                  navigate(
                    `/check-out?&service=${service}&servicePurchaseDay=${servicePurchaseDay}&serviceId=${serviceId}`
                  );
                } else {
                  navigate(`/check-out?`);
                }
              }}
              variant={"outline"}
              textColor={"#2B8F65"}
              colorScheme="blue"
              pos={"absolute"}
              bottom={20}
              right={20}
            >
              {" "}
              Checkout Now {""} <ArrowForwardIcon ml={2} />{" "}
            </Button>
          )}
        </Flex>
      </HStack>
    </Box>
  );
}

export default Index;

const ViewAddressComponent = ({
  item,
  addressActive,
  setAddressActive,
  selectedAddressId,
  handleRadioChange,
  getAllAddress,
}) => {
  const navigate = useNavigate();

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

  return (
    <Box p={2} borderBottom={"1px solid #cccccc"} w={"100%"}>
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
            {item.street},{item.city},{item.state},{item.zipCode}
          </Text>
          <HStack>
            <RadioGroup value={selectedAddressId} onChange={handleRadioChange}>
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
              navigate(`/manage-address/?id=${item.addressId}`);
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
          <Button
            gap={1}
            colorScheme="teal"
            variant={"outline"}
            isDisabled={loadingDelete}
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
        </VStack>
      </HStack>
    </Box>
  );
};
