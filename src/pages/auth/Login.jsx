import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import {
  CustomCheckbox,
  MainSubHeading,
} from "../../components/shared/custom design/Index";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Auth from "../../apis/auth/auth.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import { Navigate } from "react-router-dom";
import { updateUser, updateToken } from "../../redux/redux-slice/user.slice";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import OtherLogin from "./OtherLogin";
import { Link } from "react-router-dom";
import PhoneInput from "@quantfive/react-phone-input-2";
import "@quantfive/react-phone-input-2/lib/style.css";
import { clearRedirectPath, getRedirectPath } from "../../utils/common.util";

function Login() {
  const dispatch = useDispatch();
  const loginApi = new Auth();
  const navigate = useNavigate(); // Changed from useNavigation to useNavigate
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [getOtpClicked, setGetOtpClicked] = useState(false);

  const handleChange = (value, country) => {
    // Extract number without country code
    const numberWithoutCode = value.replace(`+${country.dialCode}`, "").trim();
    // Remove any non-numeric characters
    const sanitizedNumber = numberWithoutCode.replace(/\D/g, "");
    setNumber(sanitizedNumber);

    // Set error if the number is empty
    if (sanitizedNumber.length === 0) {
      setNumberError("Phone number is required.");
    } else {
      setNumberError("");
    }
  };
  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailError(isValid ? "" : "Please enter a valid email address");
    return isValid;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    if (!isActive) {
      validateEmail();
    }
    e.preventDefault();
    var key;
    if (isActive) {
      key = { email, password };
    } else {
      key = { contact: number };
    }
    try {
      const loginResponse = await loginApi.login(key);

      if (loginResponse.data.code === 200) {
        if (isActive) {
          dispatch(updateUser(loginResponse.data.data));
          dispatch(updateToken(loginResponse.data.token));
          const redirectPath = getRedirectPath();
          clearRedirectPath();
          navigate(redirectPath || "/profile");
        }
        toast.success(loginResponse.data.message);
        if (!isActive) {
          setCountdown(30);
          setResendEnabled(false);
          setGetOtpClicked(true);
        }
        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
        }
      } else {
        toast.error(loginResponse.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setPassword(localStorage.getItem("password"));
  }, []);

  const handleClick = () => setShow(!show);
  const isAuth = useAuthenticated();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendEnabled(true);
    }
  }, [countdown]);

  const handleGetOtp = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };
  const verifyOTPHandler = async (e) => {
    e.preventDefault();
    setLoadingOtp(true);
    try {
      const VerifyCodeResponse = await loginApi.verifyOTP({
        otp,
        contact: number,
      });
      if (VerifyCodeResponse.data.code === 200) {
        dispatch(updateUser(VerifyCodeResponse.data.data));
        dispatch(updateToken(VerifyCodeResponse.data.token));
        toast.success(VerifyCodeResponse.data.message);
        navigate("/");
      } else {
        toast.error(VerifyCodeResponse.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoadingOtp(false);
    }
  };
  if (!isAuth) {
    return (
      <Box
        px={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        pt={10}
        pb={10}
        minH={"90vh"}
        m={"auto"}
      >
        <Box w={{ base: "100%", md: "500px" }}>
          <MainSubHeading textAlign="start">Login</MainSubHeading>
          <MainSubHeading textAlign="start" fontSize="16px" textColor="#313131">
            Hey, Enter your details to login to your account.
          </MainSubHeading>
          <Box
            mt={2}
            p={2}
            gap={2}
            display={"flex"}
            rounded={"lg"}
            w={"100%"}
            h={"14"}
          >
            <Button
              textColor={isActive ? "white" : ""}
              bg={isActive ? "#2b8f65" : ""}
              onClick={() => setIsActive(true)}
              rounded={"full"}
              w={"50%"}
              variant={"outline"}
              colorScheme=""
              border={"1px solid #cccccc"}
            >
              {" "}
              Login with email
            </Button>
            <Button
              textColor={!isActive ? "white" : ""}
              bg={!isActive ? "#2b8f65" : ""}
              onClick={() => setIsActive(false)}
              rounded={"full"}
              w={"50%"}
              variant={"outline"}
              colorScheme=""
              border={"1px solid #cccccc"}
            >
              {" "}
              Login via OTP
            </Button>
          </Box>
          <form>
            {isActive ? (
              <>
                <FormControl mt={4} isRequired>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={validateEmail}
                      type="email"
                      placeholder="john.doe@gmail.com"
                      border="1px solid #79747E"
                      focusBorderColor="none"
                      bg="white"
                      color="black"
                      outline="none"
                      pr="3.5rem"
                    />
                    <InputRightElement pointerEvents="none" pr={4}>
                      <EmailIcon />
                    </InputRightElement>
                  </InputGroup>
                  <Text mt={1} fontSize="sm" color="red.500">
                    {emailError}
                  </Text>
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={show ? "text" : "password"}
                      placeholder="238usd@3nf23"
                      border="1px solid #79747E"
                      focusBorderColor="none"
                      bg="white"
                      color="black"
                      outline="none"
                      pr="3.5rem"
                    />
                    <InputRightElement pr="4">
                      <Button
                        h="1.75rem"
                        size="md"
                        bg={"transparent"}
                        onClick={handleClick}
                        variant="none"
                      >
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Box my={4} pt={4}>
                  <CustomCheckbox
                    isChecked={!rememberMe}
                    defaultChecked={true}
                    setIsChecked={setRememberMe}
                    display="flex"
                  >
                    {" "}
                    <Text ml={-1} pb={1}>
                      {" "}
                      Remember Me{" "}
                    </Text>{" "}
                  </CustomCheckbox>
                </Box>
                <HStack justify={"flex-end"} textAlign={"center"}>
                  {/* <Checkbox
                                mt={4}
                                fontWeight="400"
                                defaultChecked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            >
                                Remember me
                            </Checkbox> */}
                  <Link to={"/forgot-password"}>
                    <Text mt={-10} textColor={"#2b8f65"}>
                      forgot Password
                    </Text>
                  </Link>
                </HStack>
              </>
            ) : (
              <>
                <FormControl zIndex={10} mt={4} isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <InputGroup w={"100%"}>
                    <PhoneInput
                      country={"in"}
                      value={number}
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true,
                      }}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  {numberError && (
                    <Text mt={1} fontSize="sm" color="red.500">
                      {numberError}
                    </Text>
                  )}
                </FormControl>
                <FormControl zIndex={9} mt={4} isRequired>
                  <FormLabel>OTP</FormLabel>
                  <HStack justify={"space-between"} w={"100% "}>
                    <HStack j>
                      <PinInput
                        placeholder="*"
                        otp
                        onChange={(value) => setOtp(value)}
                      >
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    {!getOtpClicked ? (
                      <Button
                        cursor={"pointer"}
                        textColor={"#79747E"}
                        fontWeight={"bold"}
                        onClick={handleGetOtp}
                        isLoading={loading}
                        variant={""}
                      >
                        Get OTP
                      </Button>
                    ) : (
                      <Box
                        opacity={getOtpClicked ? 1 : 0}
                        fontWeight={"semibold"}
                        my={"18px"}
                        textAlign="start"
                        fontSize="14px"
                        onClick={handleGetOtp}
                      >
                        {resendEnabled ? " " : "Resend OTP"}
                        <Button
                          w={"fit-content"}
                          ml={-4}
                          isDisabled={!resendEnabled}
                          variant={"outline"}
                          colorScheme=""
                          border={"none"}
                        >
                          <Text
                            ml={2}
                            cursor={"pointer"}
                            as={"spen"}
                            textColor={"#FF8682"}
                          >
                            {" "}
                            {resendEnabled ? (
                              "Resend Otp"
                            ) : (
                              <>{countdown} second </>
                            )}{" "}
                          </Text>
                        </Button>
                      </Box>
                    )}
                    {/* {!getOtpClicked && (
                                                <Text
                                                    cursor={'pointer'}
                                                    textColor={'#79747E'}
                                                    fontWeight={'bold'}
                                                    onClick={handleGetOtp}
                                                >
                                                    Get OTP
                                                </Text>
                                            )} */}
                  </HStack>
                </FormControl>
              </>
            )}
            <Button
              mt={4}
              w="100%"
              isLoading={isActive ? loading : loadingOtp}
              colorScheme=""
              className="Bg"
              onClick={isActive ? handleSubmit : verifyOTPHandler}
              isDisabled={!isActive ? otp.length < 6 : !isActive}
              variant="solid"
              rounded="sm"
              type="submit"
            >
              Login
            </Button>
          </form>
          <OtherLogin Google={"Sign In with Google"} />
        </Box>
      </Box>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}

export default Login;
