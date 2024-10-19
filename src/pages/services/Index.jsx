import React from "react";
import {
  Box,
  Text,
  HStack,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  useDisclosure,
  Spinner,
  RadioGroup,
  Radio,
  Tooltip,
  Flex,
  Badge,
  Progress,
} from "@chakra-ui/react";

import BannerImg from "../../assets/images/Serviesbanner.png";
import { CiSearch } from "react-icons/ci";

import servieceLeftImg from "../../assets/images/servieceLeftImg.png";
import horse_wu_Icon from "../../assets/images/horse-wu_Icon.png";
import ProductBanner from "../../components/shared/banner/Index";
import ServicesCard from "../../components/shared/service-card/Card";
import sortIcon from "../../assets/icons/sort.svg";
import nodataFoundImg from "../../assets/images/nodataFoundImg.png";

import {
  MainSubHeading,
  SortItems,
} from "../../components/shared/custom design/Index";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ServicesApi from "../../apis/services.api";
import SideBarComponent from "./SideBarComponent";
import { services } from "../../redux/redux-slice/others.slice";
function Index() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(null);
  const [category, setCategory] = useState([]);
  const [sliderValues, setSliderValues] = useState([0, 100000]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(9);
  const [catLoading, setCatLoading] = useState(false);
  const data = useSelector((state) => state.other.Services);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("cat");
  const subCategoryId = searchParams.get("subcat");
  const servicesApi = new ServicesApi();
  console.log(search);
  const getAllServices = async (search = "") => {
    setLoading(true);
    try {
      const ServiceResponse = await servicesApi.getAllService({
        serviceCategoryId: categoryId,
        subCategoryId,
        minPrice: sliderValues[0],
        maxPrice: sliderValues[1],
        keyWord: search,
        page: 1,
        limit,
        sort,
      });
      if (ServiceResponse.data.code === 200) {
        dispatch(services(ServiceResponse.data.data));
     
        console.log(ServiceResponse.data.data,'etstst');
        
      } else {
        toast.error(ServiceResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Something went wrong");
    } finally {
      setLoading(false); // Once initial loading is done, set it to false
    }
  };
  useEffect(() => {
    if (data.length === 0) {
      getAllServices();
    }
  }, [data.length]);

  useEffect(() => {
    getAllServices();

  }, [categoryId, subCategoryId, sliderValues, limit, sort]);

  const getAllGetCategory = async () => {
    try {
      setCatLoading(true);
      const CategoriesResponse = await servicesApi.getServiceCategory();
      if (CategoriesResponse.data.code === 200) {
        setCategory(CategoriesResponse.data.data);
        setCatLoading(false);
      } else {
        // toast.error(CategoriesResponse.data.message);
        setCatLoading(false);
      }
    } catch (error) {
      console.error(error);
      setCatLoading(false);
      // toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllGetCategory();
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
    <Box minH={"80vh"} pos={"relative"}>
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
        <Box justifyContent={"center"} w={{ base: "100%", md: "100%" }}>
          <Text
            fontWeight={"700"}
            fontSize={{ base: "16px", md: "40px" }}
            textColor={"#2b8f65"}
            textAlign={"center"}
            mt={1}
          >
            Our Services
          </Text>
          <Text
            fontWeight={"700"}
            mt={1}
            fontSize={{ base: "10px", md: "20px" }}
            textColor={"#000000"}
            textAlign={"center"}
          >
            Elevating Your Experience, Every Day.
          </Text>
        </Box>

      </HStack>
      <HStack
        flexDir={{ base: "column", lg: "row" }}
        w={{ base: "98%", md: "95%" }}
        m={"auto"}
      >
        <Box display={{ base: "none", lg: "contents" }}>
          <SideBarComponent
            loading={catLoading}
            sliderValues={sliderValues}
            category={category}
            setSliderValues={setSliderValues}
          />
        </Box>
        {/* <Sidebar /> */}
        <Box
          alignSelf={"start"}
          w={{ base: "100%", lg: "100%" }}
          rounded={"md"}
        >
          <HStack w={'100%'} m={"auto"} mt={2} justify={"space-between"}>
            <Text
              fontWeight={"600"}
              fontSize={{ base: "12px", lg: "24px" }}
              textColor={"black"}
              display={{ base: "none", md: "block" }}
            >
              Explore Services{" "}
            </Text>
            <HStack w={{ base: "100%", md: "fit-content" }}>
              <InputGroup w={{ base: "full", lg: "80" }}>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                />
                <InputRightElement>
                  <CiSearch onClick={() => getAllServices} color="green.500" />
                </InputRightElement>
              </InputGroup>
              <Tooltip hasArrow label="Add to Cart">
                <SortItems setSort={setSort} src={sortIcon} sort={sort} />
              </Tooltip>
              <Box display={{ base: "flex", lg: "none" }}>
                <SideBarComponent
                  loading={catLoading}
                  sliderValues={sliderValues}
                  category={category}
                  setSliderValues={setSliderValues}
                />
              </Box>
            </HStack>
          </HStack>
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
            {
              data && data.length > 0 ?

                <ServicesCard loading={loading} data={data} />
                : <Box
                  top="70%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  position="absolute"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={nodataFoundImg} alt="no data available" />
                </Box>}
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

const HeadingName = ({ Name }) => {
  return (
    <HStack>
      <Image src={horse_wu_Icon} alt="icon" />
      <Text
        fontWeight={"500"}
        fontSize={{ base: "10px", lg: "18px" }}
        textColor={"#000000"}
      >
        {Name}
      </Text>
    </HStack>
  );
};
const CustomProgressBar = ({ progress, name }) => {
  return (
    <Box>
      <HStack mb={-2} justify={"space-between"}>
        <Box fontSize={"20px"} textColor={"black"} fontWeight={"700"} mb={-2}>
          {name}
        </Box>
        <Badge
          mb={-1}
          textColor={"white"}
          p={1}
          w={12}
          className="Bg"
          ml="1"
          fontSize="0.8em"
        >
          {progress}%
        </Badge>
      </HStack>
      <Progress
        value={progress}
        colorScheme="blue"
        size="md"
        borderRadius="md"
        marginTop="20px"
      />
    </Box>
  );
};
