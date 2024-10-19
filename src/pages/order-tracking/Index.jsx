import React from "react";
import {
  Box,
  Text,
  HStack,
  Image,
  Flex,
  Button,
  Divider,
  Center,
  VStack,
} from "@chakra-ui/react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  Spinner,
  StepStatus,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { CiDeliveryTruck } from "react-icons/ci";
import Invoice from "../../assets/icons/invoice.svg";
import Visa from "../../assets/icons/visa.svg";
import OtherApi from "../../apis/other.api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { formatDate } from "@fullcalendar/core/index.js";
import { formatTime } from "../../utils/common.util";
function Index() {
  return (
    <Box pos={"relative"}>
      {/* <ProductBanner BannerImage={BannerImg} Heading={'Order-History'} Breadcrumb={'Home Order-History'} /> */}
      <HStack
        flexDir={{ base: "column", lg: "row" }}
        w={{ base: "98%", lg: "95%" }}
        m={"auto"}
      >
        {/* <ProfileSideBarComponent /> */}
        <Box
          alignSelf={"start"}
          w={{ base: "100%", md: "100%" }}
          h={{ base: "100%", md: "fit-content" }}
          mt={4}
          rounded={"md"}
        >
          <Box
            w={"100%"}
            mb={10}
            pb={2}
            overflow={{ base: "scroll", md: "unset" }}
            bg={"white"}
            borderRadius={"10px"}
            border={"1px solid #cccccc"}
          >
            <MainTable />
          </Box>
        </Box>
      </HStack>
    </Box>
  );
}

export default Index;

