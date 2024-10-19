import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Link,
  HStack,
  Select,
  Flex,
  InputGroup,
} from "@chakra-ui/react";

import statesData from "../../../json/provinantCode.json";

import {
  CustomCheckbox,
  MainSubHeading,
} from "../../components/shared/custom design/Index";

import { EmailIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateUser, updateToken } from "../../redux/redux-slice/user.slice";
import Auth from "../../apis/auth/auth.api";
import OtherApi from "../../apis/other.api";
import BarnApi from "../../apis/barn.api";
import PhoneInput from "@quantfive/react-phone-input-2";
import { getUserLocal } from "../../utils/localStorage.util";

function Index() {
  
  const dispatch = useDispatch();
  const otherApi = new OtherApi();
  const barnApi = new BarnApi();
  const data = useSelector((state) => state.user.v_user_info);
  const userData = getUserLocal()
  console.log(data,'userData',userData);
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState({
    stateName: '',
    stateOrProvinceCode: ''
  });
  const [type, setType] = useState("");
  const [typeError, setTypeError] = useState("");

  const [fullName, setFullName] = useState(userData?.firstName + " " +userData?.lastName );
  const [fullNameError, setFullNameError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState((userData?.contact?.toString()) || "");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [email, setEmail] = useState(userData?.email || "");
  const [emailError, setEmailError] = useState("");

  const [stateOrProvinceCode, setStateOrProvinceCode] = useState("");

  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [pinCode, setPinCode] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");

  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsAgreedError, setTermsAgreedError] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");

  const [businessAddress, setBusinessAddress] = useState("");
  const [businessAddressError, setBusinessAddressError] = useState("");

  const [homeAddress, setHomeAddress] = useState("");
  const [homeAddressError, setHomeAddressError] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingAddressError, setShippingAddressError] = useState("");

  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupAddressError, setPickupAddressError] = useState("");

  const [barnList, setBarnList] = useState([]);
  const [barnAssociate, setBarnAssociate] = useState([]);

  const serviceProvider = type === "serviceProvider";
  const BarnOwner = type === "BarnOwner";
  const productSeller = type === "productSeller";

  useEffect(() => {
    console.log(userData, "userData");
  }, []);

  const validateType = () => {
    setTypeError(type ? "" : "Type is required");
    return !!type;
  };

  const validateFullName = () => {
    setFullNameError(fullName ? "" : "Full Name is required");
    return !!fullName;
  };

  const validatePhoneNumber = () => {
    setPhoneNumberError(
      phoneNumber.length === 10 ? "" : "Phone Number must be 10 digits"
    );
    return phoneNumber.length === 10;
  };

  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailError(isValid ? "" : "Please enter a valid email address");
    return isValid;
  };

  const validateState = () => {
    setStateError(state ? "" : "State is required");
    return !!state;
  };

  const validateCity = () => {
    setCityError(city ? "" : "City is required");
    return !!city;
  };

  const validatePinCode = () => {
    setPinCodeError(pinCode.length === 5 ? "" : "Zip code must be 5 digits");
    return pinCode.length === 5;
  };

  const validateBusinessName = () => {
    setBusinessNameError(businessName ? "" : "Business Name is required");
    return !!businessName;
  };

  const validateBusinessAddress = () => {
    setBusinessAddressError(
      businessAddress ? "" : "Business Address is required"
    );
    return !!businessAddress;
  };

  const validateHomeAddress = () => {
    setHomeAddressError(homeAddress ? "" : "Home Address is required");
    return !!homeAddress;
  };

  const validateShippingAddress = () => {
    setShippingAddressError(
      shippingAddress ? "" : "Shipping Address is required"
    );
    return !!shippingAddress;
  };

  const validatePickupAddress = () => {
    setPickupAddressError(pickupAddress ? "" : "Pickup Address is required");
    return !!pickupAddress;
  };

  const validterm = () => {
    const isValid = termsAgreed;
    setTermsAgreedError(isValid ? "" : "Please accept terms and conditions");
    return isValid;
  };
  const handleChange = (value, country) => {
    // Extract number without country code
    const numberWithoutCode = value.replace(`+${country.dialCode}`, "").trim();
    // Remove any non-numeric characters
    const sanitizedNumber = numberWithoutCode.replace(/\D/g, "");
    setPhoneNumber(sanitizedNumber);

    // Set error if the number is empty
    if (sanitizedNumber.length === 0) {
      setPhoneNumberError("Phone number is required.");
    } else {
      setPhoneNumberError("");
    }
   

  };
  console.log(state,stateOrProvinceCode,'8767465454546877654765r7');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    //   validateType() &&
    //   validateFullName() &&
    //   validatePhoneNumber() &&
    //   validateEmail() &&
    //   validateState() &&
    //   validateCity() &&
    //   validatePinCode() &&
    //   validterm() &&
    //   (serviceProvider || BarnOwner
    //     ? validateBusinessName() && validateBusinessAddress()
    //     : true) &&
    //   (serviceProvider || BarnOwner ? validateHomeAddress() : true) &&
    //   (productSeller
    //     ? validateShippingAddress() && validatePickupAddress()
    //     : true)
    // )
    {
      setLoading(true);
      try {
        const addAdminResponse = await otherApi.addAdmin({
          name: fullName,
          contact: phoneNumber,
          email,
          type,
          state,
          city,
          zipCode:(+ pinCode ),
          state:selectedState.stateName,
          stateOrProvinceCode: selectedState.stateOrProvinceCode,
          // termCondition: true,
          businessName,
          businessAddress,
          // homeAddress,
          shippingAddress,
          pickupAddress,
        });
        if (addAdminResponse.data.code === 200) {
          toast.success(addAdminResponse.data.message);
          navigate("/");
        } else {
          toast.error(addAdminResponse.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };



  const getAllBarns = async () => {
    setLoading(true);
    try {
      const BarnResponse = await barnApi.getAllBarns();
      if (BarnResponse.data.code === 200) {
        setBarnAssociate(BarnResponse?.data?.data);
      } else {
        toast.error(BarnResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Something went wrong");
    } finally {
      setLoading(false); // Once initial loading is done, set it to false
    }
  };
  useEffect(() => {
    getAllBarns();
  }, []);

  return (
    <Box minH={"80vh"} w={{ base: "100%", md: "80%" }} m={"auto"}>
      <Box
        bg={"#F6F6F6"}
        px={2}
        p={{ base: "2", md: "10" }}
        my={10}
        pb={20}
        border={"1px solid #D9D9D9"}
        rounded={"xl"}
      >
        <MainSubHeading textColor="#2B8F65" fontSize="40" textAlign="center">
          Become a member
        </MainSubHeading>
        <MainSubHeading textAlign="center" fontSize="16px" textColor="#313131">
          Let’s get you all set up so you can access your personal account.
        </MainSubHeading>
        <form onSubmit={handleSubmit}>
          <Flex mt={8} flexDir={"column"} gap={4}>
            <HStack mt="1">
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder="Full Name"
                  onBlur={validateFullName}
                  border="1px solid #79747E"
                  focusBorderColor="none"
                  bg="white"
                  color="black"
                  outline="none"
                />
                <Text position={"absolute"} fontSize="sm" color="red.500">
                  {fullNameError}
                </Text>
              </FormControl>
              {/* <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="tel"
                  minLength={10}
                  maxLength={10}
                  placeholder="0000000000"
                  onBlur={validatePhoneNumber}
                  border="1px solid #79747E"
                  focusBorderColor="none"
                  bg="white"
                  color="black"
                  outline="none"
                />
                <Text pos={"absolute"} fontSize="sm" color="red.500">
                  {phoneNumberError}
                </Text>
              </FormControl> */}
              <FormControl zIndex={10} isRequired>
                <FormLabel>Phone Number</FormLabel>
                <InputGroup w={"100%"}>
                  <PhoneInput
                    country={"in"}
                    value={phoneNumber}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    onChange={handleChange}
                  />
                </InputGroup>
                {phoneNumberError && (
                  <Text mt={1} fontSize="sm" color="red.500">
                    {phoneNumberError}
                  </Text>
                )}
              </FormControl>
            </HStack>
            <HStack mt={1}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                  type="email"
                  placeholder={`${userData?.email}`}
                  border="1px solid #79747E"
                  focusBorderColor="none"
                  bg="white"
                  color="black"
                  outline="none"
                  disabled
                />
                <Text pos={"absolute"} fontSize="sm" color="red.500">
                  {emailError}
                </Text>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Type</FormLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Select option"
                  onBlur={validateType}
                  border="1px solid #79747E"
                  focusBorderColor="none"
                  bg="white"
                  color="black"
                  outline="none"
                >
                  <option value="serviceProvider">Service Provider</option>
                  <option value="BarnOwner">Barn Owner</option>
                  <option value="productSeller">Product Seller</option>
                </Select>
                <Text pos={"absolute"} fontSize="sm" color="red.500">
                  {typeError}
                </Text>
              </FormControl>
            </HStack>
            {type === "serviceProvider" || type === "BarnOwner" ? (
              <HStack mt={1}>
                <FormControl isRequired>
                  <FormLabel>Business name</FormLabel>
                  <Input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    onBlur={validateBusinessName}
                    type="text"
                    placeholder="Business name"
                    border="1px solid #79747E"
                    focusBorderColor="none"
                    bg="white"
                    color="black"
                    outline="none"
                  />
                  <Text pos={"absolute"} fontSize="sm" color="red.500">
                    {businessNameError}
                  </Text>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Business address</FormLabel>
                  <Input
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    onBlur={validateBusinessAddress}
                    type="text"
                    placeholder="Business address"
                    border="1px solid #79747E"
                    focusBorderColor="none"
                    bg="white"
                    color="black"
                    outline="none"
                  />
                  <Text pos={"absolute"} fontSize="sm" color="red.500">
                    {businessAddressError}
                  </Text>
                </FormControl>
              </HStack>
            ) : null}
            {/* {type === "serviceProvider" || type === "BarnOwner" ? (
              <HStack mt={1}>
                <FormControl isRequired>
                  <FormLabel>Home address</FormLabel>
                  <Input
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    onBlur={validateHomeAddress}
                    type="text"
                    placeholder="Home address"
                    border="1px solid #79747E"
                    focusBorderColor="none"
                    bg="white"
                    color="black"
                    outline="none"
                  />
                  <Text pos={"absolute"} fontSize="sm" color="red.500">
                    {homeAddressError}
                  </Text>
                </FormControl>
              </HStack>
            ) : null} */}
            {type === "productSeller" ? (
              <HStack mt={1}>
                <FormControl isRequired>
                  <FormLabel>Shipping address</FormLabel>
                  <Input
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    onBlur={validateShippingAddress}
                    type="text"
                    placeholder="Shipping address"
                    border="1px solid #79747E"
                    focusBorderColor="none"
                    bg="white"
                    color="black"
                    outline="none"
                  />
                  <Text pos={"absolute"} fontSize="sm" color="red.500">
                    {shippingAddressError}
                  </Text>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Pickup address</FormLabel>
                  <Input
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    onBlur={validatePickupAddress}
                    type="text"
                    placeholder="Pickup address"
                    border="1px solid #79747E"
                    focusBorderColor="none"
                    bg="white"
                    color="black"
                    outline="none"
                  />
                  <Text pos={"absolute"} fontSize="sm" color="red.500">
                    {pickupAddressError}
                  </Text>
                </FormControl>
              </HStack>
            ) : null}

            <HStack mt={1}>
              <FormControl isRequired>
                <FormLabel>State</FormLabel>
                {/* <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  onBlur={validateState}
                  type="text"
                  placeholder="State"
                  border="1px solid #79747E"
                  focusBorderColor="none"
                  bg="white"
                  color="black"
                  outline="none"
                /> */}
              <Select
  name="state"
  value={selectedState.stateName} // Use the stateName for value
  onChange={(e) => {
    const selectedOption = statesData.find(
      (state) => state.name === e.target.value
    );
    setSelectedState({
      stateName: selectedOption.name,
      stateOrProvinceCode: selectedOption.abbreviation
    });
  }}
  w="100%"
  color="black"
  placeholder="Select a state"
  bg="white"
  focusBorderColor="none"
  _focus={{ boxShadow: 'none' }}
  maxHeight="600px"
  overflowY="auto"
>
  {statesData.map((state) => (
    <option key={state.abbreviation} value={state.name}>
      {state.name}
    </option>
  ))}
</Select>

                <Text pos={"absolute"} fontSize="sm" color="red.500">
                  {stateError}
                </Text>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={validateCity}
                  type="text"
                  placeholder="City"
                  border="1px solid #79747E"
                  focusBorderColor="none"
                  bg="white"
                  color="black"
                  outline="none"
                />
                <Text pos={"absolute"} fontSize="sm" color="red.500">
                  {cityError}
                </Text>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Zip-Code</FormLabel>
                <Input
                  value={pinCode}
                  onChange={(e) => {
                    if (e.target.value.length <= 5) {
                      setPinCode(e.target.value);
                    }
                  }}
                  onBlur={validatePinCode}
                  type="number"
                  maxLength={5}
                  minLength={5}
                  placeholder="Zip Code"
                  border="1px solid #79747E"
                  focusBorderColor="none"
                  bg="white"
                  color="black"
                  outline="none"
                />
                <Text pos={"absolute"} fontSize="sm" color="red.500">
                  {pinCodeError}
                </Text>
              </FormControl>
            </HStack>
            <HStack
              mt="4"
              flexDir={"column"}
              justify={"start"}
              alignSelf={"start"}
            >
              <Box>
                <CustomCheckbox
                  isChecked={termsAgreed}
                  setIsChecked={setTermsAgreed}
                >
                  I agree to all the{" "}
                  <Text as={"span"} textColor={"red"}>
                    Terms
                  </Text>{" "}
                  and{" "}
                  <Text as={"span"} textColor={"red"}>
                    Privacy Policies
                  </Text>
                </CustomCheckbox>
                <Text
                  justifySelf={"self-start"}
                  textAlign={"start"}
                  fontSize="sm"
                  color="red.500"
                >
                  {termsAgreedError}
                </Text>
              </Box>
            </HStack>
            <Button
              mt={4}
              w={{ base: "100%", md: "40%" }}
              isLoading={loading}
              m={"auto"}
              colorScheme=""
              className="Bg"
              variant="solid"
              rounded="sm"
              type="submit"
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default Index;
