import React from "react";
import {
  Box,
  Text,
  HStack,
  Image,
  Flex,
  SimpleGrid,
  Grid,
  Heading,
  Stack,
  Card, FormControl, FormLabel,
  CardBody,
  VStack,
  GridItem,
  Button,
  Center, FormErrorMessage,
  useDisclosure,
  Divider,
  Icon,
  Spinner,
  Avatar,
  AspectRatio,
  Textarea,
} from "@chakra-ui/react";
import likeIocn from "../../assets/images/likeIocn.png";
import testImage from "../../assets/images/testImage.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { ArrowBackIcon, ArrowForwardIcon, StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { TfiLocationPin } from "react-icons/tfi";
import Select from 'react-select';
import ReactHtmlParser from 'react-html-parser';
import parser from 'react-html-parser'

import {
  MainSubHeading,
  Rating,
} from "../../components/shared/custom design/Index";
import { Link } from "react-router-dom";
import ServicesApi from "../../apis/services.api";
import { useDispatch } from "react-redux";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setRedirectPath, userReviewAlready } from "../../utils/common.util";
import toast from "react-hot-toast";
import { ServiceEnquiry } from "./ServiceEnquiry";
import MapComponent from "../../components/shared/map/map";
function Index() {
  const options = [
    { value: 1, label: '1 day' },
    { value: 2, label: '2 days' },
    { value: 3, label: '3 days' },
    { value: 4, label: '4 days' },
    { value: 5, label: '5 days' },
    { value: 6, label: '6 days' },
    { value: 7, label: '7 days' },
    { value: 14, label: '2 weeks' },
    { value: 21, label: '3 weeks' },
    { value: 28, label: '4 weeks' },
    { value: 30, label: '1 month' },
    { value: 60, label: '2 months' },
    { value: 90, label: '3 months' }
  ];
  const rattin = [1, 2, 3, 3, 4];
  const [count, setCount] = useState(1);
  const [selectedImage, setSelectImage] = useState(0);
  // const images = [testImage, testImage, testImage,]
  const [activeTab, setActiveTab] = useState("features");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const auth = useAuthenticated();
  const dispatch = useDispatch();
  const [isWriteReview, setisWriteReview] = useState(false);
  const [selectedDays, setSelectedDays] = useState(options[0]);

  const [reviewList, setReviewList] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingRating, setLoadingRating] = useState(false);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const servicesApi = new ServicesApi();
  const navigate = useNavigate();


  const getServices = async () => {
    try {
      setLoading(true);
      const ServicesResponse = await servicesApi.getServiceById({
        serviceId: id,
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
      setRedirectPath(location.pathname);
      navigate("/login");
    } else {
      console.log("cli");
      setLoadingRating(true);
      try {
        const ratingResponse = await servicesApi.addReviewByServicesId({
          serviceId: id,
          description: description,
          rating: rating,
        });
        if (ratingResponse.data.code === 200) {
          setisWriteReview(false);
          getReviews();
          // getServices()
          setLoadingRating(false);
        } else {
          setLoadingRating(false);
          return toast.error(ratingResponse.data.message);
        }
      } catch (error) {
        toast.error(error);
        setLoadingRating(false);
        return error;
      }
    }
  };

  const getReviews = async () => {
    try {
      const ratingResponse = await servicesApi.getReviewByServicesId({
        serviceId: id,
      });
      if (ratingResponse.data.code === 200) {
        setReviewList(ratingResponse.data.data);
        //   getServicesReview();
        //   getServicesDetails();
      } else {
        return toast.error(ratingResponse.data.message);
      }
    } catch (error) {
      toast.error(error);
      return error;
    }
  };

  useEffect(() => {
    getServices();
    getReviews();
  }, []);
  // console.log(data.map((e) => e.name, "asdf"));

  const handleSelectChange = (option) => {
    setSelectedDays(option);
  };

  function calculateDiscountPercentage(originalPrice, discountPrice) {
    // Calculate the discount percentage
    const discountPercentage = (discountPrice / originalPrice) * 100;
    return discountPercentage.toFixed(0);
  }

  console.log(data);

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


  return (
    <div>
      {
        loading ? <Box h={'95vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='#2b8f65' size='xl' />
        </Box>
          : (
            <HStack
              w={{ base: "98%", md: "98%" }}
              m={"auto"}
              mt={10}
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
                alignSelf={'start'}
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
                <Box
                  border={"2px solid #F8F8F8"}
                  width={"98%"}
                  m={"auto"}
                  bgColor={"transparent"}
                  mt={5}
                  mb={8}
                  rounded={"md"}
                  overflow={"hidden"}
                  h={"auto"}
                >
                  <Flex borderBottom={"1px solid #F0F0F0"}>
                    <Button
                      style={{
                        backgroundColor:
                          activeTab === "features" ? "#2b8f65" : "#d5e9e0",
                        color: activeTab === "features" ? "white" : "#2b8f65",
                      }}
                      p={"5px 35px"}
                      w={{ base: "100%", lg: "40" }}
                      rounded={"none"}
                      fontWeight={"md"}
                      onClick={() => handleTabClick("features")}
                      isActive={activeTab === "features"}
                    >
                      Description{" "}
                    </Button>

                    <Button
                      style={{
                        backgroundColor:
                          activeTab === "reviews" ? "#2b8f65" : "#d5e9e0",
                        color: activeTab === "reviews" ? "white" : "#2b8f65",
                      }}
                      p={"5px 40px"}
                      fontWeight={"md"}
                      w={{ base: "100%", lg: "40" }}
                      rounded={"none"}
                      onClick={() => handleTabClick("reviews")}
                      isActive={activeTab === "reviews"}
                    >
                      Review
                    </Button>
                  </Flex>
                  <Box p={{ base: "20px 10px", md: "20px 10px" }}>
                    {activeTab === "features" && (
                      <div>
                        <Box width={"100%"}>
                          {
                            parser(data?.description)
                          }
                        </Box>
                      </div>
                    )}
                    {activeTab === "reviews" && (
                      <div>
                        <Box>
                          <Flex>
                            <Flex direction={"row"} alignItems={"center"}></Flex>
                            {userReviewAlready(reviewList) && auth ? (
                              <Button
                                color="#2A7EBA"
                                fontSize={{ base: "14px", md: "16px" }}
                                size={"sm"}
                                minW={"40"}
                                ml={{ base: 2, md: 3 }}
                                onClick={(e) => {
                                  setisWriteReview(isWriteReview ? false : true);
                                }}
                              >
                                {!isWriteReview ? " Write a Review" : "Back"}
                              </Button>
                            ) : (
                              <></>
                            )}
                          </Flex>
                          <Box width={"100%"} mt={4}>
                            {isWriteReview ? (
                              <Box>
                                <div className="sp--review-bg">
                                  <div className="sp--total--rating">
                                    <div>
                                      <b> Please Submit Your Feedback Here </b>
                                      <HStack spacing={1} marginTop={2}>
                                        {[...Array(5)].map((_, index) => (
                                          <Icon
                                            key={`sp--review${index}`}
                                            as={StarIcon}
                                            w={5}
                                            h={5}
                                            color={
                                              index < rating ? "#2b8f65" : "gray.400"
                                            }
                                            cursor="pointer"
                                            onClick={() =>
                                              handleRatingClick(index + 1)
                                            }
                                          />
                                        ))}
                                      </HStack>
                                    </div>
                                  </div>
                                  <Box flexDir={"column"} display={"flex"} py={3}>
                                    <Textarea
                                      placeholder="Write a review"
                                      color={"gray.500"}
                                      maxW={"400px"}
                                      resize={"none"}
                                      onChange={(e) => {
                                        setDescription(e.target.value);
                                      }}
                                    />
                                    <Button
                                      my={2}
                                      colorScheme=""
                                      maxW={"400px"}
                                      aria-required
                                      isLoading={loadingRating}
                                      isDisabled={
                                        rating <= 0 || description.length <= 0
                                      }
                                      textColor={"white"}
                                      bg={rating <= 0 ? "#2b8f65" : "#2b8f65"}
                                      onClick={handleSubmit}
                                    >
                                      Submit
                                    </Button>
                                  </Box>
                                </div>
                              </Box>
                            ) : (
                              <>
                                {reviewList.length === 0 ? (
                                  <Flex justifyContent={"center"}>
                                    {/* <Image src={noReview} /> */}
                                    <Text fontSize={"20"}>No review found</Text>
                                  </Flex>
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                            <Box mt={4} width={"100%"}>
                              <Grid
                                templateColumns={{
                                  base: "repeat(1, 1fr)",
                                  md: "repeat(2, 1fr) ",
                                  lg: "repeat(3, 1fr)",
                                }}
                                gap={2}
                              >
                                {reviewList.map((row, index) => {
                                  return (
                                    <GridItem
                                      key={`review-${index}`}
                                      // colSpan={2}
                                      boxShadow={"20px"}
                                      p={2}
                                      bg={"#d5e9e0"}
                                      borderRadius={"3px"}
                                    >
                                      <Box>
                                        <HStack>
                                          <Avatar name={row.name} size={"md"} />
                                          <Box>
                                            <Text
                                              fontSize={"18px"}
                                              fontWeight={"bold"}
                                            >
                                              {row.name}
                                            </Text>
                                            <Rating rating={row.rating} />
                                          </Box>
                                        </HStack>
                                        <Text ml={14}>{ReactHtmlParser(row.description)}</Text>
                                      </Box>
                                    </GridItem>
                                  );
                                })}
                              </Grid>
                            </Box>
                          </Box>
                        </Box>
                      </div>
                    )}
                  </Box>
                  <Box></Box>
                </Box>
                <MapComponent location={data?.location} />

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
                  {data.name}
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
                  {rattin.map((item, index) => {
                    return (
                      <Box key={index}>
                        <StarIcon
                          ml={-1}
                          textColor={index > 3 ? "#bfbfbf" : "#2b8f65"}
                        />
                      </Box>
                    );
                  })}
                  <Text textColor={"#bfbfbf"}>({data?.totalReview} Reviews)</Text>
                  <Center height="20px">
                    <Divider border={"1px solid black"} orientation="vertical" />
                  </Center>
                  <Text textColor={"rgba(43, 143, 101, 1)"}>In Stock</Text>
                </HStack>

                <Text
                  fontWeight={"600"}
                  textColor={"#FF3D00"}
                  fontSize={{ base: "10px", md: "16px" }}
                  noOfLines={3}
                >
                  {calculateDiscountPercentage(data.price, data.discountPrice)}% OFF Last 24 hour !
                </Text>
                <Text
                  fontSize={{ base: "16px", md: "24px" }}
                  fontWeight={"bold"}
                  textColor={"#FF3D00"}
                >
                  $  {(Number(data?.price) - Number(data?.discountPrice)).toFixed("2")}{" "}/-
                  <Box
                    ml={4}
                    fontSize={{ base: "10px", md: "20px" }}
                    fontWeight={"thin"}
                    textColor={"#bfbfbf"}
                    as="del"
                  >
                    $ {data?.price}/-
                  </Box>
                </Text>
                <HStack flexWrap={'wrap'} gap={{ base: "1", md: "4" }}>
                  <FormControl w={'40'}>
                    <Select
                      styles={{ width: "60px" }}
                      value={selectedDays}
                      onChange={handleSelectChange}
                      options={options}
                      // defaultValue={options[0]}
                      placeholder='Select Days'
                    />
                    <FormErrorMessage>{''}</FormErrorMessage>
                  </FormControl>

                  <Button
                    bg={"#d5e9e0"}
                    textColor={"black"}
                    fontSize={`16px`}
                    rounded={"sm"}
                    onClick={() => {
                      if (id) {
                        if (selectedDays === null) {
                          return toast.error("Please select Days");
                        } if (auth) {
                          navigate(`/check-out?service=true&serviceId=${id}&servicePurchaseDay=${selectedDays.value}`)
                        } else {
                          setRedirectPath(location.pathname);
                          navigate('/login')

                        }
                      }
                    }}
                    w={{ base: "100%", lg: "40" }}
                    colorScheme="#sdf"
                  >
                    Service Purchase
                  </Button>
                  <ServiceEnquiry isOpen={isOpen} onOpen={onOpen} onClose={onClose} serviceId={id} />

                </HStack>
                <Text
                  fontWeight={"400"}
                  textColor={"#000000"}
                  fontSize={{ base: "10px", md: "14px" }}
                >
                  Feature:  {parser(data?.feature)}
                </Text>

              </Flex>
            </HStack>
          )}
    </div>
  );
}

export default Index;