const MainTable = () => {
  const [data, setData] = useState([]);
  let dates = data?.trackingData?.deliveryStatusDates;

  const steps = [
    { title: "Initiated", description: dates?.pending },
    { title: "InFedExPossession", description: dates?.confirmed },
    { title: "Picked Up", description: dates?.dispatched },
    { title: "In Transit", description: dates?.inTransit },
    { title: "Delivered", description: dates?.delivered },
    // { title: "Cancelled", description: dates?.cancelled },
  ];

  const statusToIndex = {
    IN: 1,
    IP: 2,
    PU: 3,
    IT: 4,
    DL: 5,
  };

  const initialStepIndex = statusToIndex[data?.trackResult?.derivedStatusCode] || 0;
  const { activeStep, setActiveStep } = useSteps({
    index: initialStepIndex,
    // count: steps.length,
  });
  console.log(activeStep, "active steps");

  useEffect(() => {
    setActiveStep(initialStepIndex);
  }, [dates, initialStepIndex]);

  const [loading, setLoading] = useState(false);
  const max = steps.length - 1;
//   const progressPercent = (activeStep / max) * 100;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const productId = searchParams.get("productId");
  const trackingId = searchParams.get("trackingId");

  console.log(trackingId, productId, "================================>>>");

  const trackingApi = new OtherApi();
  const getStatusSummary = async () => {
    setLoading(true);
    try {
      const response = await trackingApi.trackOrder({
        productId,
        trackingId,
      });
      if (response.data.code === 200 && response.data.status === "success") {
        setData(response?.data?.data);
        // toast.success(response?.data?.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getStatusSummary();
  }, []);

  return (
    <Box p={4}>
      {loading ? (
        <>
          <HStack
            w="100%"
            h="90vh"
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
        <Box>
          <HStack justifyContent={"space-between"}>
            <Text
              fontWeight={"700"}
              fontSize={{ base: "18px", md: "30px" }}
              textColor={"#344054"}
            >
              Order ID: {data?.orderResult?.orderDetail?.orderId}
            </Text>
            {/* <Button colorScheme='' variant={'outline'}><Image mr={2} src={Invoice} /> Invoice</Button> */}
          </HStack>

          <HStack>
            <Text
              textColor={"#667085"}
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight={700}
            >
              Order date:
              <Text textColor={"#1D2939"} fontWeight={"16px"} as={"span"}>
                {" "}
                {`${formatDate(
                  data?.orderResult?.orderDetail?.orderDate
                )} ${formatTime(data?.orderResult?.orderDetail?.orderDate)}`}
              </Text>
            </Text>
            <Center height="20px">
              <Divider orientation="vertical" />
            </Center>
            <HStack
              mt={2}
              textColor={"#667085"}
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight={700}
            >
              <CiDeliveryTruck fontSize={"20px"} />
              <Text textColor={"#12B76A"} fontWeight={"16px"} as={"span"}>
                Estimated delivery:{" "}
                {formatDate(data?.orderResult?.orderDetail?.expectedDeliver)}{" "}
              </Text>
            </HStack>
          </HStack>
          <Divider my={8} border={"0.5px solid black"} />
          <Box
            display={"flex"}
            flexDir={"column"}
            gap={2}
            alignSelf={"start"}
            w={{ base: "100%", lg: "100%" }}
          >
            <Box p={2} rounded={"md"} border={"1px solid #DEDEDE"} w={"100%"}>
              <Box
                justifyContent={"space-between"}
                w={"100%"}
                flexDir={{ base: "column", md: "row" }}
                display={{ base: "flex", md: "flex" }}
                p={4}
              >
                <Box w={{ base: "100%", md: "50%" }}>
                  <Stepper
                    h={{ base: "200px", md: "300px" }}
                    orientation={"vertical"}
                    index={activeStep}
                  >
                    {steps.map((step, index) => (
                      <Step key={index}>
                        <StepIndicator>
                          <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                          />
                        </StepIndicator>
                        <Box flexShrink="0">
                          <Text textColor={"#12B76A"}>{step.title}</Text>
                          {/* <StepDescription>{step.description}</StepDescription> */}
                        </Box>
                        <StepSeparator className="bg" />
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>
            </Box>
          </Box>
          <HStack justify={"space-between"} display={"flex"} maxW={"600px"}>
            {/* <Box> */}
            <HStack>
              <Image
                src={data?.orderResult?.orderDetail?.coverImage}
                maxH={"120px"}
                maxW={"120px"}
                p={2}
              />
            </HStack>
            <VStack alignItems={"start"} p={1}>
              <Text fontSize={"12px"}>
                {data?.orderResult?.orderDetail?.productName
                  ? `${data.orderResult.orderDetail.productName.slice(0, 15)}${
                      data.orderResult.orderDetail.productName.length > 15
                        ? "..."
                        : ""
                    }`
                  : ""}
              </Text>
              <Text fontSize={"10px"}>
                Sender:{" "}
                {data?.orderResult?.orderDetail?.sender
                  ? `${data.orderResult.orderDetail.sender.slice(0, 15)}${
                      data.orderResult.orderDetail.sender.length > 15
                        ? "..."
                        : ""
                    }`
                  : ""}
                <br />
                {/* </Text> */}
                {/* <Text fontSize={"12px"}> */}
                {data?.orderResult?.orderDetail?.reducedPrice != null
                  ? `${String(data.orderResult.orderDetail.reducedPrice).slice(
                      0,
                      15
                    )}${
                      String(data.orderResult.orderDetail.reducedPrice).length >
                      15
                        ? "..."
                        : ""
                    }`
                  : ""}
                $
              </Text>
            </VStack>
            {/* </Box> */}

            {!data?.address || Object.keys(data?.address).length > 0 ? (
              <Box w={{ base: "50%", md: "40%" }}>
                <Text
                  textColor={"#000000"}
                  fontSize={"14px"}
                  fontFamily={"Inter"}
                  fontWeight={700}
                >
                  Delivery
                </Text>
                <Text mr={4} fontSize={"14px"}>
                  Address
                </Text>
                <Text
                  textColor={"#667085"}
                  fontSize={"12px"}
                  fontFamily={"Inter"}
                  fontWeight={400}
                >
                  {data?.orderResult?.recipientAddress?.firstName}{" "}
                  {data?.orderResult?.recipientAddress?.lastName}
                  {", "}
                  {data?.orderResult?.recipientAddress?.contact}
                  <Box display={{ base: "", lg: "inline-block" }} as="br" />
                  {data?.orderResult?.recipientAddress?.street}
                  {", "}
                  {data?.orderResult?.recipientAddress?.city}
                  {", "}
                  {data?.orderResult?.recipientAddress?.state}
                  {", "}
                  {data?.orderResult?.recipientAddress?.country}
                  {", "}
                  {data?.orderResult?.recipientAddress?.zipCode}{" "}
                </Text>
              </Box>
            ) : null}
          </HStack>
        </Box>
      )}
    </Box>
  );
};

// const MainTable = () => {
//     const [data, setData] = useState({});
//     const [loading, setLoading] = useState(false);

//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const productId = searchParams.get("productId");
//     const trackingId = searchParams.get("trackingId");

//     const trackingApi = new OtherApi();

//     const getStatusSummary = async () => {
//       setLoading(true);
//       try {
//         const response = await trackingApi.trackOrder({ productId, trackingId });
//         if (response.data.code === 200 && response.data.status === "success") {
//           setData(response.data.data);
//           toast.success(response.data.message);
//         } else {
//           toast.error(response.data.message);
//         }
//       } catch (error) {
//         toast.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     useEffect(() => {
//       getStatusSummary();
//     }, []);

//     const steps = [
//       { title: "Initiated", description: data.trackingData?.deliveryStatusDates?.pending },
//       { title: "In FedEx Possession", description: data.trackingData?.deliveryStatusDates?.confirmed },
//       { title: "Picked Up", description: data.trackingData?.deliveryStatusDates?.dispatched },
//       { title: "In Transit", description: data.trackingData?.deliveryStatusDates?.inTransit },
//       { title: "Delivered", description: data.trackingData?.deliveryStatusDates?.delivered },
//     ];

//     const statusToIndex = {
//       'Initiated': 0,
//       'In FedEx Possession': 1,
//       'Picked Up': 2,
//       'In Transit': 3,
//       'Delivered': 4,
//     };

//     const initialStepIndex = statusToIndex[data.trackResult?.derivedStatus] ?? 0;
//     const { activeStep, setActiveStep } = useSteps({
//       index: initialStepIndex,
//       count: steps.length,
//     });

//     useEffect(() => {
//       setActiveStep(initialStepIndex);
//     }, [data.trackResult?.derivedStatus]);

//     const formatCurrency = (value) => {
//       return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
//     };

//     return (
//       <Box p={4}>
//         {loading ? (
//           <Center height="90vh">
//             <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="#2b8f65" size="xl" />
//           </Center>
//         ) : (
//           <Box>
//             <HStack justifyContent={"space-between"}>
//               <Text fontWeight={"700"} fontSize={{ base: "18px", md: "30px" }} textColor={"#344054"}>
//                 Order ID: {data.orderResult?.orderDetail?.orderId}
//               </Text>
//             </HStack>

//             <HStack>
//               <Text textColor={"#667085"} fontSize={{ base: "12px", md: "14px" }} fontWeight={700}>
//                 Order date:
//                 <Text textColor={"#1D2939"} fontWeight={"16px"} as={"span"}>
//                   {" "}
//                   {`${formatDate(data.orderResult?.orderDetail?.orderDate)} ${formatTime(data.orderResult?.orderDetail?.orderDate)}`}
//                 </Text>
//               </Text>
//               <Center height="20px">
//                 <Divider orientation="vertical" />
//               </Center>
//               <HStack mt={2} textColor={"#667085"} fontSize={{ base: "12px", md: "14px" }} fontWeight={700}>
//                 <CiDeliveryTruck fontSize={"20px"} />
//                 <Text textColor={"#12B76A"} fontWeight={"16px"} as={"span"}>
//                   Estimated delivery: {formatDate(data.orderResult?.orderDetail?.expectedDeliver)}
//                 </Text>
//               </HStack>
//             </HStack>

//             <Divider my={8} border={"0.5px solid black"} />

//             <HStack justify={"space-between"} display={"flex"} maxW={'600px'}>
//               <Image
//                 src={data.orderResult?.orderDetail?.coverImage}
//                 maxH={"120px"}
//                 maxW={"120px"}
//                 p={2}
//               />
//               <VStack alignItems={"start"} p={1}>
//                 <Text fontSize={"12px"}>
//                   {data.orderResult?.orderDetail?.productName
//                     ? `${data.orderResult.orderDetail.productName.slice(0, 15)}${data.orderResult.orderDetail.productName.length > 15 ? "..." : ""}`
//                     : ""}
//                 </Text>
//                 <Text fontSize={"10px"}>
//                   Sender: {data.orderResult?.orderDetail?.sender
//                     ? `${data.orderResult.orderDetail.sender.slice(0, 15)}${data.orderResult.orderDetail.sender.length > 15 ? "..." : ""}`
//                     : ""}
//                 </Text>
//                 <Text fontSize={"12px"}>
//                   Price: {data.orderResult?.orderDetail?.reducedPrice != null
//                     ? `${formatCurrency(data.orderResult.orderDetail.reducedPrice)}`
//                     : ""}
//                 </Text>
//               </VStack>
//             </HStack>

//             <HStack>
//               {data?.orderResult?.recipientAddress && (
//                 <Box w={{ base: "50%", md: "40%" }}>
//                   <Text textColor={"#000000"} fontSize={"14px"} fontFamily={"Inter"} fontWeight={700}>
//                     Delivery
//                   </Text>
//                   <Text mr={4} fontSize={"14px"}>Address</Text>
//                   <Text textColor={"#667085"} fontSize={"12px"} fontFamily={"Inter"} fontWeight={400}>
//                     {`${data.orderResult?.recipientAddress?.firstName} ${data.orderResult?.recipientAddress?.lastName}, ${data.orderResult?.recipientAddress?.contact}`}
//                     <Box display={{ base: "", lg: "inline-block" }} as="br" />
//                     {`${data.orderResult?.recipientAddress?.street}, ${data.orderResult?.recipientAddress?.city}, ${data.orderResult?.recipientAddress?.state}, ${data.orderResult?.recipientAddress?.country}, ${data.orderResult?.recipientAddress?.zipCode}`}
//                   </Text>
//                 </Box>
//               )}
//             </HStack>
//           </Box>
//         )}
//       </Box>
//     );
//   };
