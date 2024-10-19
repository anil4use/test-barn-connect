import React from "react";
import {
  Box,
  Text,
  HStack,
  Image,
  Button,
  Flex,
  SimpleGrid,
  Grid,
  Heading,
  Stack,
  Card,
  CardBody,
  VStack,
} from "@chakra-ui/react";
import Main_Img_Bg from "../../assets/images/main-img-bg.png";
import Horse_img1 from "../../assets/images/images3 (1).png";
import Horse_img2 from "../../assets/images/images3 (2).png";
import Horse_img3 from "../../assets/images/images3 (3).png";
import Horse_img4 from "../../assets/images/images3 (4).png";
import Horse_img5 from "../../assets/images/Horse-img5.png";
import ProductImgage from "../../assets/images/product.png";
import Horse_Image1 from "../../assets/images/section-2-left-img.png";

import Horse_small_Img from "../../assets/images/Horse_small_Img.png";
import LikeIcon from "../../assets/images/Like-Icon.png";
import GroupLessonss from "../../assets/images/GroupLessons.png";
import GroupPrivateRides from "../../assets/images/GroupPrivateRides.png";
import HorseGrooming from "../../assets/images/HorseGrooming.png";
import JumperLessons from "../../assets/images/JumperLessons.png";
import PrivateLessons from "../../assets/images/PrivateLessons.png";
import WeeklyLessons from "../../assets/images/Weekly-Lessons.png";
import backgroundImage2 from "../../assets/images/backgroundImage2.png";
import multiple_horses from "../../assets/images/multiple_horses.png";
import HoreseCourveImg from "../../assets/images/HoreseCourveImg.png";
import Video from "../../assets/video/video.mp4";
import ProductApi from "../../apis/product.api";
import Typewriter from "typewriter-effect";

