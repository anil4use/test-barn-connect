import React, { useState } from "react";
import {
  Box,
  Text,
  FormControl,
  Flex,
  FormLabel,
  Input,
  Checkbox,
  InputGroup,
  InputRightElement,
  Button,
  Container,
  HStack,
  Heading,
  Spinner,
  Select,
} from "@chakra-ui/react";
import {
  CustomCheckbox,
  MainSubHeading,
} from "../../components/shared/custom design/Index";
import { EmailIcon, PhoneIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../apis/auth/auth.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateUser, updateToken } from "../../redux/redux-slice/user.slice";
import OtherLogin from "./OtherLogin";
import PhoneInput from '@quantfive/react-phone-input-2';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function SignUp() {
  const dispatch = useDispatch();
  const authApi = new Auth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [userType, setUserType] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState("");
  const [termsAgreedError, setTermsAgreedError] = useState("");
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const data = useSelector((state) => state.user.v_user_info);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email_verification_token = (searchParams.get('email_verification_token'))
  const email_verification_pending = (searchParams.get('email_verification_pending'))
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [userTypeError, setUserTypeError] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [userId, setUserId] = useState('')
  const handleChange = (value, country) => {
    // Extract number without country code
    const numberWithoutCode = value.replace(`+${country.dialCode}`, '').trim();
    // Remove any non-numeric characters
    const sanitizedNumber = numberWithoutCode.replace(/\D/g, '');
    setPhoneNumber(sanitizedNumber);

    // Set error if the number is empty
    if (sanitizedNumber.length === 0) {
      setPhoneNumberError('Phone number is required.');
    } else {
      setPhoneNumberError('');
    }
  };
  const userTypesList = [
    { value: "barnOwner", label: "Barn Owner" },
    { value: "serviceProvider", label: "Service Provider" },
    { value: "customer", label: "Customer" },
    { value: "sellerRenter", label: "Seller/Renter" },
  ];

  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailError(isValid ? "" : "Please enter a valid email address");
    return isValid;
  };
  const validateBusinessName = () => {
    // const isValid = userType.length >= 3;
    const isValid = /^[a-zA-Z\s]+$/.test(userType) && userType.length >= 3;
    setBusinessNameError(isValid ? "" : "Please enter a valid business name");
    return isValid;
  };

  // const validateUserType = () => {
  //   const isValid = userType.length >= 1;
  //   setUserTypeError(isValid ? "" : "Please enter a valid User Type");
  //   return isValid;
  // };
  const validterm = () => {
    const isValid = termsAgreed;
    setTermsAgreedError(isValid ? "" : "Please accept terms and conditions");
    return isValid;
  };

  const validatePhoneNumber = () => {
    const isValid = /^\d{10}$/.test(phoneNumber);
    setPhoneNumberError(
      isValid ? "" : "Please enter a valid 10-digit phone number"
    );
    return isValid;
  };

  const validatePassword = () => {
    const isValid = password.length >= 8;
    setPasswordError(
      isValid ? "" : "Password must be at least 8 characters long"
    );
    return isValid;
  };

  const validateConfirmPassword = () => {
    const isValid = password === confirmPassword;
    setConfirmPasswordError(isValid ? "" : "Passwords do not match");
    return isValid;
  };

  const isValid = () => {
    if (
      validateEmail() &&
      validatePhoneNumber() &&
      validatePassword() &&
      validateConfirmPassword() &&
      validterm()
    ) {
      return true;
    }
  };

  const handleClick = () => setShow(!show);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      setLoading(true);
      try {
        const RegisterResponse = await authApi.Register({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
        });
        if (RegisterResponse.data.code === 200) {
          navigate(`/sign-up?email_verification_pending=${true}`);
          toast.success(RegisterResponse.data.message);
        } else {
          toast.error(RegisterResponse.data.message);
        }
      } catch (error) {
        toast.error("something went wrong");
      } finally {
        setLoading(false);
        // toast.error("something went wrong");
      }
    }
  };

  const verifyEmail = async (token) => {
    try {
      const verifyResponse = await authApi.verifyEmail({ token });
      if (verifyResponse.data.code === 200) {
        toast.success("Email verification Success!");
        // getProfile()
        navigate("/profile");
        dispatch(updateUser(verifyResponse.data.data));
        dispatch(updateToken(verifyResponse.data.token));

      } else {
        // toast.error(verifyResponse.data.message);
      }
    } catch (error) {
      console.log("something went wrong");
    }
  }
  useEffect(() => {
    if (email_verification_token) {
      verifyEmail(email_verification_token)
    }
  }, [email_verification_token])

  const isAuth = useAuthenticated();
 

  if (!isAuth) {
    return (
      <Box
        px={2}
        pt={10}
        h={"fit-content"}
        pb={10}
        w={{ base: "100%", md: "600px" }}
        m={"auto"}
      >
        {email_verification_pending ? <HStack minH={'80vh'} >
          <Container maxW="md" py={4} px={4} bg="white" borderRadius="lg" border={'1px solid #cccccc'} boxShadow="lg">
            <Heading as="h2" fontSize="lg" mb={2}>
              Please Verify Your Email
            </Heading>
            <Text fontSize="md" mb={4}>
              We sent a verification link to your email address. Please click on the link in the email to verify your account.
            </Text>
            <Button
              as="a"
              href="https://mail.google.com/mail/u/0/#inbox"
              target=""
              rel="noopener noreferrer"
              bg="green.500"
              color="white"
              _hover={{ bg: 'green.700' }}
            >
              Open Gmail
            </Button>
          </Container>
        </HStack> :
          email_verification_token ? (
            // Show loading state
            <HStack minH={'80vh'} >
              <Container maxW="md" py={4} px={4} bg="white" borderRadius="lg" boxShadow="lg">
                <Heading as="h2" fontSize="lg" mb={2}>
                  Verifying Email...
                </Heading>
                <Text fontSize="md" mb={4}>
                  Please wait while we verify your email address.
                </Text>
                <Spinner />
              </Container>
            </HStack>) :
            (
              <Box>
                <MainSubHeading textAlign="start">Sign Up</MainSubHeading>
                <MainSubHeading textColor="#313131" fontSize="14px" textAlign="start">
                  Let's get you all set up so you can access your personal account.
                </MainSubHeading>
                <form onSubmit={handleSubmit}>
                  <Flex mt={4} flexDir={"column"} gap={4}>
                    {/* <Flex>
                      <FormControl isRequired>
                        <FormLabel>User Type</FormLabel>
                        <Select
                          value={userType}
                          onChange={(e) => setUserType(e.target.value)}
                          placeholder="Select user type"
                          border="1px solid #79747E"
                          focusBorderColor="none"
                          bg="white"
                          color="black"
                          outline="none"
                          onBlur={() =>
                            setUserTypeError(userType ? "" : "User Type is required")
                          }
                        >
                          {userTypesList.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </Select>
                        <Text mt={1} fontSize="sm" color="red.500">
                          {userTypeError}
                        </Text>
                      </FormControl>
                    </Flex> */}
                    <Flex gap={"4"} flexDir={{ base: "column", md: "row" }}>
                      <FormControl isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          placeholder="First Name"
                          onBlur={() =>
                            setFirstNameError(firstName ? "" : "First Name is required")
                          }
                          border="1px solid #79747E"
                          focusBorderColor="none"
                          bg="white"
                          color="black"
                          outline="none"
                        />
                        <Text mt={1} fontSize="sm" color="red.500">
                          {firstNameError}
                        </Text>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          placeholder="Last Name"
                          border="1px solid #79747E"
                          focusBorderColor="none"
                          bg="white"
                          color="black"
                          outline="none"
                          onBlur={() =>
                            setLastNameError(lastName ? "" : "Last Name is required")
                          }
                        />
                        <Text mt={1} fontSize="sm" color="red.500">
                          {lastNameError}
                        </Text>
                      </FormControl>
                    </Flex>

                    <Flex gap={"4"} flexDir={{ base: "column", md: "row" }}>
                      <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <InputGroup>
                          <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="john.doe@gmail.com"
                            onBlur={validateEmail}
                            border="1px solid #79747E"
                            focusBorderColor="none"
                            bg="white"
                            color="black"
                            outline="none"
                          />
                          <InputRightElement pointerEvents="none" pr={4}>
                            <EmailIcon color="gray.300" />
                          </InputRightElement>
                        </InputGroup>
                        <Text mt={1} fontSize="sm" color="red.500">
                          {emailError}
                        </Text>
                      </FormControl>

                      <FormControl zIndex={10} mt={0} isRequired>
                        <FormLabel>Phone Number</FormLabel>
                        <InputGroup w={'100%'}>
                          <PhoneInput
                            country={'in'}
                            value={phoneNumber}
                            inputProps={{
                              name: 'phone',
                              required: true,
                              autoFocus: true
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
                    </Flex>
                    {userType === 'barnOwner' || userType === 'serviceProvider' || userType === 'sellerRenter' ?
                      <Flex>
                        <FormControl>
                          <FormLabel>Business Name (if applicable).</FormLabel>
                          <Input
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            type="text"
                            placeholder="Business Name"
                            border="1px solid #79747E"
                            focusBorderColor="none"
                            bg="white"
                            color="black"
                            outline="none"
                          //   onBlur={() =>
                          //     (businessName ? "" : " is required")
                          //   }
                          />
                          {/* <Text mt={1} fontSize="sm" color="red.500">
                      {userTypeError}
                    </Text> */}
                        </FormControl>
                      </Flex> : null
                    }

                    <FormControl isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type={show ? "text" : "password"}
                          placeholder="********"
                          onBlur={validatePassword}
                          border="1px solid #79747E"
                          focusBorderColor="none"
                          bg="white"
                          color="black"
                          outline="none"
                        />
                        <InputRightElement
                          cursor={"pointer"}
                          onClick={handleClick}
                          pr={4}
                        >
                          {show ? <ViewOffIcon /> : <ViewIcon />}
                        </InputRightElement>
                      </InputGroup>
                      <Text mt={1} fontSize="sm" color="red.500">
                        {passwordError}
                      </Text>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Confirm Password</FormLabel>
                      <InputGroup>
                        <Input
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type={show ? "text" : "password"}
                          placeholder="********"
                          onBlur={validateConfirmPassword}
                          border="1px solid #79747E"
                          focusBorderColor="none"
                          bg="white"
                          color="black"
                          outline="none"
                        />
                        <InputRightElement
                          cursor={"pointer"}
                          onClick={handleClick}
                          pr={4}
                        >
                          {show ? <ViewOffIcon /> : <ViewIcon />}
                        </InputRightElement>
                      </InputGroup>
                      <Text mt={1} fontSize="sm" color="red.500">
                        {confirmPasswordError}
                      </Text>
                    </FormControl>

                    <Box pt={4}>
                      <CustomCheckbox
                        isChecked={termsAgreed}
                        setIsChecked={setTermsAgreed}
                        display="flex"
                      >
                        {" "}
                      </CustomCheckbox>
                      <Text ml={8} mb={1}>
                        {" "}
                        I agree to all the
                        <Link style={{ color: "#FF8682" }} to={"/terms-and-conditions"}>
                          {""} Terms & conditions
                        </Link>
                      </Text>
                    </Box>
                    <Text mt={1} fontSize="sm" color="red.500">
                      {termsAgreedError}
                    </Text>
                    <Button
                      isLoading={loading}
                      w="100%"
                      colorScheme=""
                      className="Bg"
                      variant="solid"
                      rounded="sm"
                      type="submit"
                    >
                      Create account
                    </Button>
                    <MainSubHeading fontSize="14px">
                      Already have an account?
                      <Link to={"/login"}>
                        <Text
                          ml={2}
                          cursor={"pointer"}
                          as={"span"}
                          textColor={"#FF8682"}
                        >
                          Login
                        </Text>
                      </Link>
                    </MainSubHeading>
                  </Flex>
                </form>
                <OtherLogin
                  Google={"Sign Up with Google"}
                  Facebook={"Sign Up with Facebook"}
                />
              </Box>)

        }

      </Box>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}

export default SignUp;
