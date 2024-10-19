import React from "react";
import {
  Box,
  Text,
  Image,
  Button,
  HStack,
  Heading,
  AspectRatio,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LoadingCard } from "../skeleton/Index";
import { ArrowForwardIcon } from "@chakra-ui/icons";
function Card({ data, loading }) {
  console.log(data);
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
          {data?.map((item, Index) => {
            return (
              <Link key={Index} to={`/barn/${item?.barnId}`}>
                <Box
                  bg={"#2b8f65"}
                  pb={1}
                  rounded={"7px"}
                  border={"1px solid #cccccc"}
                  overflow={"hidden"}
                  boxShadow={"md"}
                  pos={"relative"}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <AspectRatio width={"100%"} ratio={4 / 3}>
                    <Image
                      src={item?.coverImage || item.images[0]}
                      alt="card image"
                      bgColor={"white"}
                    />
                  </AspectRatio>
                  <Box
                    p={{ base: "2", md: "2" }}
                    backgroundColor={"white"}
                    pb={2}
                    w={"100%"}
                  >
                    <Heading
                      fontWeight={"700"}
                      textColor={"black"}
                      fontSize={{ base: "14px", md: "20px" }}
                      noOfLines={1}
                    >
                      {item?.name}
                    </Heading>
                    <HStack mt={1} justifyContent={"space-between"}>
                      <Button
                        fontFamily={"Roboto,sans-serif"}
                        colorScheme="#2b8f65"
                        bg={"#2b8f65"}
                        textColor={"white"}
                        rounded={"5px"}
                        h={{ md: "30px" }}
                        w={{ base: "full", md: "24" }}
                        fontSize={{ base: "8px", md: "10px" }}
                        _hover={{ bg: "disable" }}
                        fontWeight={"500"}
                      >
                        Learn More
                        <ArrowForwardIcon
                          ml={2}
                          fontSize={{ base: "8px", md: "10px" }}
                        />
                      </Button>
                      <Text
                        fontWeight={"600"}
                        textColor={"black"}
                        fontSize={{ base: "12px", md: "16px" }}
                        noOfLines={1}
                      >
                        {item?.contact?.address}
                      </Text>
                    </HStack>
                    <VStack
                      mt={1}
                      display={{ md: "none" }}
                      justifyContent={"space-between"}
                    >
                      <Text
                        fontWeight={"600"}
                        textColor={"black"}
                        fontSize={{ base: "10px", md: "15px" }}
                        noOfLines={1}
                      >
                        {item?.contact?.address}
                      </Text>
                      <Button
                        fontFamily={"Roboto,sans-serif"}
                        colorScheme="#2b8f65"
                        bg={"#2b8f65"}
                        textColor={"white"}
                        rounded={"5px"}
                        h={"30px"}
                        mt={1}
                        w={{ base: "full", md: "24" }}
                        fontSize={{ base: "10px", md: "10px" }}
                        _hover={{ bg: "disable" }}
                        fontWeight={"500"}
                      >
                        Learn More
                        <ArrowForwardIcon
                          ml={2}
                          fontSize={{ base: "8px", md: "10px" }}
                        />
                      </Button>
                    </VStack>
                  </Box>
                </Box>
              </Link>
            );
          })}
        </>
      )}
    </>
  );
}

export default Card;
