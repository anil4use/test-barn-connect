import React from "react";
import {
  Box,
  Text,
  Image,
  Button,
  HStack,
  Heading,
  AspectRatio,
} from "@chakra-ui/react";
import serviesCardImg from "../../../assets/images/serviesCardImg.png";
import { Link } from "react-router-dom";
import nodataFoundImg from "../../../assets/images/nodataFoundImg.png";
import parse from 'react-html-parser'
import { LoadingCard } from "../skeleton/Index";
function Card({ data, loading }) {
  return (
    <>
      {loading ? (
        <>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </>
      ) : (
        <>
          {
            data.map((item, index) => (
              <Link key={index} to={`/service/${item?.serviceId}`}>
                <Box
                  p={1}
                  maxW={"400px"}
                  // bg={"#2b8f65"}
                  h={'320px'}
                  rounded={"7px"}
                  pb={1}
                  border={"1px solid #cccccc"}
                  overflow={"hidden"}
                  boxShadow={"md"}
                  pos={"relative"}
                >

                  <Box minH={'180px'}>
                    {/* <AspectRatio w={{ base: "100%", md: "100%" }} ratio={4 / 1}> */}
                    <Image
                      fallbackSrc=""
                      m={"auto"}
                      objectFit={'contain'}
                      src={item?.coverImage}
                      alt="card image"
                    />
                    {/* </AspectRatio> */}
                  </Box>
                  <Box display={'flex'} h={{ base: "180px", md: "120px" }} justifyContent={'space-between'} flexDir={'column'} p={{ base: "2", md: "2" }} pb={2} bg={"white"}>
                    <Box>
                      <Heading
                        fontWeight={"600"}
                        textColor={"#000000"}
                        fontSize={"18px"}
                        //   lineHeight={{ base: "12px", md: "20px" }}
                        noOfLines={2}
                      >
                        {parse(item?.name)}
                      </Heading>
                      <Text
                        fontWeight={"400"}
                        textColor={"#000000"}
                        fontSize={"15px"}
                        //   mt={0}
                        //   lineHeight={{ base: "14px", md: "20px" }}
                        noOfLines={2}
                      >
                        {parse(item?.feature)}
                      </Text>
                    </Box>

                    <Button
                      mt={1}
                      fontFamily={"Roboto,sans-serif"}
                      colorScheme="#2b8f65"
                      bg={"#2b8f65"}
                      textColor={"white"}
                      rounded={"md"}
                      h={{ base: "40px", md: "30px" }}
                      w={{ base: "full", md: "24" }}
                      fontSize={{ base: "14px", md: "16px" }}
                      _hover={{ bg: "disable" }}
                      fontWeight={"500"}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
              </Link>
            ))
          }
        </>
      )}
    </>
  );
}

export default Card;