import FaqsSection from "../../components/faqs/index";
import { useState, useRef } from "react";
import {
  MainHeading,
  MainSubHeading,
  OurButton,
} from "../../components/shared/custom design/Index";
import ImageSlider from "../../components/carousel/Index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProductSmallCartSkeleton } from "../../components/shared/skeleton/Index";
import { FloatingButton } from "../../components/shared/custom design/Index";
import BarnApi from "../../apis/barn.api";
function index() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const counter = (minimum, maximum, setter) => {
    let currentCount = minimum;
    const updateCount = () => {
      setter(currentCount);
      currentCount++;
      if (currentCount <= maximum) {
        setTimeout(updateCount, 40);
      }
    };
    updateCount();
  };
  useEffect(() => {
    counter(0, 30, setCount);
    counter(0, 340, setCount2);
    counter(0, 330, setCount3);
    counter(0, 400, setCount4);
  }, []);

  const productApi = new ProductApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const getAllgetCategory = async () => {
    try {
      setLoading(true);
      const AllProductsResponse = await productApi.allProducts({
        limit: 100,
      });
      if (AllProductsResponse.data.code === 200) {
        setProducts(AllProductsResponse.data.data);
      } else {
        toast.error(AllProductsResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const [barnData, setBarnData] = useState([]);
  const barnApi = new BarnApi();
  const getAllBarns = async () => {
    setLoadingImages(true);
    try {
      const BarnResponse = await barnApi.getAllBarns({});
      if (BarnResponse.data.code === 200) {
        setBarnData(BarnResponse.data.data);
      } else {
        toast.error(BarnResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Something went wrong");
    } finally {
      setLoadingImages(false); // Once initial loading is done, set it to false
    }
  };
  useEffect(() => {
    getAllgetCategory();
    // getAllBarns()
  }, []);

  return (
    <Box>
      <FloatingButton />
      <section>
        <Box
          bgImage={Main_Img_Bg}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
        >
          <HStack
            h={"500px"}
            w={"100%"}
            border={"1px solid black"}
            // justifyContent={'flex-end'}
            justify={"space-between"}
            justifyContent={{ base: "center", md: "space-between" }}
            flexDir={{ base: "column", md: "row" }}
            alignItems={"center"}
          >
            <Box px={2} pb={4} mt={4} ml={{ base: "0", md: "10" }}>
              <Text
                fontSize={"32px"}
                fontWeight={"700"}
                textColor={"#2b8f65"}
                fontFamily={"Kaushan,sans-serif"}
              >
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Welcome to \nBarn Connect")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Welcome to \nBarn Connect")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Welcome to \nBarn Connect")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Welcome to \nBarn Connect")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Welcome to \nBarn Connect")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Welcome to \nBarn Connect")
                      .start();
                  }}
                />
              </Text>
              <MainSubHeading
                fontSize={"20px"}
                textAlign={{ base: "center", md: "start" }}
                textColor={"#FFFFFF"}
              >
                Your one-stop horse hub for all things Equestrian -{" "}
                <Box display={{ base: "none", lg: "inline-block" }} as="br" />
                Education, Buying, Selling and Managing.
              </MainSubHeading>
              {/* <Flex mt={10} gap={"4"} flexDir={{ base: "row", md: "row" }}>
                <Button
                  fontFamily={"Roboto,sans-serif"}
                  colorScheme="#2b8f65"
                  bg={"#2b8f65"}
                  textColor={"white"}
                  rounded={"full"}
                  w={{ base: "full", lg: "60" }}
                  h={12}
                  onClick={() => navigate('/contact-us')}
                  _hover={{ bg: "disable" }}
                  fontWeight={"500"}
                >
                  Contact Us
                </Button>
                <Button
                  fontFamily={"Roboto,sans-serif"}
                  colorScheme="#2b8f65"
                  bg={"#2b8f65"}
                  textColor={"white"}
                  rounded={"full"}
                  w={{ base: "full", lg: "60" }}
                  h={12}
                  onClick={() => navigate('/become-member')}

                  _hover={{ bg: "disable" }}
                  fontWeight={"500"}
                >
                  Become a member
                </Button>
              </Flex> */}
            </Box>
          </HStack>
        </Box>
      </section>
      <Box bg={"black"} pt={4} pb={4} w={"100%"}>
        <SimpleGrid
          columns={{ base: "2", md: "2", lg: "4" }}
          spacingX="1px"
          spacingY="2px"
        >
          <Link to={'/barns'}>
            <Image w={"100%"} src={Horse_img1} align={"image"} />
          </Link>
          <Link to={'/services'}>
            <Image w={"100%"} src={Horse_img2} align={"image"} />
          </Link>
          <Link to={'/products'}>
            <Image w={"100%"} src={Horse_img3} align={"image"} />
          </Link>
          <Link to={'/become-member'}>
            <Image w={"100%"} src={Horse_img4} align={"image"} />
          </Link>
        </SimpleGrid>
      </Box>
      <section>
        <HStack
          flexDir={{ base: "column", lg: "row" }}
          justify={"space-between"}
          alignItems={"center"}
        >
          <Box w={{ base: "100%", md: "80%", lg: "40%" }} p={4}>
            <Image w={"100%"} src={Horse_Image1} />
          </Box>
          <Box w={{ base: "100%", lg: "50%" }} p={4}>
            <MainHeading textAlign={"start"}>
              WELCOME TO BARN CONNECT
            </MainHeading>
            <MainSubHeading paddingY="4" textAlign={"start"}>
              If You Need Training For Horse Riding.
            </MainSubHeading>

            <Text fontSize={"20px"} fontWeight={"500"} textColor={"black"}>
              Barn Connect is your all-in-one platform for equestrian needs. Connect with top-rated service providers like trainers, farriers, and therapists. Manage your stable with ease using our barn management tools. Explore our marketplace to rent or sell horse equipment—all in one place.
            </Text>
            <Box display={{ base: "none", lg: "inline-block" }} as="br" />

            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              gap={2}
              mt={"4"}
            >
              <HStack
                textColor={"black"}
                fontWeight={"700"}
                fontSize={{ base: "22px", md: "18px" }}
              >
                <Text textColor={"#2b8f65"}>{">>"} </Text>
                <Text fontSize={{ base: "18px" }}>
                  {" "}
                  Connect with top-rated trainers, farriers, and therapists.


                </Text>
              </HStack>
              <HStack
                textColor={"black"}
                fontWeight={"700"}
                fontSize={{ base: "22px", md: "18px" }}
              >
                <Text textColor={"#2b8f65"}>{">>"} </Text>
                <Text fontSize={{ base: "18px" }}>
                  {" "}
                  Manage your stable effortlessly with barn management tools.
                </Text>
              </HStack>
              <HStack
                textColor={"black"}
                fontWeight={"700"}
                fontSize={{ base: "22px", md: "18px" }}
              >
                <Text textColor={"#2b8f65"}>{">>"} </Text>
                <Text fontSize={{ base: "18px" }}>
                  {" "}
                  Rent and sell horse equipment in our marketplace.

                </Text>
              </HStack>
              <HStack
                textColor={"black"}
                fontWeight={"700"}
                fontSize={{ base: "22px", md: "18px" }}
              >
                <Text textColor={"#2b8f65"}>{">>"} </Text>
                <Text fontSize={{ base: "18px" }}>
                  {" "}
                  Easy booking for all equestrian services.

                </Text>
              </HStack>
              <HStack
                textColor={"black"}
                fontWeight={"700"}
                fontSize={{ base: "22px", md: "18px" }}
              >
                <Text textColor={"#2b8f65"}>{">>"} </Text>
                <Text fontSize={{ base: "18px" }}>
                  {" "}
                  Detailed profiles for horses, barns, and providers.

                </Text>
              </HStack>
              <HStack
                textColor={"black"}
                fontWeight={"700"}
                fontSize={{ base: "22px", md: "18px" }}
              >
                <Text textColor={"#2b8f65"}>{">>"} </Text>
                <Text fontSize={{ base: "18px" }}>
                  {" "}
                  Secure payments and calendar syncing.

                </Text>
              </HStack>

            </Grid>
            <Link to={"/terms-and-conditions"}>
              <Button
                mt={4}
                fontFamily={"Roboto,sans-serif"}
                colorScheme="#2b8f65"
                bg={"#2b8f65"}
                textColor={"white"}
                rounded={"full"}
                w={{ base: "full", lg: "48" }}
                h={12}
                _hover={{ bg: "disable" }}
                fontWeight={"500"}
              >
                Read More
              </Button>
            </Link>
          </Box>
        </HStack>
      </section>
      <section>
        <Box pt={4}>
          <Box
            bg={"#1E1E2F"}
            pb={{ base: "2", lg: "-2" }}
            h={{ base: "fit", md: "40" }}
            alignContent={"center"}
            w={{ base: "95%", lg: "90%" }}
            m={"auto"}
            borderRadius={"10px"}
          >
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
              gap={0}
              alignItems={"center"}
            >
              <Counter Count={count} Name={"Years Of Experience"} />
              <Counter Count={count2} Name={"Professional Trainers"} />
              <Counter Count={count3} Name={"Professional Trainers"} />
              <Counter Count={count4} Name={"Riding Courses"} />
            </Grid>
          </Box>
        </Box>
      </section>
      <Box as={"section"} py={10}>
        <MainHeading>Barns</MainHeading>
        <MainSubHeading fontSize="18px">Horse Safety Zone</MainSubHeading>

        <ImageSlider loadingImages={loadingImages} barnData={barnData} />
        {/* <Box mt={4} pb={4}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14717.32925982634!2d75.9165736!3d22.7530455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa84286eb91cf5c45%3A0xd5d1e812a21d58a1!2sNext%20Gen%20Tech%20Services%20-%20Your%20Trusted%20Tech%20Partner!5e0!3m2!1sen!2sin!4v1708602069792!5m2!1sen!2sin"
            width="100%" // Adjust the width as needed
            height="450"
            style={{ border: "0", borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box> */}
      </Box>
      <section>
        <Box pt={4} mt={4} pb={4} bg={"#e8f4ef"}>
          <MainHeading>PRODUCTS </MainHeading>
          <MainSubHeading paddingY="2" fontSize="18px">
            Browse Horse For Sale Listings
          </MainSubHeading>
          <Text
            textColor={"#000000"}
            fontSize={"16px"}
            fontWeight={"700"}
            textAlign={"center"}
          >
            Latest / Promoted Listings
          </Text>
          <HStack
            w={"100%"}
            overflowX="scroll"
            p={1}
            className="hide-scrollbar"
            placeItems={"center"}
            // templateColumns={{
            //   base: "repeat(2, 1fr)",
            //   md: "repeat(4, 1fr)",
            //   lg: "repeat(6, 1fr)",
            // }}
            gap={2}
          >
            {!loading ? (
              <>
                {products &&
                  products?.map((item, index) => {
                    return (
                      <Box
                        backgroundColor={"#2b8f65"}
                        rounded={"5px"}
                        minW={{ base: "200px", md: "245px" }}
                        key={index}
                      >
                        <Link to={`/product/${item.productId}`}>
                          <VStack p={1} rounded={"5px"} mb={1} bg={"white"}>
                            <Image
                              h={"180px"}
                              w={"100%"}
                              objectFit="cover"
                              src={item?.coverImage}
                              rounded={"5px"}
                              alt="product"
                            />
                            <Text
                              textColor={"#2A282F"}
                              noOfLines={1}
                              elipsis="true"
                              fontSize={"16px"}
                              fontWeight={"500"}
                              textAlign={"center"}
                            >
                              {item?.name}
                            </Text>
                          </VStack>
                        </Link>
                      </Box>
                    );
                  })}
              </>
            ) : (
              <>
                <ProductSmallCartSkeleton />
                <ProductSmallCartSkeleton />
                <ProductSmallCartSkeleton />
                <ProductSmallCartSkeleton />
                <ProductSmallCartSkeleton />
                <ProductSmallCartSkeleton />
              </>
            )}
          </HStack>
          <Box textAlign={"center"}>
            <Link to={"/products"}>
              <OurButton width="48">See All</OurButton>
            </Link>
          </Box>
        </Box>
      </section>

      <section>
        <Box px={2} py={10} pb={4}>
          <MainHeading>OUR SERVICES</MainHeading>
          <MainSubHeading paddingY="2" fontSize="18px">
            We Give Best Horse Care Services
          </MainSubHeading>
          <Grid
            p={1}
            placeItems={"center"}
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(6, 1fr)",
            }}
            gap={2}
          >
            <ServicesCardSmall Src={GroupLessonss} Name={"Group Lessons"} />
            <ServicesCardSmall Src={PrivateLessons} Name={"Private Lessons"} />
            <ServicesCardSmall Src={WeeklyLessons} Name={"Weekly Lessons"} />
            <ServicesCardSmall Src={JumperLessons} Name={"Jumper Lessons"} />
            <ServicesCardSmall Src={HorseGrooming} Name={"Horse Grooming"} />
            <ServicesCardSmall
              Src={GroupPrivateRides}
              Name={"Group & Private Rides"}
            />
          </Grid>
          <Box textAlign={"center"}>
            <Link to={"/services"}>
              <OurButton width="48">See All</OurButton>
            </Link>
          </Box>
        </Box>
      </section>
      <section>
        <Box
          mt={2}
          backgroundImage={backgroundImage2}
          backgroundRepeat={"no-repeat"}
        >
          <HStack
            justifyContent={"space-between"}
            flexDir={{ base: "column", md: "row" }}
            alignItems={"center"}
          >
            <Box w={{ base: "100%", md: "50%" }} p={{ base: "4", md: "20" }}>
              <MainSubHeading textAlign="start">
                Finding a Rental Property with Land Horses
              </MainSubHeading>
              <Text
                textColor={"#000000"}
                fontSize={{ base: "16px", lg: "20px" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et
                magni temporibus voluptates. Iure quam laboriosam ullam omnis
                nulla deleniti, repellendus sequi reiciendis quas voluptatibus
                consectetur alias asperna.
              </Text>
              <OurButton onClick={() => navigate("become-member")}>
                Become A Member
              </OurButton>
            </Box>
            <Box w={{ base: "100%", md: "50%" }}>
              <Image m={"auto"} src={multiple_horses} alt="img" />
            </Box>
          </HStack>
        </Box>
      </section>

      <section>
        <Text
          textColor={"black"}
          mt={4}
          textAlign={"center"}
          px={4}
          fontSize={{ base: "18px", md: "18px", lg: "30px" }}
          fontWeight={700}
        >
          Your one-stop horse hub for all things{" "}
          <Box display={{ base: "none", lg: "inline-block" }} as="br" />
          Equestrian - Buying, Selling and Managing.
        </Text>
        <Box pb={10} w={"98%"} m={"auto"}>
          <Image
            h={{ base: "100px", md: "fit-content" }}
            src={HoreseCourveImg}
            alt="horse"
          />
        </Box>
      </section>
      <section>
        {/* <Box px={2}>
          <FaqsSection />
        </Box> */}
      </section>
    </Box>
  );
}

