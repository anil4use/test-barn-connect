import React from "react";
import {
  Box,
  Text,
  HStack,
  Image,
  Select,
  Flex,
  Avatar,
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
  Textarea,
  Icon,
  SkeletonText,
  SkeletonCircle,
  IconButton,
} from "@chakra-ui/react";
import ProductBanner from "../../components/shared/banner/Index";

import ProductCard from "../../components/shared/Card/ProductCard";
import likeIocn from "../../assets/images/likeIocn.png";
import deliveryIcon from "../../assets/images/icon-delivery.png";
import returnIcon from "../../assets/images/Icon-return.png";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import {
  MainSubHeading,
  Rating,
} from "../../components/shared/custom design/Index";
import { Link } from "react-router-dom";
import ProductApi from "../../apis/product.api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CartApi from "../../apis/cart.api";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import WishlistApi from "../../apis/wishlist.api";
import { findProduct, setRedirectPath, userReviewAlready } from "../../utils/common.util";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { updateAllWishlist } from "../../redux/redux-slice/wishlist.slice";
import parse from 'react-html-parser';

function Index() {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);

  const [selectedImage, setSelectImage] = useState(0);
  const [activeTab, setActiveTab] = useState("features");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const auth = useAuthenticated();
  const dispatch = useDispatch();
  const [isWriteReview, setisWriteReview] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [adtoCartLoading, setAdtoCartLoading] = useState(false);
  const [loadingratin, setLoadingrating] = useState(false);
  const [loadingRating, setLoadingRating] = useState(false);
  const [Data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const productApi = new ProductApi();
  const wishlistApi = new WishlistApi();
  const cartApi = new CartApi();
  const navigate = useNavigate();

  const wishlistData = useSelector((state) => state.wishlist.Wishlist);

  const BuyProductHandler = async () => {
    if (!auth) {
      navigate("/login");
    } else {
      const cartItems = [
        {
          productId: id,
          quantity: quantity,
        },
      ];
      try {
        const addToCartResponse = await cartApi.addToCart({
          cart: cartItems,
        });
        if (addToCartResponse.data.code === 200) {
          navigate(`/check-out`);
        } else {
          toast.error(addToCartResponse.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const AddToCard = async () => {
    if (!auth) {
      navigate("/login");
    } else {
      const cartItems = [
        {
          productId: id,
          quantity: 1,
        },
      ];
      try {
        setAdtoCartLoading(true);
        const addToCartResponse = await cartApi.addToCart({
          cart: cartItems,
        });
        if (addToCartResponse.data.code === 200) {
          navigate(`/cart`);
        } else {
          toast.error(addToCartResponse.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setAdtoCartLoading(false);
      }
    }
  };

  const getProduct = async () => {
    try {
      setLoading(true);
      const productResponse = await productApi.getProductByProductId({
        productId: id,
      });
      if (productResponse.data.code === 200) {
        setData(productResponse.data.data);
        setImages(productResponse.data.data.images);
      } else {
        toast.error(productResponse.data.message);
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
      setLoadingrating(true);
      try {
        const ratingResponse = await productApi.addReviewByProductId({
          productId: id,
          description: description,
          rating: rating,
        });
        if (ratingResponse.data.code === 200) {
          setisWriteReview(false);
          getReviews();
          // getProduct()
          setLoadingrating(false);
        } else {
          setLoadingrating(false);
          return toast.error(ratingResponse.data.message);
        }
      } catch (error) {
        toast.error(error);
        setLoadingrating(false);
        return error;
      }
    }
  };

  const getReviews = async () => {
    try {
      const ratingResponse = await productApi.getReviewByProductId({
        productId: id,
      });
      if (ratingResponse.data.code === 200) {
        setReviewList(ratingResponse.data.data);
        //   getProductReview();
        //   getProductDetails();
      } else {
        return toast.error(ratingResponse.data.message);
      }
    } catch (error) {
      toast.error(error);
      return error;
    }
  };
  const addToWishlistHandler = async (productId) => {
    if (!auth) {
      setRedirectPath(location.pathname);
      navigate("/login");
    } else {
      setLoadingRating(true);
      try {
        const addWishlistResponse = await wishlistApi.addWishlist({
          productId,
        });
        if (addWishlistResponse.data.code === 200) {
          // dispatch(updateAllWishlist(addWishlistResponse.data.data));
          console.log(addWishlistResponse.data.data);
          toast.success(addWishlistResponse.data.message);
          getWishlist();
          setLoadingRating(true);
        } else {
          toast.error(addWishlistResponse.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        setLoadingRating(false);
      }
    }
  };

  useEffect(() => {
    getProduct();
    getReviews();
  }, []);

  const getWishlist = async () => {
    try {
      const getwishlistResponse = await wishlistApi.getWishlist();
      if (getwishlistResponse.data.code === 200) {
        dispatch(updateAllWishlist(getwishlistResponse.data.data));
      } else {
        toast.error(getwishlistResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
    }
  };

  function calculateDiscountPercentage(originalPrice, discountPrice) {
    // Calculate the discount percentage
    const discountPercentage = (discountPrice / originalPrice) * 100;
    return discountPercentage.toFixed(0);
  }

  return (
    <Box minH={"80vh"}>
      {/* <ProductBanner BannerImage={ProductBannerImg} Heading={'Product Details'} Breadcrumb={'Home Product Prodcut-Details'} /> */}
      <HStack
        w={{ base: "98%", lg: "90%" }}
        m={"auto"}
        mt={10}
        flexDir={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
      >
        {loading ? (
          <Flex
            direction={{
              base: "column",
              md: "row-reverse",
            }}
            minWidth={`300px`}
            placeContent={"start"}
            w={"50%"}
            cursor={`pointer`}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <SkeletonCircle size="10" />
          </Flex>
        ) : (
          <Flex
            direction={{
              base: "column",
              md: "row-reverse",
            }}
            minWidth={`300px`}
            placeContent={"start"}
            w={"50%"}
            cursor={`pointer`}
          >
            <Flex
              justifyContent={`center`}
              alignItems={`center`}
              width={{ base: "300px", md: "380px" }}
              // height={{ base: "fit-content", lg: "400px" }}
              placeSelf={"center"}
              bg={`white`}
              position={`relative`}
            >
              <Image
                maxWidth={`400px`}
                h={{ base: "fit-content", md: "360px" }}
                maxH={`400pxs`}
                w={"100%"}
                src={images[selectedImage]}
              />
            </Flex>
            <Flex
              marginTop={{ base: 3, md: 0 }}
              direction={{ base: "row", md: "column" }}
              gap={2}
              roundedBottomRight={`xl`}
              roundedBottomLeft={`xl`}
              justifyContent={{
                base: "center",
                lg: "start",
              }}
              h={{ base: "auto", md: "auto" }}
              mr={{ base: 0, md: 2 }}
            >
              <Grid
                gap={3}
                alignItems={"center"}
                justifyContent={"center"}
                alignSelf={"center"}
                templateColumns={{
                  base: "repeat(4, 1fr)",
                  md: images.length <= 4 ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
                }}
              >
                {images.map((item, index) => {
                  return (
                    <GridItem
                      bg={"#F9F9F9"}
                      key={`image-${index}`}
                      border={"1px solid #cccccc"}
                      onClick={() => setSelectImage(index)}
                    >
                      <Image
                        src={item}
                        height={{ base: "16", lg: "24" }}
                        width={{ base: "20", md: "20" }}
                        alt=""
                      />
                    </GridItem>
                  );
                })}
              </Grid>
            </Flex>
          </Flex>
        )}
        {loading ? (
          <>
            <Flex
              m={"auto"}
              flexDir={"column"}
              gap={2}
              alignSelf={"start"}
              w={{ base: "98%", lg: "50%" }}
            >
              <SkeletonText
                noOfLines={4}
                pb={10}
                spacing="4"
                skeletonHeight="1"
              />
              <SkeletonText
                mt="4"
                noOfLines={3}
                spacing="4"
                skeletonHeight="1"
              />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
              <SkeletonText
                mt="4"
                noOfLines={1}
                spacing="4"
                skeletonHeight="4"
              />
            </Flex>
          </>
        ) : (
          <Flex
            m={"auto"}
            flexDir={"column"}
            gap={2}
            alignSelf={"start"}
            w={{ base: "98%", lg: "50%" }}
          >
            <Heading
              fontWeight={"600"}
              textColor={"#2A282F"}
              fontSize={{ base: "14px", md: "28px" }}
              noOfLines={3}
            >
              {Data?.name}
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
              <Rating rating={Data?.AvgRating} />
              <Text textColor={"#bfbfbf"}>({Data?.totalReview})</Text>
              <Center height="20px">
                <Divider border={"1px solid black"} orientation="vertical" />
              </Center>
              <Text
                fontFamily={""}
                fontWeight={"700"}
                textColor={Data?.quantity === 0 ? "#ff5656" : "#2b8f65"}
              >
                {" "}
                {Data?.quantity === 0 ? "out of stock" : "In stock"}{" "}
              </Text>
            </HStack>
            {/* <Text
                                fontWeight={"600"}
                                textColor={"#000000"}
                                fontSize={{ base: "10px", md: "14px" }}
                                noOfLines={3}
                            >
                                Product Code: {Data?.productId}
                            </Text> */}
            {Data.discount ? (
              <Text
                fontWeight={"600"}
                textColor={"#FF3D00"}
                fontSize={{ base: "10px", md: "16px" }}
                noOfLines={3}
              >
                {calculateDiscountPercentage(Data.price, Data.discountPrice)} %
                OFF Last 24 hour !
              </Text>
            ) : (
              ""
            )}
            <Text
              fontSize={{ base: "16px", md: "24px" }}
              fontWeight={"bold"}
              textColor={"#FF3D00"}
            >
              $
              {(Number(Data?.price) - Number(Data?.discountPrice)).toFixed("2")}{" "}
              /-
              <Box
                ml={4}
                fontSize={{ base: "10px", md: "20px" }}
                fontWeight={"thin"}
                textColor={"#bfbfbf"}
                as="del"
              >
                ${Data?.price} /-
              </Box>
            </Text>
            <Text
              fontWeight={"400"}
              textColor={"#000000"}
              fontSize={{ base: "10px", md: "14px" }}
              noOfLines={4}
            >
              {parse(Data?.feature)}
            </Text>
            <HStack
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: "4", md: "4" }}
            >
              <HStack w={"100%"}>
                {/* <Flex
                  align="center"
                  bg={`transparent`}
                  border={"1px solid #CCCAC6"}
                  rounded={"sm"}
                  w={{ base: "full", lg: "40" }}
                  height={`40px`}
                  justify={"space-between"}
                >
                  <Button
                    bg={"none"}
                    rounded={"none"}
                    borderRight={"1px solid #CCCAC6"}
                    textColor={"black"}
                    _active={{ bg: "#2b8f65", textColor: "white" }}
                    fontSize={"40"}
                    colorScheme="#sdf"
                    isDisabled={quantity <= 1}
                    onClick={() => {
                      setQuantity(quantity - 1);
                    }}
                  >
                    -
                  </Button>
                  <Text fontWeight={"bold"} mx={{ base: "0", md: "2" }}>
                    {quantity}
                  </Text>
                  <Button
                    bg={"none"}
                    rounded={"none"}
                    borderLeft={"1px solid #CCCAC6"}
                    textColor={"black"}
                    _active={{ bg: "#2b8f65", textColor: "white" }}
                    fontSize={"28"}
                    colorScheme="#sdf"
                    isDisabled={quantity >= 10}
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </Button>
                </Flex> */}
                {/* <Button
                  bg={"#2b8f65"}
                  textColor={"white"}
                  fontSize={`16px`}
                  w={{ base: "full", lg: "40" }}
                  rounded={"sm"}
                  colorScheme="#sdf"
                  isDisabled={Data?.quantity === 0 ? true : false}
                  onClick={() => BuyProductHandler()}
                >
                  {!Data?.isRental ? "Buy Now" : "For Rental"}
                </Button> */}
                {Data?.isRental ? (
                  <Button
                    bg={"#2b8f65"}
                    textColor={"white"}
                    fontSize={`16px`}
                    w={{ base: "full", lg: "40" }}
                    rounded={"sm"}
                    colorScheme="#sdf"
                    isDisabled={Data?.quantity === 0 ? true : false}
                    onClick={() => {
                      if (auth) {
                        navigate(`/check-out?rental=true&quantity=${quantity}&productId=${Data?.productId}`)
                      } else {
                        setRedirectPath(location.pathname);
                        navigate('/login')
                      }
                    }}
                  >
                    For Rental
                  </Button>
                ) : <HStack w={"100%"}>
                  <Button
                    bg={"#d5e9e0"}
                    textColor={"black"}
                    fontSize={`16px`}
                    isLoading={adtoCartLoading}
                    rounded={"sm"}
                    onClick={() => {
                      if (auth) {
                        AddToCard()
                      } else {
                        setRedirectPath(location.pathname);
                        navigate('/login')
                      }
                    }}
                    isDisabled={Data?.quantity === 0 ? true : false}
                    w={{ base: "full", lg: "40" }}
                    colorScheme="#sdf"
                  >
                    Add To Cart
                  </Button>
                  <IconButton
                    bg={"#d5e9e0"}
                    textColor={"black"}
                    // display={{ base: "none", lg: "flex" }}
                    rounded={"sm"}
                    isLoading={loadingRating}
                    // w={{ base: "20" }}
                    onClick={() => {
                      addToWishlistHandler(Data?.productId);
                    }}
                    colorScheme="#sdf"
                    icon={
                      findProduct(Data?.productId, wishlistData) ? (
                        <FcLike size={"28px"} />
                      ) : (
                        <FaRegHeart />
                      )
                    }
                  ></IconButton>
                </HStack>}
              </HStack>
              {/* <HStack w={"100%"}>
                <Button
                  bg={"#d5e9e0"}
                  textColor={"black"}
                  fontSize={`16px`}
                  isLoading={adtoCartLoading}
                  rounded={"sm"}
                  onClick={() => AddToCard()}
                  isDisabled={Data?.quantity === 0 ? true : false}
                  w={{ base: "full", lg: "40" }}
                  colorScheme="#sdf"
                >
                  Go To Cart
                </Button>
                <IconButton
                  bg={"#d5e9e0"}
                  textColor={"black"}
                  // display={{ base: "none", lg: "flex" }}
                  rounded={"sm"}
                  isLoading={loadingRating}
                  // w={{ base: "20" }}
                  onClick={() => {
                    addToWishlistHandler(Data?.productId);
                  }}
                  colorScheme="#sdf"
                  icon={
                    findProduct(Data?.productId, wishlistData) ? (
                      <FcLike size={"28px"} />
                    ) : (
                      <FaRegHeart />
                    )
                  }
                ></IconButton>
              </HStack> */}
            </HStack>
            <Flex
              p={1}
              flexDirection={"column"}
              border={"1px solid #CCCAC6"}
              gap={4}
              mt={2}
            >
              <Flex alignItems={"center"}>
                <Image src={deliveryIcon} />
                <Box ml={4}>
                  <Heading size="sm">Free Delivery</Heading>
                  <Text
                    marginTop={`1`}
                    textDecoration={"underline"}
                    fontSize="xs"
                  >
                    Enter your pincode to check availability.
                  </Text>
                </Box>
              </Flex>
              <Divider border={"1px solid #CCCAC6"} orientation="horizontal" />
              <Flex alignItems={"center"}>
                <Image src={returnIcon} />
                <Box ml={4}>
                  <Heading size="sm">Return Delivery</Heading>
                  <Text
                    marginTop={`1`}
                    textDecoration={"underline"}
                    fontSize="xs"
                  >
                    Free 30days return policy.
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        )}
      </HStack>

      <Box
        border={"2px solid #F8F8F8"}
        width={"95%"}
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
              backgroundColor: activeTab === "features" ? "#2b8f65" : "#d5e9e0",
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
              backgroundColor: activeTab === "reviews" ? "#2b8f65" : "#d5e9e0",
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
              <Box width={"100%"}>{parse(Data?.description)}</Box>
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
                                  onClick={() => handleRatingClick(index + 1)}
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
                            isLoading={loadingratin}
                            isDisabled={rating <= 0 || description.length <= 0}
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
                                  <Text fontSize={"18px"} fontWeight={"bold"}>
                                    {row.name
                                      .split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1).toLowerCase()
                                      )
                                      .join(" ")}
                                  </Text>
                                  <Rating rating={row.rating} />
                                </Box>
                              </HStack>
                              <Text ml={14}>{row.description}</Text>
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
        <Box></Box>
      </Box>
      {/* <Box pl={4}>
                <MainSubHeading
                    fontSize={{ base: "16px", md: "20px" }}
                    textAlign="start"
                >
                    Related products with free delivery on eligible orders
                </MainSubHeading>
                <Grid
                    templateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                    }}
                    p={2}
                    gap={{ base: "3", md: "4" }}
                    pb={10}
                >
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </Grid>
            </Box>
            <Box pl={4}>
                <MainSubHeading
                    fontSize={{ base: "16px", md: "20px" }}
                    textAlign="start"
                >
                    Recently Viewed
                </MainSubHeading>
                <Grid
                    templateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                    }}
                    p={2}
                    gap={{ base: "3", md: "4" }}
                    pb={10}
                >
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </Grid>
            </Box> */}
    </Box>
  );
}

export default Index;
