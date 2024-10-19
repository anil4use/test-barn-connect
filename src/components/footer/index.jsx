import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Image,
} from "@chakra-ui/react";

import { FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import FooterBg from "../../assets/images/Footerbg.png";
import logo from "../../assets/images/barm-logo.png";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";

function index() {

  const isAuth = useAuthenticated();
  console.log(isAuth, "isAuth11components");

  return (
    <div>
      <Box
        backgroundImage={FooterBg}
        maxW={"1600px"}
        w={"100%"}
        backgroundSize={"auto"}
        // bg={'black'}
        m={"auto"}
        color={"gray.200"}
      >
        <Container
          w={"100%"}
          m={"auto"}
          maxW={"full"}
          as={Stack}
          px={10}
          py={10}
        >
          {/* <Divider pt={4} /> */}
          <SimpleGrid
            pt={8}
            templateColumns={{ base: " 1fr ", md: "2fr 1fr  1fr 2fr" }}
            spacing={8}
          >
            <Stack
              display={{ base: "none", md: "flex" }}
              justify={{ md: "start", lg: "end" }}
              spacing={6}
            >
              <Image w={40} src={logo} alt="logo" />
              <Text fontSize={"sm"}>
                With lots of unique blocks, you can easily build a page without
                coding. Build your next landing page.
              </Text>
              <HStack>
                <SocialLinks Icon={<FaLinkedinIn />} Link={"#"} />
                <SocialLinks Icon={<FaXTwitter />} Link={"#"} />
                <SocialLinks Icon={<FaInstagram />} Link={"#"} />
                <SocialLinks Icon={<FaYoutube />} Link={"#"} />
                <SocialLinks Icon={<FaFacebookF />} Link={"#"} />
              </HStack>
            </Stack>

            <Stack align={"flex-start"}>
              <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
                Quick Link
              </Text>
              <Link to={"/"}>Home</Link>
              <Link to={"/products"}>Product</Link>
              <Link to={"/services"}>Service</Link>
              <Link to={"/contact-us"}>Contact Us</Link>
              {/* {isAuth ? (
                <Link to={"/become-member"}>Become a member</Link>
              ) : null} */}
              {/* <Link to={'/become-member'}>
                            Become a member
                            </Link> */}
              {/* <Link to={'/profile'}>
                                Profile
                            </Link> */}
              <Link to={"/jobs"}>Carrer page</Link>
            </Stack>
            <Stack align={"flex-start"}>
              {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/shipping-policy" element={<ShippingPolicy />} />
                            <Route path="/terms-and-conditions" element={<TermAndCondition />} />
                            <Route path="/terms-of-use" element={<TermsUse />} />
                            <Route path="/return-policy" element={<Return />} />
                            <Route path="/cancellation-policy" element={<Cancellation />} />
                            <Route path="/become-member" element={<BecomeMember />} /> */}
              <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
                Support
              </Text>

              <Link to={"/terms-and-conditions"}>Terms of Conditions</Link>
              <Link to={"/privacy-policy"}>Privacy Policy</Link>
              <Link to={"/shipping-policy"}>Shipping-Policy</Link>
              <Link to={"/terms-of-use"}>Terms-of-Use</Link>
              <Link to={"/return-policy"}>Return-Policy</Link>
              <Link to={"/cancellation-policy"}>Cancellation-Policy</Link>
            </Stack>
            <Box w={"100%"}>
              <Box>
                <Text
                  fontWeight={600}
                  fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                  textColor={"white"}
                >
                  Sign Up & Stay Up To Date
                </Text>
                <Text fontWeight={500} fontSize={"18px"} textColor={"white"}>
                  Subscribe to our mailing list
                </Text>
                <HStack mt={4}>
                  <InputGroup w={"100%"} size="md">
                    <Input
                      pr="2rem"
                      color={"black"}
                      placeholder="Enter your email"
                      h={12}
                      focusBorderColor="none"
                      bg={"white"}
                      outline={"none"}
                      w={"100%"}
                    />
                    <InputRightElement mt={1} cursor={"pointer"}>
                      <IoIosSend fontSize={"28"} color="#2b8f65" />
                    </InputRightElement>
                  </InputGroup>
                </HStack>
              </Box>
            </Box>
          </SimpleGrid>
          <Stack
            display={{ base: "block", md: "none" }}
            justify={"end"}
            spacing={6}
          >
            <Text fontSize={"sm"}>
              With lots of unique blocks, you can easily build a page without
              coding. Build your next landing page.
            </Text>
            <HStack mt={4}>
              <SocialLinks Icon={<FaLinkedinIn />} Link={"#"} />
              <SocialLinks Icon={<FaXTwitter />} Link={"#"} />
              <SocialLinks Icon={<FaInstagram />} Link={"#"} />
              <SocialLinks Icon={<FaYoutube />} Link={"#"} />
              <SocialLinks Icon={<FaFacebookF />} Link={"#"} />
            </HStack>
          </Stack>
        </Container>
      </Box>
    </div>
  );
}

export default index;
const SocialLinks = ({ Icon, Link }) => {
  return (
    <Box
      as="a"
      rounded={"full"}
      fontSize={{ base: "xl", md: "xl" }}
      h={6}
      textColor={"white"}
      _hover={{ textColor: "#03A8B2" }}
      target="_blank"
      href={Link}
    >
      {Icon}
    </Box>
  );
};
