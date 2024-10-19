import { Box, Container, Flex, Heading, Text, } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./Animation.json";

const Page404 = () => {
    return (
        <Box h={{base:"80vh",md:"90vh"}} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'} p="40px 0" bg="#fff" fontFamily="'Arvo', serif">
            <Flex  h={{base:"200px",lg:"400px"}} justifyContent="center">
                <Lottie
                    // options={lottieOptions}
                    animationData={animationData}
                    height={200}
                    width={200}
                    eventListeners={[
                        {
                            eventName: "error",
                            callback: console.error,
                        },
                    ]}
                />
            </Flex>
            <Box textAlign="center" >
                <Text fontSize={{base:"40px",md:"80px"}} fontWeight={'bold'} fontStyle={'italic'}> No page Found</Text>
                <Link to={'/'}>
                    <Box color="#fff" mt="20px" display="inline-block" px="20px" py="10px" bg="#2B8F65">Go to Home</Box>
                </Link>
            </Box>
        </Box>
    );
};

export default Page404;
