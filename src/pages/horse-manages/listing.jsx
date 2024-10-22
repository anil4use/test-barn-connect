import React, { useState, useEffect } from "react";

import { Box, Text, HStack, Grid, Image, Button } from "@chakra-ui/react";

import BannerImg from "../../assets/images/Serviesbanner.png";
import ProductBanner from "../../components/shared/banner/Index";
import HorseCard from "../../components/shared/horse-card/Card";
import nodataFoundImg from "../../assets/images/nodataFoundImg.png";
import HorseApi from "../../apis/horse.api.js";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AllHorses } from "../../redux/redux-slice/product.slice.js";

function Index() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [catLoading, setCatLoading] = useState(false);
  const data = useSelector((state) => state.productData.horses);
  const location = useLocation();
  const horseApi = new HorseApi();
  const navigate = useNavigate();

  const getAllHorses = async () => {
    setLoading(true);
    try {
      const Response = await horseApi.getAllHorseOfUser();
      if (Response.data.code === 200) {
        dispatch(AllHorses(Response?.data.data));
      } else {
        toast.error(Response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllHorses();
  }, []);
  useEffect(() => {
    if (search) {
      const timeoutId = setTimeout(() => {
        getAllServices(search);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [search]);

  return (
    <Box minH={"120vh"} pos={"relative"}>
      <ProductBanner
        BannerImage={BannerImg}
        Heading={"Services We Provide"}
        Breadcrumb={"Home Services"}
      />
      <HStack
        m={"auto"}
        w={"95%"}
        flexDir={{ base: "column", md: "row" }}
        justify={"center"}
      >
        <Box mt={1} justifyContent={"center"} w={{ base: "100%", md: "100%" }}>
          <Text
            fontWeight={"700"}
            fontSize={{ base: "16px", md: "40px" }}
            textColor={"#2b8f65"}
            textAlign={"center"}
          >
            Our Horses
          </Text>
          <Text
            fontWeight={"700"}
            mt={{ base: "1", md: "-2" }}
            fontSize={{ base: "10px", md: "20px" }}
            textColor={"#000000"}
            textAlign={"center"}
          >
            Elevating Your Experience, Every Day.
          </Text>
          <Button
            mt={1}
            float={"inline-end"}
            variant="outline"
            colorScheme="green"
            onClick={() => navigate("/horse/register")}
          >
            Add Horse
          </Button>
        </Box>
      </HStack>
      <HStack
        flexDir={{ base: "column", lg: "row" }}
        w={{ base: "98%", md: "95%" }}
        m={"auto"}
      >
        {/* <Sidebar /> */}
        <Box
          alignSelf={"start"}
          w={{ base: "100%", lg: "100%" }}
          rounded={"md"}
        >
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            p={2}
            gap={{ base: "3", md: "4" }}
            pb={10}
          >
            {data && data.length > 0 ? (
              <HorseCard
                getAllHorse={getAllHorses}
                loading={loading}
                data={data}
              />
            ) : (
              <Box
                top="70%"
                left="50%"
                transform="translate(-50%, -50%)"
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={nodataFoundImg} alt="no data available" />
              </Box>
            )}
          </Grid>
        </Box>
      </HStack>
      <HStack
        mb={20}
        justify={"space-between"}
        gap={4}
        flexDir={{ base: "column", lg: "row" }}
        mx={2}
      >
        {/* <Box w={{ base: "100%", md: "90%", lg: "45%" }} pos={"relative"}>
          <Image src={servieceLeftImg} alt="Image" />
          <Box
            pt={"4"}
            textAlign={"center"}
            boxShadow={"md"}
            h={"150px"}
            w={{ base: "100%", lg: "250px" }}
            bg={"white"}
            pos={{ base: "initial", lg: "absolute" }}
            bottom={"-15%"}
            right={"10"}
          >
            <Text fontFamily={"Inter"} fontWeight={"700"} fontSize={"40px"}>
              {" "}
              500{" "}
              <Text as={"span"} className="pc1">
                +
              </Text>{" "}
            </Text>
            <Text fontFamily={"Inter"} fontWeight={"700"} fontSize={"20px"}>
              {" "}
              Happy Client{" "}
            </Text>
          </Box>
        </Box>
        <Box w={{ base: "100%", lg: "55%" }} textAlign={"start"}>
          <MainSubHeading textAlign="start" fontSize="20px">
            WHY CHOOSE US
          </MainSubHeading>
          <MainSubHeading textAlign="start" fontSize="30px">
            Ride with Confidence, Choose the Best
          </MainSubHeading>
          <MainSubHeading textAlign="start" fontSize="18px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </MainSubHeading>
          <Flex pt={4} flexDir={"column"} gap={4}>
            <CustomProgressBar name={"Professional Trainer"} progress={90} />
            <CustomProgressBar name={"Best Courses"} progress={80} />
            <CustomProgressBar name={"Exceptional Service"} progress={44} />
            <CustomProgressBar name={"Support 24/7"} progress={89} />
          </Flex>
        </Box> */}
      </HStack>
    </Box>
  );
}

export default Index;
