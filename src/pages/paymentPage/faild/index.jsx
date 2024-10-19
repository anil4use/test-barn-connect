import { Box, Container, Flex, Heading, Text,Img } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimationData from "./Animation.json"; // Import your success animation JSON
import CancelledImg from '../../../assets/images/Cancelled.svg'
const index = () => {
    return (
        <Box h={{ base: "80vh", md: "90vh" }} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'} p="40px 0" bg="#fff" fontFamily="'Arvo', serif">
            <Flex h={{ base: "200px", lg: "400px" }} justifyContent="center">
                {/* <Lottie
                    // animationData={successAnimationData}
                    height={200}
                    width={200}
                    eventListeners={[
                        {
                            eventName: "error",
                            callback: console.error,
                        },
                    ]}
                /> */}
                <Img src={CancelledImg} alt="Success" minH={'250px'} minW={'250px'} />
            </Flex>
            <Box textAlign="center">
                <Text fontSize={{ base: "40px", md: "80px" }} fontWeight={'bold'} fontStyle={'italic'}>Failed!</Text>
                <Text fontSize={{ base: "20px", md: "30px" }} mt="10px">Your Payment was Failed.</Text>
                <Link to={'/'}>
                    <Box color="#fff" mt="20px" display="inline-block" px="20px" py="10px" bg="#2B8F65">Continue Shopping</Box>
                </Link>
            </Box>
        </Box>
    );
};

export default index;
