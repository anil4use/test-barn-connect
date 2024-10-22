import React from "react";
import {
  Box,
  Text,
  HStack,
  Image,
  Select,
  Flex,
  SimpleGrid,
  Grid,
  Heading,
  Stack,
  Card,
  CardBody,
  VStack,
  GridItem,
  Button,
  Center,
  Divider,
  Icon,
  Spinner,
  Textarea,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  OrderedList,
  ListItem,
  BreadcrumbLink,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  AspectRatio,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import BarnApi from "../../apis/barn.api";
import "./barn.css";
import testImage from "../../assets/images/testImage.png";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  StarIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import parse from 'react-html-parser';

import HourseWoman from "../../assets/images/HourseWoman.png";
import StallSizes from "../../assets/icons/stall Size icon.png";
import Wateringicon from "../../assets/icons/Watering icon.png";
import mattedIcon from "../../assets/icons/matted icon.png";
import WindowIcon from "../../assets/icons/Window icon.png";
import FanIcon from "../../assets/icons/fan icon.png";
import TrainlerParking from "../../assets/icons/trailer parking icon.png";
import RoundPenIcon from "../../assets/icons/round pen icon.png";
import IndoreIcon from "../../assets/icons/indoor icon.png";
import OutdoorIcon from "../../assets/icons/outdoor icon.png";
import heatedWash from "../../assets/icons/heated wash stall icon.png";
import LightedOutdorr from "../../assets/icons/lighted outdoor icon.png";
import LoungeIcon from "../../assets/icons/Lounge icon.png";
import HotWater from "../../assets/icons/hot Water icon.png";
import TackRoom from "../../assets/icons/tack room icon.png";
import ColdWater from "../../assets/icons/cold water icon.png";
import VendingMachineIcon from "../../assets/icons/Vendingicon.png";
import dailyTurnout from "../../assets/icons/Daily turnout icon.png";
import LaundryIcon from "../../assets/icons/Laundry icon.png";
import Wifi from "../../assets/icons/Wifi icon.png";
import MapComponent from "../../components/shared/map/map";


function Index() {
  const [rating, setRating] = useState(0);

  const auth = useAuthenticated();
  const dispatch = useDispatch();
  const [isWriteReview, setisWriteReview] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingRating, setLoadingRating] = useState(false);
  const [barnData, setBarnData] = useState([]);
  const [topBarnData, setTopBarnData] = useState([]);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const barnApi = new BarnApi();
  const navigate = useNavigate();
  const reviewDisclosure = useDisclosure();
  const amenitiesDisclosure = useDisclosure();
  const ImageModalDisclosure = useDisclosure();

  const getBarn = async () => {
    try {
      setLoading(true);
      const BarnResponse = await barnApi.getBarnById({
        barnId: id,
      });
      if (BarnResponse?.data?.code === 200) {
        setBarnData(BarnResponse?.data?.data);
        setImages(BarnResponse?.data?.data?.images);
      } else {
        toast.error(BarnResponse?.data?.message);
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
  const getAllBarns = async () => {
    setLoading(true);
    try {
      const BarnResponse = await barnApi.getAllBarns();
      if (BarnResponse?.data?.code === 200) {
        console.log(BarnResponse?.data, "test result");

        setTopBarnData(BarnResponse?.data?.data);
      } else {
        toast.error(BarnResponse?.data?.message);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Something went wrong");
    } finally {
      setLoading(false); // Once initial loading is done, set it to false
    }
  };

  const getReviews = async () => {
    try {
      const ratingResponse = await barnApi.getReviewByBarnId({
        barnId: id,
      });
      if (ratingResponse?.data?.code === 200) {
        setReviewList(ratingResponse?.data?.data);
        //   getBarnDetails();
      } else {
        return toast.error(ratingResponse?.data?.message);
      }
    } catch (error) {
      toast.error(error);
      return error;
    }
  };

  const submitRatingHandler = async () => {
    if (!auth) {
      navigate("/login");
    } else {
      setLoadingRating(true);
      try {
        const ratingResponse = await barnApi.addReviewByBarnId({
          barnId: id,
          description: description,
          rating: rating,
        });
        if (ratingResponse.data.code === 200) {
          toast.success(ratingResponse?.data?.message);
          getReviews();
          reviewDisclosure.onClose();
          setRating(null);
          setDescription("");
        } else {
          return toast.error(ratingResponse?.data?.message);
        }
      } catch (error) {
        toast.error(error);
        return error;
      } finally {
        setLoadingRating(false);
      }
    }
  };
  useEffect(() => {
    getBarn();
    getReviews();
    getAllBarns();
  }, [id]);

  const renderCustomPrevArrow = (onClickHandler, hasPrev) => {
    return (
      <Box
        cursor={"pointer"}
        position={"absolute"}
        top={"50%"}
        left={3}
        zIndex={99}
        w={{ base: "6", md: "10" }}
        h={{ base: "6", md: "10" }}
        bg={"#D5E9E0"}
        textAlign={"center"}
        alignItems={"center"}
        rounded={"full"}
        onClick={onClickHandler}
        disabled={!hasPrev}
      >
        <ArrowBackIcon
          fontSize={"20px"}
          mt={{ base: "0", md: "10px" }}
          fontWeight={"bold"}
          textColor={"black"}
        />
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
        w={{ base: "6", md: "10" }}
        h={{ base: "6", md: "10" }}
        bg={"#D5E9E0"}
        rounded={"full"}
        textAlign={"center"}
        alignItems={"center"}
        onClick={onClickHandler}
        disabled={!hasNext}
      >
        <ArrowForwardIcon
          fontSize={"20px"}
          mt={{ base: "0", md: "10px" }}
          fontWeight={"bold"}
          textColor={"black"}
        />
      </Box>
    );
  };

  return (
    <Box>
      {loading ? (
        <Box
          h={"95vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#2b8f65"
            size="xl"
          />
        </Box>
      ) : (
        <HStack
          w={{ base: "98%", md: "98%" }}
          m={"auto"}
          mt={10}
          gap={{ base: "2", lg: "2" }}
          flexDir={{ base: "column", md: "row" }}
          justifyContent={"space-between"}
        >
          <Box w={{ base: "98%", md: "98%" }}>
            <HStack pb={2} justify={"space-between"} flexWrap={"wrap"} mx={2}>
              <Box>
                <Breadcrumb fontWeight="medium" fontSize="lg" my={2}>
                  <BreadcrumbItem textColor={"#BBBBBB"}>
                    <Link to={"/"}>Home</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem textColor={"#BBBBBB"}>
                    <Link to={"/barns"}>Barns</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#">Barn details</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
                <Heading textColor={"#1C2B38"} fontSize={[20, "36px"]} my={2}>
                  {barnData?.name}
                </Heading>
                <HStack my={2}>
                  <HStack>
                    <Text>{barnData?.contact?.address} </Text> <CiLocationOn />
                  </HStack>
                </HStack>
              </Box>
              {console.log(barnData?.barnId, "barnData")}
              <Button
                onClick={() => {
                  // navigate(`/check-out?isBarn=${true}&Id=${barnData?.barnId}`)
                  navigate(
                    `/rental-check-out?isBarn=${true}&Id=${barnData?.barnId}`
                  );
                  // navigate(
                  //   `/check-out?isBarn=${true}&barnId=${barnData?.barnId}`
                  // );
                  console.log(barnData?.barnId, "barnData.BarnID");
                }}
                w={{ base: "100%", md: "40" }}
                bg={"#2B8F65"}
                textColor={"white"}
                colorScheme=""
                variant={"outline"}
              >
                Need Stall
              </Button>
            </HStack>
            <Box
              border={"1px solid #cccccc"}
              rounded={"xl"}
              overflow={"hidden"}
              w={"100%"}
            >
              {barnData?.images?.length > 0 && (
                <Carousel
                  autoPlay={false}
                  renderArrowPrev={renderCustomPrevArrow}
                  renderArrowNext={renderCustomNextArrow}
                  interval={3000}
                  showArrows={false}
                  infiniteLoop={true}
                  emulateTouch={true}
                  showIndicators={barnData?.images?.length <= 1 ? false : true}
                  showThumbs={true}
                >
                  {barnData?.images?.map((src, index) => {
                    return (
                      <AspectRatio
                        key={index}
                        width={"100%"}
                        ratio={4 / 2}
                        background={"#fff"}
                      >
                        <Image src={src} alt="Post image" />
                      </AspectRatio>
                    );
                  })}
                </Carousel>
              )}
            </Box>

            <Box
              w={{ base: "98%", md: "98%" }}
              m={"auto"}
              mt={10}
              gap={{ base: "2", lg: "10" }}
              flexDir={{ base: "column-reverse", md: "row" }}
              justifyContent={"space-between"}
            >
              <Flex
                // direction={{
                //     base: 'column',
                //     md: 'row-reverse'
                // }}
                // minWidth={`400px`}
                // placeContent={'start'}
                w={{ base: "100%", lg: "100%" }}
                cursor={`pointer`}
                flexDir={"column"}
              >
                <Text
                  as={"h2"}
                  fontSize={{ base: "20", md: "28" }}
                  textColor={"#000000"}
                  fontWeight={"bold"}
                >
                  Barn features
                </Text>
                <Text>{barnData?.feature}</Text>

                <Text
                  as={"h2"}
                  fontSize={{ base: "20", md: "28" }}
                  textColor={"#000000"}
                  fontWeight={"bold"}
                >
                  Boarding
                </Text>
                <Box p={3}>
                  <Grid
                    w={{ base: "100%", md: "100%" }}
                    templateColumns={{
                      base: "repeat(1,1fr)",
                      md: "repeat(2,1fr)",
                    }}
                    gap={4}
                  >
                    <BarnDetails
                      src={StallSizes}
                      name={"Size"}
                      name2={barnData?.boarding?.stallSizes}
                    />
                    {barnData?.boarding?.stallFeatures?.automaticWaterers && (
                      <BarnDetails
                        src={Wateringicon}
                        name={"Automatic Waters"}
                        name2={"yes"}
                      />
                    )}
                    {barnData?.boarding?.stallFeatures?.matted && (
                      <BarnDetails
                        src={mattedIcon}
                        name={"matted"}
                        name2={"yes"}
                      />
                    )}
                    {barnData?.boarding?.stallFeatures?.Windows && (
                      <BarnDetails
                        src={WindowIcon}
                        name={"Windows"}
                        name2={"yes"}
                      />
                    )}
                    {barnData?.boarding?.stallFeatures?.fans && (
                      <BarnDetails src={FanIcon} name={"Fans"} name2={"yes"} />
                    )}
                  </Grid>
                </Box>

                <Box>
                  <Amenities
                    onOpen={amenitiesDisclosure.onOpen}
                    isOpen={amenitiesDisclosure.isOpen}
                    barnData={barnData}
                    onClose={amenitiesDisclosure.onClose}
                  />
                </Box>
                <Text
                  as={"h2"}
                  fontSize={{ base: "20", md: "28" }}
                  textColor={"#000000"}
                  fontWeight={"bold"}
                >
                  Description
                </Text>
                <Text textColor={"#666666"}>{parse(barnData?.description)}</Text>
                <Box
                  border={"1px solid #cccccc"}
                  rounded={"xl"}
                  overflow={"hidden"}
                >
                  <MapComponent location={barnData?.location} />
                </Box>
                <Text
                  as={"h2"}
                  fontSize={{ base: "20", md: "28" }}
                  textColor={"#000000"}
                  fontWeight={"bold"}
                >
                  What's nearby?
                </Text>
                <Grid
                  p={2}
                  fontSize={"18px"}
                  w={{ base: "100%", md: "80%" }}
                  templateColumns={"repeat(2,1fr)"}
                  gap={2}
                >
                  {barnData?.nearBy?.map((item, index) => (
                    <Text key={index}>
                      {item?.place} - {item?.distance}
                    </Text>
                  ))}
                </Grid>
                <Text
                  as={"h2"}
                  fontSize={{ base: "20", md: "28" }}
                  textColor={"#000000"}
                  fontWeight={"bold"}
                >
                  Policies
                </Text>
                <OrderedList textColor={"666666"}>
                  {barnData?.disciplines?.map((item, index) => {
                    console.log(item);
                    return <ListItem key={index}>{item}</ListItem>;
                  })}
                </OrderedList>
                <HStack justify={"space-between"}>
                  <Text
                    as={"h2"}
                    fontSize={{ base: "20", md: "28" }}
                    textColor={"#000000"}
                    fontWeight={"bold"}
                  >
                    Rating & Reviews
                  </Text>
                  <ReviewModal
                    onOpen={reviewDisclosure.onOpen}
                    isOpen={reviewDisclosure.isOpen}
                    onClose={reviewDisclosure.onClose}
                    submitRatingHandler={submitRatingHandler}
                    handleRatingClick={handleRatingClick}
                    setDescription={setDescription}
                    description={description}
                    rating={rating}
                    setRating={setRating}
                    loadingRating={loadingRating}
                  />
                </HStack>
                <HStack py={3}>
                  <HStack
                    rounded={"sm"}
                    justify={"center"}
                    h={10}
                    w={"28"}
                    bg={"#E9A537"}
                  >
                    <Text
                      fontWeight={"bold"}
                      fontSize={"20px"}
                      textColor={"white"}
                    >
                      2.3
                    </Text>
                    <StarIcon
                      fontSize={"20px"}
                      gap={2}
                      ml={"2px"}
                      textColor="white"
                    />
                  </HStack>
                  <Text>(223 Reviews)</Text>
                </HStack>
                {reviewList?.map((item, index) => {
                  return (
                    <Box p={2}>
                      <HStack py={2} gap={4}>
                        <Avatar name="as sd" w={"16"} h={16} />
                        <Box>
                          <Text
                            fontSize={"20px"}
                            fontWeight={"400"}
                            textColor={"black"}
                          >
                            {item?.name}
                          </Text>
                          <Text
                            mt={-1}
                            fontSize={"18px"}
                            fontWeight={"400"}
                            textColor={"black"}
                          >
                            20 June
                          </Text>
                        </Box>
                      </HStack>
                      <Text
                        noOfLines={2}
                        ml={2}
                        fontWeight={500}
                        fontSize={"18px"}
                      >
                        {item?.description}
                      </Text>
                    </Box>
                  );
                })}

                {/* <Text as={'h2'} fontSize={{ base: "18", md: "20" }} textColor={'#F86800'} fontWeight={'bold'}>
                        See all reviews
                    </Text> */}
              </Flex>
            </Box>
          </Box>
          <Flex
            pos={{ base: "unset", md: "sticky" }}
            p={2}
            top={"102px"}
            flexDir={"column"}
            gap={2}
            alignSelf={"start"}
            w={{ base: "98%", md: "30%" }}
          >
            <Box
              className="hide-scrollbar"
              w={"100%"}
              p={2}
              overflowY={"auto"}
              h={"400px"}
              border={"1px solid #cccccc"}
              rounded={"lg"}
            >
              <Heading fontSize={"20px"}>Top Barns</Heading>
              <Divider mt={4} />
              {topBarnData?.map((item, index) => {
                // if (id != item.barnId) {
                return (
                  <Link key={index} to={`/barn/${item?.barnId}`}>
                    <HStack my={2}>
                      <Image
                        src={item?.coverImage}
                        w={20}
                        h={20}
                        rounded={"lg"}
                        alt=" barn images"
                      />
                      <Flex flexDir={"column"} justify={"start"}>
                        <Text noOfLines={2}>{item?.name}</Text>
                        <Text fontWeight={"bold"}>${item?.price}</Text>
                      </Flex>
                    </HStack>
                  </Link>
                );
                // }
              })}
            </Box>
          </Flex>
        </HStack>
      )}
    </Box>
  );
}

export default Index;

const BarnDetails = ({ src, name, name2 }) => {
  return (
    <HStack w={"100%"} justify={"space-between"}>
      <HStack>
        <Image w={{ base: "4", md: "6" }} src={src} />
        <Text
          fontSize={{ base: "13px", md: "18px" }}
          fontWeight={"500"}
          textColor={"black"}
        >
          {name}
        </Text>
      </HStack>
      <Text fontSize={{ base: "13px", md: "18px" }}>{name2}</Text>
    </HStack>
  );
};
const ReviewModal = ({
  isOpen,
  onClose,
  onOpen,
  submitRatingHandler,
  handleRatingClick,
  setDescription,
  description,
  setRating,
  rating,
  loadingRating,
}) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(2px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Text
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
        as={"h2"}
        fontSize={{ base: "14", md: "18" }}
        textColor={"#2B8F65"}
        fontWeight={"bold"}
      >
        + Add Reveiw
      </Text>
      <Modal isCentered size={"xl"} isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent p={2} bg={"#FAFAFA"} rounded={"2xl"}>
          <ModalBody rounded={"2xl"}>
            <Box>
              <div className="">
                <div className="">
                  <div>
                    <Text
                      textColor={"#222222"}
                      fontWeight={"semibold"}
                      textAlign={"center"}
                    >
                      {" "}
                      What is you rate?{" "}
                    </Text>
                    <HStack my={3} justify={"center"} spacing={3} marginTop={2}>
                      {[...Array(5)].map((_, index) => (
                        <Icon
                          key={`${index}`}
                          as={StarIcon}
                          w={9}
                          h={9}
                          color={index < rating ? "#FF5656" : "gray.900"}
                          cursor="pointer"
                          onClick={() => handleRatingClick(index + 1)}
                        />
                      ))}
                    </HStack>
                    <Text textAlign={"center"}>
                      {" "}
                      Please share your opinion <br />
                      about the product{" "}
                    </Text>
                  </div>
                </div>
                <Box flexDir={"column"} display={"flex"} py={3}>
                  <Textarea
                    bg={"white"}
                    placeholder="Write a review"
                    color={"gray.500"}
                    minH={"28"}
                    resize={"none"}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Box>
              </div>
            </Box>
            <HStack justifyContent={"end"}>
              <Box justifySelf={"end"} justifyContent={"end"}>
                <Button
                  mr={3}
                  h={8}
                  colorScheme="teal"
                  variant={"outline"}
                  border={"1px solid #FF3D00"}
                  textColor={"#FF3D00"}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme=""
                  aria-required
                  h={"8"}
                  isLoading={loadingRating}
                  isDisabled={rating <= 0 || description.length <= 0}
                  textColor={"white"}
                  bg={rating <= 0 ? "#2b8f65" : "#2b8f65"}
                  onClick={submitRatingHandler}
                >
                  Submit
                </Button>
              </Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
const Amenities = ({ isOpen, onClose, onOpen, barnData }) => {
  const facilities = barnData?.amenities?.facilities;
  const services = barnData?.amenities?.services;

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(2px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
        variant={"outline"}
        border={"1px solid #cccccc"}
        fontSize={{ base: "12", md: "16" }}
        textColor={"black"}
        fontWeight={"bold"}
      >
        Show All Amenities
      </Button>
      <Modal isCentered size={"4xl"} isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent p={2} bg={"#FAFAFA"} rounded={"2xl"}>
          <ModalCloseButton />

          <ModalBody rounded={"2xl"}>
            <Box h={"600px"} className="hide-scrollbar" overflowY={"scroll"}>
              <Text
                as={"h2"}
                fontSize={{ base: "20", md: "28" }}
                textColor={"#000000"}
                fontWeight={"bold"}
              >
                Property utility
              </Text>
              <Box p={3}>
                <Grid
                  w={{ base: "100%", md: "100%" }}
                  templateColumns={{
                    base: "repeat(1,1fr)",
                    md: "repeat(2,1fr)",
                  }}
                  gap={8}
                >
                  {facilities?.washStalls?.indoor && (
                    <BarnDetails
                      src={IndoreIcon}
                      name={"Indoor Arena Size"}
                      name2={facilities?.indoorArena?.size}
                    />
                  )}
                  {facilities?.washStalls?.outdoor && (
                    <BarnDetails
                      src={OutdoorIcon}
                      name={"Outdoor Arena Size"}
                      name2={facilities?.outdoorArena?.size}
                    />
                  )}
                  {
                    /* {facilities?.washStalls?.lightedOutdoorArena && */
                    <BarnDetails
                      src={LightedOutdorr}
                      name={"Lighted Outdoor Size"}
                      name2={facilities?.lightedOutdoorArena?.size}
                    />
                  }
                  {facilities?.roundPen && (
                    <BarnDetails
                      src={RoundPenIcon}
                      name={"Round Pen"}
                      name2={"yes"}
                    />
                  )}
                  {facilities?.tackRoom && (
                    <BarnDetails
                      src={TackRoom}
                      name={"Tack Room"}
                      name2={
                        facilities?.tackRoom?.shared &&
                        facilities?.tackRoom?.individualLockers
                          ? "shared / individual Lockers"
                          : facilities?.tackRoom?.shared
                          ? "shared"
                          : facilities?.tackRoom?.individualLockers
                          ? "individualLockers"
                          : ""
                      }
                    />
                  )}
                  {facilities?.trailerParking && (
                    <BarnDetails
                      src={TrainlerParking}
                      name={"Trailer Parking"}
                      name2={
                        facilities?.trailerParking?.included &&
                        facilities?.trailerParking?.fee
                          ? "included / fee"
                          : facilities?.trailerParking?.included
                          ? "included"
                          : facilities?.trailerParking?.fee
                          ? "fee"
                          : ""
                      }
                    />
                  )}
                  {facilities?.washStalls?.heated && (
                    <BarnDetails
                      src={heatedWash}
                      name={"Heated Wash Stall"}
                      name2={"yes"}
                    />
                  )}
                  {facilities?.viewingLounge && (
                    <BarnDetails
                      src={LoungeIcon}
                      name={"Viewing Lounge"}
                      name2={"yes"}
                    />
                  )}
                  {facilities?.washStalls?.hotWater && (
                    <BarnDetails
                      src={HotWater}
                      name={"Hot Water"}
                      name2={"yes"}
                    />
                  )}
                  {facilities?.washStalls?.coldWater && (
                    <BarnDetails
                      src={ColdWater}
                      name={"Cold Water"}
                      name2={"yes"}
                    />
                  )}
                </Grid>
              </Box>
              <Text
                as={"h2"}
                fontSize={{ base: "20", md: "28" }}
                textColor={"#000000"}
                fontWeight={"bold"}
              >
                Outdoor features
              </Text>
              <Box p={3}>
                <Grid
                  w={{ base: "100%", md: "100%" }}
                  templateColumns={{
                    base: "repeat(1,1fr)",
                    md: "repeat(2,1fr)",
                  }}
                  gap={8}
                >
                  {services?.laundryFacilities && (
                    <BarnDetails
                      src={LaundryIcon}
                      name={"Laundry Facilities"}
                      name2={"yes"}
                    />
                  )}
                  {services?.vendingMachines && (
                    <BarnDetails
                      src={VendingMachineIcon}
                      name={"Vending Machines"}
                      name2={"yes"}
                    />
                  )}
                  {services?.guestWiFi && (
                    <BarnDetails src={Wifi} name={"Guest Wifi"} name2={"yes"} />
                  )}
                  {!services?.dailyTurnout && (
                    <BarnDetails
                      src={dailyTurnout}
                      name={"Daily Turnout"}
                      name2={"yes"}
                    />
                  )}
                </Grid>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
