import React, { useState } from "react";
import {
  Box,
  Text,
  Image,
  Button,
  HStack,
  Heading,
  AspectRatio,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import nodataFoundImg from "../../../assets/images/nodataFoundImg.png";
import { DeleteIcon } from '@chakra-ui/icons'
import { LoadingCard } from "../skeleton/Index";
import HorseApi from '../../../apis/horse.api'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { set } from "lodash";

function Card({ data, loading, getAllHorse }) {
  const Navigate = useNavigate()
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
              <Box
                maxW={"400px"}
                // bg={"#2b8f65"}
                rounded={"7px"}
                pb={1}
                kay={index}
                border={"1px solid #cccccc"}
                overflow={"hidden"}
                boxShadow={"md"}
                pos={"relative"}
              >
                <Link key={index} to={`/horse/details/${item?._id}`}>
                  <Box>
                    <AspectRatio w={{ base: "100%", md: "100%" }} ratio={4 / 3}>
                      <Image
                        fallbackSrc=""
                        m={"auto"}
                        src={item?.images?.[0]}
                        alt="card image"
                      />
                    </AspectRatio>
                  </Box>
                </Link>
                <Flex flexDir={'column'} justify={'space-between'} h={{ base: "200px", md: "100px" }} p={{ base: "2", md: "2" }} pb={2} bg={"white"}>
                  <Link key={index} to={`/horse/details/${item?._id}`}>
                    <Heading
                      fontWeight={"600"}
                      textColor={"#000000"}
                      fontSize={"18px"}
                      //   lineHeight={{ base: "12px", md: "20px" }}
                      noOfLines={1}
                    >
                      {item?.horseName} (Age:-{item?.horseAge})
                    </Heading>
                    <Text
                      fontWeight={"400"}
                      textColor={"#000000"}
                      fontSize={"15px"}
                      //   mt={0}
                      //   lineHeight={{ base: "14px", md: "20px" }}
                      noOfLines={1}
                    >
                      {item?.horseBreed}
                    </Text>
                  </Link>

                  <Flex gap={1} justifyContent={'space-between'}>
                    <Button
                      mt={1}
                      fontFamily={"Roboto,sans-serif"}
                      colorScheme="#2b8f65"
                      bg={"#2b8f65"}
                      onClick={() => Navigate(`/horse/details/${item?._id}`)}
                      textColor={"white"}
                      rounded={"md"}
                      h={{ base: "40px", md: "30px" }}
                      w={{ base: "50%", md: "24" }}
                      fontSize={{ base: "14px", md: "16px" }}
                      _hover={{ bg: "disable" }}
                      fontWeight={"500"}
                    >
                      Learn More
                    </Button>
                    <DeleteButton BtnId={item._id} getAllHorse={getAllHorse} />
                  </Flex>
                </Flex>
              </Box>
            ))
          }
        </>
      )}
    </>
  );
}

export default Card;



function DeleteButton({ BtnId, getAllHorse }) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const horseApi = new HorseApi();

  const DeleteHorse = async (id) => {
    setLoadingBtn(true);
    try {
      const Response = await horseApi.deleteHorse({
        horseId: BtnId,
      });
      if (Response.data.code === 200) {
        toast.success(Response.data.message);
        getAllHorse();
        setLoadingBtn(false);
      } else {
        toast.error(Response.data.message);
        setLoadingBtn(false);
      }
    } catch (error) {
      console.error(error);
      setLoadingBtn(false);
    }
  };
  return (
    <>
      <Button rightIcon={<DeleteIcon />} mt={1}
        fontFamily={"Roboto,sans-serif"}
        // colorScheme="#d12424"
        bg={"#d12424"}
        textColor={"white"}
        rounded={"md"}
        h={{ base: "40px", md: "30px" }}
        w={{ base: "50%", md: "auto" }}
        fontSize={{ base: "14px", md: "16px" }}
        _hover={{ bg: "disable" }}
        fontWeight={"500"}
        // disabled={loadingBtn}
        isLoading={loadingBtn}
        onClick={(() => { DeleteHorse() })}
      >
        Delete
      </Button>
    </>);
} 