export default index;

const ServicesCardSmall = ({ Src, Name }) => {
  return (
    <VStack
      boxShadow={"xl"}
      maxH={"268px"}
      p={1}
      bg={"white"}
      borderRadius={"24px"}
      border={"1px solid white"}
    >
      <Image w={60} m={"auto"} p={1} src={Src} alt="product" />
      <Text
        pb={2}
        textColor={"#2A282F"}
        fontSize={"18px"}
        fontWeight={"700"}
        textAlign={"center"}
      >
        {Name}
      </Text>
    </VStack>
  );
};

const MianCard = ({ }) => {
  return (
    <Card
      maxW={"480px"}
      borderRadius={"10px"}
      overflow={"hidden"}
      pos={"relative"}
    >
      <Box pos={"absolute"} right={4} top={3}>
        <Image src={LikeIcon} alt={"icon"} />
      </Box>
      <CardBody p={"0"}>
        <Image w={"100%"} src={Horse_img5} align={"Horse Image"} />
        <Stack p={3} spacing="3">
          <Heading textColor={"#2A282F"} fontSize={"20px"}>
            FEI changes maternity protection rules – first breakthrough for show
            riders
          </Heading>
          <Text textColor={"#718096"} fontSize={"14px"} fontWeight={"400"}>
            Share Hand initiates a thorough assessment to identify the most
            pressing needs within the communities.
          </Text>
          <Text textColor={"#2b8f65"} fontSize={"24px"} fontWeight={"600"}>
            $ 65,000/-
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};
const Counter = ({ Count, Name }) => {
  const [count, setCount] = useState(Count);
  useEffect(() => {
    setCount(Count);
  }, [Count]);

  return (
    <VStack textAlign={"center"}>
      <HStack
        textColor={"white"}
        fontSize={{ base: "28px", md: "28px", lg: "48px" }}
        fontWeight={800}
        lineHeight={"40px"}
      >
        <Text>{count}</Text>
        <Text textColor={"#2b8f65"}>+</Text>
      </HStack>
      <Text
        fontSize={{ base: "12px", md: "16px", lg: "20px" }}
        textColor={"#8f8f97"}
      >
        {Name}
      </Text>
    </VStack>
  );
};
const MianCard2 = () => {
  return (
    <Box
      bg={"white"}
      roundedBottomLeft={"30px"}
      overflow={"hidden"}
      display={"flex"}
      flexDir={"column"}
      roundedTop={"15px"}
      boxShadow={" rgba(0, 0, 0, 0.35) 0px 0px 7px"}
      border={"1px solid white"}
    >
      <Image
        placeSelf={"center"}
        pt={3}
        w={"24"}
        src={Horse_small_Img}
        alt="img"
      />
      <Box p={2}>
        <Text
          textAlign={"start"}
          lineHeight={"29px"}
          mt={4}
          fontSize={"22px"}
          textColor={"#2A282F"}
          fontWeight={"800"}
        >
          FEI changes maternity{" "}
          <Box display={{ base: "none", lg: "inline-block" }} as="br" />
          protection rules – first{" "}
          <Box display={{ base: "none", lg: "inline-block" }} as="br" />
          breakthrough for show{" "}
          <Box display={{ base: "none", lg: "inline-block" }} as="br" />
          riders
        </Text>
        <Text
          mb={3}
          mt={4}
          lineHeight={"20px"}
          textColor={"#718096"}
          fontWeight={"400"}
        >
          Share Hand initiates a thorough assessment to identify the most
          pressing needs within the communities.
        </Text>
      </Box>
      <Image
        roundedTopEnd={"30px"}
        w={"100%"}
        src={Horse_img5}
        align={"Horse Image"}
      />
    </Box>
  );
};
