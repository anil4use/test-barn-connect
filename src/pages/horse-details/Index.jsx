import React from "react";
import {
  Box,
  Text,
  HStack,
  Image,
  Select,
  Flex,
  SimpleGrid,
  Grid, Spinner,
  Heading,
  Stack,
  Card,
  CardBody,
  VStack,
  GridItem,
  Button,
  Center, AspectRatio,
  Divider,
  Icon,
  Textarea,
} from "@chakra-ui/react";
import likeIocn from "../../assets/images/likeIocn.png";
import testImage from "../../assets/images/testImage.png";
import { ArrowBackIcon, ArrowForwardIcon, StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { TfiLocationPin } from "react-icons/tfi";

import {
  Rating,
} from "../../components/shared/custom design/Index.jsx";
import { Link } from "react-router-dom";
import ServicesApi from "../../apis/services.api.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useDispatch } from "react-redux";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userReviewAlready } from "../../utils/common.util.js";
import toast from "react-hot-toast";
import HorseApi from "../../apis/horse.api.js";

function Index() {
  const rattin = [1, 2, 3, 3, 4];
  const [count, setCount] = useState(1);
  const [selectedImage, setSelectImage] = useState(0);
  // const images = [testImage, testImage, testImage,]
  const [activeTab, setActiveTab] = useState("features");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [rating, setRating] = useState(0);

  const auth = useAuthenticated();
  const dispatch = useDispatch();
  const [isWriteReview, setisWriteReview] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingRating, setloadingRating] = useState(false);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const servicesApi = new ServicesApi();
  const horseApi = new HorseApi();
  const navigate = useNavigate();

  const getHorseById = async () => {
    try {
      setLoading(true);
      const ServicesResponse = await horseApi.getHorseById({
        horseId: id,
      });
      if (ServicesResponse.data.code === 200) {
        setData(ServicesResponse.data.data);
        console.log(ServicesResponse.data.data);
        setImages(ServicesResponse.data.data.images);
      } else {
        toast.error(ServicesResponse.data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };
  const handleSubmit = async () => {
    if (!auth) {
      navigate("/login");
    } else {
      console.log("cli");
      setloadingRating(true);
      try {
        const ratingResponse = await servicesApi.addReviewByServicesId({
          horseId: id,
          description: description,
          rating: rating,
        });
        if (ratingResponse.data.code === 200) {
          setisWriteReview(false);
          getReviews();
          // getHorseById()
          setloadingRating(false);
        } else {
          setloadingRating(false);
          return toast.error(ratingResponse.data.message);
        }
      } catch (error) {
        toast.error(error);
        setloadingRating(false);
        return error;
      }
    }
  };

  const renderCustomPrevArrow = (onClickHandler, hasPrev) => {
    return (
      <Box
        cursor={"pointer"}
        position={"absolute"}
        top={"50%"}
        left={3}
        zIndex={99}
        w={'10'}
        h={'10'}
        bg={'#D5E9E0'}
        textAlign={'center'}
        alignItems={'center'}
        rounded={'full'}
        onClick={onClickHandler}
        disabled={!hasPrev}
      >
        <ArrowBackIcon fontSize={'20px'} mt={'10px'} fontWeight={'bold'} textColor={'black'} />
      </Box>
    );
  };

  const renderCustomNextArrow = (onClickHandler, hasNext) => {
    return (
      <Box
        cursor={"pointer"}
        position={"absolute"}
        top={"50%"}
        right={3}
        w={'10'}
        h={'10'}
        bg={'#D5E9E0'}
        rounded={'full'}
        textAlign={'center'}
        alignItems={'center'}
        onClick={onClickHandler}
        disabled={!hasNext}
      >
        <ArrowForwardIcon fontSize={'20px'} mt={'10px'} fontWeight={'bold'} textColor={'black'} />
      </Box>
    );
  };
  useEffect(() => {
    getHorseById();
  }, []);
  return (
    <div>
      {loading ? <Box h={'95vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='#2b8f65' size='xl' />
      </Box>
        : (
          <HStack
            w={{ base: "98%", md: "98%" }}
            m={"auto"}
            my={10}
            gap={{ base: "2", lg: "10" }}
            flexDir={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
          >
            <Flex
              // direction={{
              //     base: 'column',
              //     md: 'row-reverse'
              // }}
              // minWidth={`400px`}
              // placeContent={'start'}
              w={{ base: "100%", lg: "60%" }}
              cursor={`pointer`}
              flexDir={"column"}
            >
              {data?.images?.length > 0 && (
                <Carousel
                  autoPlay={false}
                  renderArrowPrev={renderCustomPrevArrow}
                  renderArrowNext={renderCustomNextArrow}
                  interval={3000}
                  showArrows={false}
                  infiniteLoop={true}
                  emulateTouch={true}
                  showIndicators={data?.images?.length <= 1 ? false : true}
                  showThumbs={true}
                >
                  {
                    data?.images?.map((src, index) => {
                      return (
                        <AspectRatio key={index} width={"100%"} ratio={4 / 2} background={"#fff"}>
                          <Image src={src} alt="Post image" />
                        </AspectRatio>
                      )
                    })
                  }
                </Carousel>
              )}
            </Flex>
            <Flex
              pos={{ base: "unset", md: "sticky" }}
              p={2}
              top={"102px"}
              flexDir={"column"}
              gap={2}
              alignSelf={"start"}
              w={{ base: "98%", md: "50%" }}
            >
              <Heading
                fontWeight={"600"}
                textColor={"#2A282F"}
                fontSize={{ base: "14px", md: "28px" }}
                noOfLines={3}
              >
                {data.horseName}
              </Heading>
              <Divider
                mt={2}
                mb={2}
                border={"1px solid #2b8f65"}
                orientation="horizontal"
              />
              <HStack
                fontSize={{ base: "12px", md: "20px" }}
                textAlign={"center"}
                alignItems={"center"}
              >
                {/* <Text textColor={"#bfbfbf"}>(150 Reviews)</Text> */}
                {/* <Center height="20px">
              <Divider border={"1px solid black"} orientation="vertical" />
            </Center> */}
                {/* <Text textColor={"rgba(43, 143, 101, 1)"}>In Stock</Text> */}
              </HStack>
              <Text
                fontWeight={"600"}
                textColor={"#000000"}
                fontSize={{ base: "14px", md: "16px" }}
                noOfLines={3}
              >
                Horse Age: {data?.horseAge}
              </Text>
              <Text
                fontWeight={"600"}
                textColor={"#000000"}
                fontSize={{ base: "14px", md: "16px" }}
                noOfLines={3}
              >
                Horse Brees: {data?.horseBreed}
              </Text>
              <HStack gap={{ base: "1", md: "4" }}>
                {/* <Link to={"/card"}>
              <Button
                bg={"#2b8f65"}
                textColor={"white"}
                fontSize={`16px`}
                w={{ base: "100%", lg: "40" }}
                rounded={"sm"}
                colorScheme="#sdf"
              >
                Request Enquiry
              </Button>
            </Link> */}
                <Button
                  bg={"#d5e9e0"}
                  textColor={"black"}
                  fontSize={`16px`}
                  rounded={"sm"}
                  w={{ base: "100%", lg: "40" }}
                  onClick={() => navigate(`/barns`)}
                  colorScheme="#sdf"
                >
                  Associate with Barn
                </Button>
                <Button
                  bg={"#d5e9e0"}
                  textColor={"black"}
                  fontSize={`16px`}
                  rounded={"sm"}
                  w={{ base: "100%", lg: "40" }}
                  colorScheme="#sdf"
                  onClick={(() => { navigate(`/horse/update/${data?._id}`) })}
                >
                  Edit Horse
                </Button>

              </HStack>
            </Flex>
          </HStack>)}
    </div>
  );
}

export default Index;
