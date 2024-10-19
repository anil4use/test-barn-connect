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
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import BannerImg from "../../assets/images/contactBanner.png";
import ProductBanner from "../../components/shared/banner/Index";
import { FaRegUser } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { IoBagCheckOutline } from "react-icons/io5";
import { ProfileSideBarComponent } from "../../components/profileSideBarComponent/Index";
import profileLeftImage from "../../assets/images/profileLeftImage.png";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../apis/auth/auth.api";
import toast from "react-hot-toast";
import { updateUser } from "../../redux/redux-slice/user.slice";

import { GrStatusGood } from "react-icons/gr";
import { useEffect } from "react";

function Index() {
  const dispatch = useDispatch();
  const authApi = new Auth();
  const data = useSelector((state) => state.user.v_user_info);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    phoneNumber: data?.contact || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validation
    let error = "";
    switch (name) {
      case "firstName":
        error = value.trim() === "" ? "First Name is required" : "";
        break;
      case "lastName":
        error = value.trim() === "" ? "Last Name is required" : "";
        break;
      case "email":
        error = !/^\S+@\S+\.\S+$/.test(value) ? "Invalid Email" : "";
        break;
      case "phoneNumber":
        error =
          value.trim() === "" || phoneNumber.length !== 9
            ? "Please Enter Valid Phone Number"
            : "";
        break;
      case "currentPassword":
        error = value.trim() === "" ? "Current Password is required" : "";
        break;
      case "newPassword":
        error =
          value.length < 6 ? "Password must be at least 6 characters long" : "";
        break;
      case "confirmNewPassword":
        error = value !== formData.newPassword ? "Passwords do not match" : "";
        break;
      default:
        break;
    }

    // Update errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    // Check if any errors exist in the errors object
    return Object.values(errors).every((error) => error === "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidForm = validateForm();
    setLoading(true);
    if (isValidForm) {
      try {
        const UpdateProfileResponse = await authApi.updateUser(formData);
        if (UpdateProfileResponse.data.code === 200) {
          toast.success(" profile updated successfully");
          console.log(UpdateProfileResponse.data.data);
          dispatch(updateUser(UpdateProfileResponse.data.data));
        } else {
          toast.error(UpdateProfileResponse.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  const getProfile = async (e) => {
    try {
      const response = await authApi.getUserDetail();
      if (response.data.code === 200) {
        dispatch(updateUser(response.data.data));
        const data = response.data.data;
        setFormData({
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",
          email: data?.email || "",
          phoneNumber: data?.contact || "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
    }
  };
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    currentPassword,
    newPassword,
    confirmNewPassword,
  } = formData;
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Box pos={"relative"}>
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
                Edit Your Profile
              </Heading>
              <Box display={{ lg: "none" }}>
                <ProfileSideBarComponent />
              </Box>
            </HStack>
            <Flex
              bg={"primary"}
              flexDir={{ base: "column", md: "row" }}
              mt={2}
              gap={4}
            >
              <FormControl isInvalid={errors.firstName}>
                <FormLabel fontWeight={"500"} primary={"primary"}>
                  First Name*
                </FormLabel>
                <Input
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  h={12}
                  focusBorderColor="none"
                  bg={"#F5F5F5"}
                  rounded={"sm"}
                  outline={"none"}
                  placeholder="Enter your first name"
                />
                <Text color="red.500">{errors.firstName}</Text>
              </FormControl>
              <FormControl isInvalid={errors.lastName}>
                <FormLabel fontWeight={"500"} primary={"primary"}>
                  Last Name*
                </FormLabel>
                <Input
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  h={12}
                  focusBorderColor="none"
                  bg={"#F5F5F5"}
                  rounded={"sm"}
                  outline={"none"}
                  placeholder="Enter your last name"
                />
                <Text color="red.500">{errors.lastName}</Text>
              </FormControl>
            </Flex>

            <FormControl isInvalid={errors.email}>
              <FormLabel fontWeight={"500"}>Your Email*</FormLabel>
              <InputGroup>
                <Input
                  name="email"
                  value={email}
                  onChange={handleChange}
                  h={12}
                  focusBorderColor="none"
                  bg={"#F5F5F5"}
                  rounded={"sm"}
                  readOnly
                  outline={"none"}
                  placeholder="Enter your email"
                />
                <InputRightElement
                  h={12}
                  cursor={"pointer"}
                  // onClick={handleClick}
                  w={"fit-content"}
                  pr={4}
                >
                  {
                    data?.isVerify ? (
                      <HStack>
                        <Text textColor={"green"}>Verified</Text>
                        <GrStatusGood color="green" />
                      </HStack>
                    ) : (
                      <HStack>
                        <Text textColor={"green"}>Verified</Text>
                        <GrStatusGood color="green" />
                      </HStack>
                    )
                    // <Button colorScheme='teal' border={'1px'} variant={'outline'} > Verify Your Email</Button>
                  }
                </InputRightElement>
              </InputGroup>
              <Text color="red.500">{errors.email}</Text>
            </FormControl>
            <FormControl isInvalid={errors.phoneNumber}>
              <FormLabel fontWeight={"500"}>Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                h={12}
                type="number"
                focusBorderColor="none"
                bg={"#F5F5F5"}
                rounded={"sm"}
                outline={"none"}
                placeholder="Enter your phoneNumber"
              />
              <Text color="red.500">{errors.phoneNumber}</Text>
            </FormControl>
            {!data?.loginType === "google" ? (
              <FormControl isInvalid={errors.currentPassword}>
                <FormLabel fontWeight={"500"}>Change Password</FormLabel>
                <Input
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={handleChange}
                  h={12}
                  focusBorderColor="none"
                  bg={"#F5F5F5"}
                  rounded={"sm"}
                  outline={"none"}
                  placeholder="Enter your current password"
                />
                <Text color="red.500">{errors.currentPassword}</Text>
              </FormControl>
            ) : null}

            <FormControl isInvalid={errors.newPassword}>
              {/* <FormLabel fontWeight={'500'}>Your New Password*</FormLabel> */}
              <Input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                h={12}
                focusBorderColor="none"
                bg={"#F5F5F5"}
                rounded={"sm"}
                outline={"none"}
                placeholder="Enter your new password"
              />
              <Text color="red.500">{errors.newPassword}</Text>
            </FormControl>
            <FormControl isInvalid={errors.confirmNewPassword}>
              {/* <FormLabel fontWeight={'500'}>Confirm Password*</FormLabel> */}
              <Input
                type="password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleChange}
                h={12}
                focusBorderColor="none"
                bg={"#F5F5F5"}
                rounded={"sm"}
                outline={"none"}
                placeholder="Confirm your new password"
              />
              <Text color="red.500">{errors.confirmNewPassword}</Text>
            </FormControl>
            <Box py={3} alignSelf={{ base: "center", lg: "end" }}>
              <Button colorScheme="" variant={"outline"} width={"40"} mr={2}>
                Cancel
              </Button>
              <Button
                isLoading={loading}
                textColor={"white"}
                className="Bg"
                width="40"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </Box>
          </Flex>
        </Flex>
      </HStack>
    </Box>
  );
}

export default Index;
