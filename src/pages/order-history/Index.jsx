import React from "react";
import {
  Box,
  Text,
  HStack,
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
  TableContainer,
  Table,
  Tr,
  Th,
  Tbody,
  Thead,
  Td,
  Tfoot,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";

import { ProfileSideBarComponent } from "../../components/profileSideBarComponent/Index";
import OtherApi from "../../apis/other.api";
import { useState } from "react";
import NoData from "../../assets/images/NoData.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderHistory } from "../../redux/redux-slice/others.slice";
import { formatDate, formatTime } from "../../utils/common.util";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Index() {
  const dispatch = useDispatch();
  const otherApi = new OtherApi();
  const [loading, setLoading] = useState(false);
  const orderHistory = useSelector((state) => state.other.OrderHistory);
  const getOrderHistoryHandler = async () => {
    setLoading(true);
    try {
      const OrderHistoryResponse = await otherApi.getOrderHistory();
      if (OrderHistoryResponse.data.code === 200) {
        dispatch(setOrderHistory(OrderHistoryResponse.data.data));
      } else {
        toast.error(OrderHistoryResponse.data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderHistoryHandler();
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
          overflow={"scroll"}
          minH={{ base: "80vh", md: "fit-content" }}
          className="hide-scrollbar"
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
                {" "}
                Order History
              </Heading>
              <Box display={{ lg: "none" }}>
                <ProfileSideBarComponent />
              </Box>
            </HStack>
          </Flex>
          <Box
            w={"100%"}
            overflow={{ base: "scroll", md: "unset" }}
            bg={"white"}
            borderRadius={"10px"}
            className="hide-scrollbar"
            // border={"1px solid #cccccc"}

          >
            {loading ? (
              <>
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
              </>
            ) : (
              <>
                {orderHistory.length <= 0 ? (
                  <Box
                    w={"100%"}
                    justifyContent={"center"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Image src={NoData} alt="no data found" />
                  </Box>
                ) : (
                  <MainTable data={orderHistory} loading={loading} />
                )}
              </>
            )}
          </Box>
        </Flex>
      </HStack>
    </Box>
  );
}

export default Index;


const MainTable = ({ data, loading }) => {
  const statusColorMap = {
    pending: "#FFA500", // Orange
    confirmed: "#FFD700", // Gold
    shipped: "#1E90FF", // Dodger Blue
    outOfDelivery: "#FF8C00", // Dark Orange
    delivered: "#19884A", // Green
    paid: "#19884A", //
  };

  const navigate = useNavigate();

  return (
    <TableContainer minH={"80vh"} p={1}>
      <Table
        bg={"white"}
        borderRadius={"10px"}
        w={"1200px"}
        overflow={"hidden"}
      >
        <Thead>
          <Tr bg={"white"} borderBottom={"2px solid #cccccc"} fontSize={"16px"}>
            <Th
              fontWeight={700}
              border={"none"}
              textColor={"black"}
              fontSize={"14px"}
            >
              Product
            </Th>
            <Th
              fontWeight={700}
              border={"none"}
              textColor={"black"}
              fontSize={"14px"}
            >
              Qty
            </Th>
            <Th
              fontWeight={700}
              border={"none"}
              textColor={"black"}
              fontSize={"14px"}
            >
              Price
            </Th>
            <Th
              fontWeight={700}
              border={"none"}
              textColor={"black"}
              fontSize={"14px"}
            >
              {" "}
              Payment Status
            </Th>
            <Th
              fontWeight={700}
              border={"none"}
              textColor={"black"}
              fontSize={"14px"}
            >
              Status
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {console.log("testing", data)}

          {data?.map((item, index) => (
            <Tr
              cursor={"pointer"}
              onClick={() => {
                item?.orderStatus === "unpaid"
                  ? toast.error("Transaction failed")
                  // : navigate(`/order-tracking?orderId=${item?.orderId}`);
                  : navigate(`/order-tracking?productId=${item?.productId}&trackingId=${item?.trackingNumber}`);
              }}
              key={index}
              h={{ base: "14", md: "24" }}
              m={2}
              borderRadius={"3px"}
              bg={"white"}
              borderBottom={"2px solid #cccccc"}
            >
              <Td
                className="hide-scrollbar"
                overflowY={"scroll"}
                w={"80"}
                gap={2}
                placeContent={"center"}
              >
                {/* {item?.orderItems?.map((item, index) => ( */}
                  <HStack key={index} minH={10} mt={1}>
                    <Image
                      w={{ base: "40px", md: "80px" }}
                      h={"10"}
                      fallbackSrc="https://placehold.co/900x400"
                      src={item?.coverImage}
                      alt="img"
                    />
                    {console.log("testing", item)}
                    <Box>
                      <Text
                        fontSize={{ base: "12px", md: "12px" }}
                        noOfLines={"1"}
                        fontWeight={700}
                      >
                        {item?.name?.slice(0, 28)} ..
                      </Text>
                      {/* <Text fontSize={{ base: "12px", md: "12px" }} fontWeight={700}>it is a long established fact that .....</Text> */}
                      {/* <Text fontSize={{ base: "12px", md: "14px" }} fontWeight={700}>Size: {item.productSize}</Text> */}
                    </Box>
                  </HStack>
                {/* ))} */}
              </Td>

              <Td w={"20"} fontWeight={"700"}>
                {item?.quantity ? item.quantity : "-"}
              </Td>
              {/* <Td w={'20'}>${!item?.originalPrice ? item?.originalPrice * item?.quantity : item?.originalPrice}</Td> */}
              <Td w={"20"}>
                $
                {item?.totalPrice
                  ? item?.totalPrice :'-'}
              </Td>
              <Td w={"28"}>
                <Text
                  textColor={statusColorMap[item?.orderStatus]}
                  fontSize={{ base: "12px", md: "14px" }}
                  fontWeight={700}
                >
                  {item?.orderStatus?.charAt(0)?.toUpperCase() +
                    item?.orderStatus?.slice(1)?.toLowerCase()}
                </Text>
              </Td>
              <Td>
                <HStack>
                  <Box
                    bg={"#19884A"}
                    h={"12px"}
                    borderRadius={"full"}
                    w={"12px"}
                  />
                  <Text
                    fontSize={{ base: "12px", md: "14px" }}
                    fontWeight={700}
                  >
                    Order Date :{" "}
                    {item?.deliveredAt
                      ? `${formatDate(item?.deliveredAt)} ${formatTime(
                          item?.deliveredAt
                        )}`
                      : ""}
                  </Text>
                </HStack>
                <Text
                  textColor={statusColorMap[item?.deliveryStatus]}
                  fontSize={{ base: "12px", md: "14px" }}
                  fontWeight={700}
                  mt={4}
                >
                  {item?.orderStatus === "paid"
                    ? item?.deliveryStatus?.charAt(0)?.toUpperCase()
                      // item?.deliveryStatus?.slice(1)?.toLowerCase()
                    : ""}
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
