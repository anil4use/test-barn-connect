import React, { useState, useEffect } from "react";
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
  Spinner,
  Button,
} from "@chakra-ui/react";

import { ProfileSideBarComponent } from "../../components/profileSideBarComponent/Index";

import toast from "react-hot-toast";
import { CiDiscount1 } from "react-icons/ci";
import CouponApi from "../../apis/Coupon.api";
import { formatDate, formatTime } from '../../utils/common.util';

function Index() {
  const couponApi = new CouponApi();
  const [couponData, setCouponData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [copy, setCopy] = useState(false);
  const getAllCoupon = async () => {
    setLoading(true);
    try {
      const ServiceResponse = await couponApi.getAllCoupon();
      if (ServiceResponse.data.code === 200) {
        let items = ServiceResponse.data.data;
        setCouponData(items);
        console.log(items);
      } else {
        toast.error(ServiceResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllCoupon();
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
          className="hide-scrollbar"
          mt={4}
          w={{ base: "100%", lg: "100%" }}
          overflowY={"auto"}
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
                Coupons
              </Heading>
              <Box display={{ lg: "none" }}>
                <ProfileSideBarComponent />
              </Box>
            </HStack>
            {
              !loading ?

                <Flex
                  bg={"primary"}
                  flexDir={{ base: "column", md: "column" }}
                  mt={2}
                  gap={4}
                >
                  {couponData && couponData?.length > 0 ? <>

                    {couponData?.map((data, index) => {
                      return (
                        <>
                          <CouponsComponent data={data} index={index} copy={copy} setCopy={setCopy} />
                        </>
                      );
                    })}
                  </>
                    :
                    <Box
                      justifyContent={"center"}
                      h={"500px"}
                      w={"100%"}
                      textAlign={"center"}
                      display={"flex"}
                      alignItems={"center"}
                      fontSize={"40"}
                    >
                      <Text>! No Coupons Available</Text>
                    </Box>}
                </Flex>
                : <HStack
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
                </HStack>}
          </Flex>
        </Flex>
      </HStack>
    </Box>
  );
}

export default Index;

const CouponsComponent = ({ data, index, copy, setCopy }) => {
  return (
    <HStack
      justify={"space-between"}
      flexDir={{ base: "column", md: "row" }}
      gap={{ base: "1", md: 4 }}
      border={"1px solid #C4C4C4"}
      rounded={"md"}
      overflow={"hidden"}
      w={"100%"}
      h={{ base: "fit-content", md: "24" }}
    >
      <Box
        alignSelf={"start"}
        p={3}
        h={"100%"}
        fontWeight={"semibold"}
        textAlign={"center"}
        w={{ base: "", md: "10%" }}
        textColor={"#2B8F65"}
        fontSize={{ base: "16px", md: "24px" }}
        bg={"#DFFFF2"}
      >
        {data?.discount} {data?.discountType === "flat" ? "₹" : "%"}
        <Text as={"br"} />
        Off
      </Box>
      <Box w={{ base: "98%", md: "80%" }}>
        <Text
          fontSize={{ base: "12px", md: "20px" }}
          fontWeight={"500"}
          textColor={"#333333"}
        >
          {data?.discount} {data?.discountType === "flat" ? "₹" : "%"} OFF | Expired at {formatDate(`${data?.expiryDate}`)}

        </Text>
        <Text
          noOfLines={2}
          fontSize={{ base: "10px", md: "16px" }}
          textColor={"#333333"}
        >
          {/* {data?.usedCount} / {data?.usageLimit} Uses by you this coupon  */}
          {data?.couponCode.slice(0, 15)} | Coupon Code
        </Text>
      </Box>
      <Box p={2} w={{ base: "100%", md: "20%" }} justifySelf={"end"}>
        {/* <Button
          colorScheme=""
          bg={"#2B8F65"}
          textColor={"white"}
          rounded={"sm"}
          onClick={() => {
            {data?.couponCode}
            console.log("Coupon Code Applied",data?.couponCode);
          }}
        >
          Use Coupone Code
        </Button> */}
        <Button
          colorScheme=""
          bg={"#2B8F65"}
          textColor={"white"}
          rounded={"sm"}
          isDisabled={data?.isActive === true ? false : true}
          onClick={() => {
            if (data?.couponCode) {
              navigator.clipboard.writeText(data?.couponCode)
                .then(() => {
                  toast.success(`${data?.couponCode} Copied Successfully`);
                })
                .catch(err => {
                  toast.error("Failed to copy");
                });
            }
            setCopy(true);
          }}
        >Copy Coupon Code
        </Button>

        <Button
          colorScheme=""
          gap={2}
          bg={"transparent"}
          textColor={"#2B8F65"}
          rounded={"sm"}
          cursor="default"
        >
          <CiDiscount1 fontSize={24} /> Coupon verified
        </Button>
      </Box>
    </HStack>
  );
};
