import React from "react";
import {
  Box,
  Text,
  HStack,
  Image,
  Progress,
  Flex,
  Badge,
  Grid,
  Heading,
  Stack,
  Card,
  CardBody,
  VStack,
} from "@chakra-ui/react";
import BannerImg from "../../assets/images/BarnBannerImage.png";
import servieceLeftImg from "../../assets/images/servieceLeftImg.png";
import horse_wu_Icon from "../../assets/images/horse-wu_Icon.png";
import ProductBanner from "../../components/shared/banner/Index";
import BarnCard from "../../components/shared/Card/BarnCard";
import { MainSubHeading } from "../../components/shared/custom design/Index";
import { useState } from "react";
import { useEffect } from "react";
import SideBarComponent from "../../components/shared/sidebar/Index";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { data } from "autoprefixer";
import SidebarValues from "./SidebarValues";
import BarnApi from "../../apis/barn.api";
function Index() {
  const [progress, setProgress] = useState(12);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(null);
  const [BarnData, setBarnData] = useState([]);
  const [category, setCategory] = useState([{ name: "barn" }]);
  const [sliderValues, setSliderValues] = useState([0, 100000]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(9);
  const [initialLoading, setInitialLoading] = useState(true);
  const [catLoading, setCatLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("cat");
  const subCategoryId = searchParams.get("subcat");
  // console.log(sliderValues[0], sliderValues[1]);
  const barnApi = new BarnApi();
  const getAllBarns = async () => {
    setLoading(true);
    try {
      const BarnResponse = await barnApi.getAllBarns({
        minPrice: sliderValues[0],
        maxPrice: sliderValues[1],
      });
      if (BarnResponse.data.code === 200) {
        setBarnData(BarnResponse.data.data);
      } else {
        toast.error(BarnResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Something went wrong");
    } finally {
      setLoading(false); // Once initial loading is done, set it to false
    }
  };



  useEffect(() => {
    getAllBarns();
  }, [sliderValues]);

  return (
    <Box minH={"80vh"} pos={"relative"}>
      <ProductBanner
        BannerImage={BannerImg}
        Heading={"Barns We Provide"}
        Breadcrumb={"Home Barns"}
      />
      <HStack
        m={"auto"}
        w={"95%"}
        p={1}
        flexDir={{ base: "column", md: "row" }}
        justify={"space-between"}
      >
        <Box display={{ base: "flex", lg: "none" }}>
          <SidebarValues
            loading={catLoading}
            sliderValues={sliderValues}
            category={category}
            setSliderValues={setSliderValues}
          />
        </Box>
      </HStack>
      <Box
        mt={{ md: -5 }}
        justifyContent={"center"}
        w={{ base: "100%", md: "100%" }}
      >
        <Text
          fontWeight={"700"}
          fontSize={{ base: "16px", md: "40px" }}
          textColor={"#2b8f65"}
          textAlign={"center"}
        >
          Our Barns
        </Text>
        <Text
          fontWeight={"700"}
          mt={{ md: -2 }}
          fontSize={{ base: "10px", md: "20px" }}
          textColor={"#000000"}
          textAlign={"center"}
        >
          Transforming spaces, transforming lives
        </Text>
      </Box>
      <HStack
        flexDir={{ base: "column", lg: "row" }}
        w={{ base: "98%", md: "95%" }}
        m={"auto"}
        pb={2}
      >
        <Box display={{ base: "none", lg: "contents" }}>
          <SidebarValues
            loading={catLoading}
            sliderValues={sliderValues}
            category={category}
            setSliderValues={setSliderValues}
          />
        </Box>
        <Box w={{ base: "100%", lg: "100%" }} alignSelf={"self-start"}>
          <Grid
            alignSelf={"start"}
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            p={2}
            gap={{ base: "3", md: "4" }}
          >
            <BarnCard loading={loading} data={BarnData} />
          </Grid>
        </Box>
      </HStack>
    </Box>
  );
}

export default Index;




