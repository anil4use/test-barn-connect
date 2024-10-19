import React from "react";
import {
  Box,
  Text,
  Image,
  Button,
  HStack,
  Heading,
  Grid,
  Stack,
  SkeletonText,
  Skeleton,
  SkeletonCircle,
  IconButton,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import ProductImgage from "../../../assets/images/product.png";
import AddtoCardIcon from "../../../assets/icons/AddtoCardIcon.svg";
import likeIocn from "../../../assets/images/likeIocn.png";
import nodataFoundImg from "../../../assets/images/nodataFoundImg.png";
import likedIocn from "../../../assets/images/likedIcon.png";
import { Link } from "react-router-dom";
import { FaRegImages } from "react-icons/fa";
import { Rating } from "../custom design/Index";
import WishlistApi from "../../../apis/wishlist.api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../redux/redux-slice/cart.slice";
import CartApi from "../../../apis/cart.api";
import { updateAllWishlist } from "../../../redux/redux-slice/wishlist.slice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { findProduct, setRedirectPath } from "../../../utils/common.util";
import { FcLike } from "react-icons/fc";
import { useEffect } from "react";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { LoadingCard } from "../skeleton/Index";
import { useAuthenticated } from "../../../hooks/useAuthenticated.hook";
import { useNavigate } from "react-router-dom";
import parse from 'react-html-parser'

function Card({ productData, loading }) {
  const auth = useAuthenticated();
  const dispatch = useDispatch();
  const wishlistApi = new WishlistApi();
  const wishlistData = useSelector((state) => state.wishlist.Wishlist);
  const rentalToggle = useSelector((state) => state?.productData?.rentalToggle);
  console.log(rentalToggle, 'rentalToggle');
  function calculateDiscountPercentage(originalPrice, discountPrice) {
    // Calculate the discount percentage
    const discountPercentage = (discountPrice / originalPrice) * 100;
    return discountPercentage.toFixed(0);
  }
  const getWishlist = async () => {
    try {
      const getWishlistResponse = await wishlistApi.getWishlist();
      if (getWishlistResponse.data.code === 200) {
        dispatch(updateAllWishlist(getWishlistResponse.data.data));
      } else {
        toast.error(getWishlistResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
    }
  };
  return (
    <>
      {loading ? (
        <>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </>
      ) : (
        <>
          {rentalToggle ? (
            <>
              {" "}
              {productData && productData.length > 0 ? (
                productData.map((item, index) => (
                  <>
                    {rentalToggle && item?.isRental ? (
                      <Box
                        key={index}
                        maxW={"400px"}
                        flex={1}
                        h={{ base: "280px", md: "400px" }}
                        borderTop={"1px solid #f7efef"}
                        bg={"white"}
                        rounded={"14px"}
                        overflow={"hidden"}
                        boxShadow={"md"}
                        pos={"relative"}
                      >
                        {item.discount === true || item.discount === "true" ? (
                          <Box
                            bg={"rgba(255, 86, 86, 1)"}
                            w={{ base: "14", md: "20" }}
                            top={0}
                            borderRadius={"2px"}
                            left={0}
                            fontSize={{ base: "12px", md: "16px" }}
                            borderBottomRightRadius={{ base: "4", md: "8" }}
                            pos={"absolute"}
                            textColor={"white"}
                            textAlign={"center"}
                            fontWeight={"600"}
                            pt={1}
                            h={{ base: "6", md: "8" }}
                          >
                            {calculateDiscountPercentage(
                              item.price,
                              item.discountPrice
                            )}
                            % Off
                          </Box>
                        ) : (
                          ""
                        )}
                        <WishlistComponent
                          getWishlist={getWishlist}
                          findProduct={findProduct}
                          item={item}
                          wishlistData={wishlistData}
                        />
                        <Box
                          rounded={"12px"}
                          overflow={"hidden"}
                          // m={'2'}
                          h={"65%"}
                          display={"flex"}
                          alignContent={"center"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          mb={"auto"}
                          justifySelf={"center"}
                        // pb={4}
                        >
                          <Link to={`/product/${item?.productId}`}>
                            <Image
                              //   maxW={{ base: "120px", md: "200px" }}
                              //   maxH={{ base: "120px", md: "200px" }}
                              w={"100%"}
                              h={"100%"}
                              objectFit="cover"
                              src={item?.coverImage}
                              // src={ProductImgage}
                              alt="banner image"
                            />
                          </Link>
                        </Box>
                        <Box
                          p={{ base: "2", md: "4" }}
                          pb={{ base: "1", md: "2" }}
                          bg={"white"}
                          w={"100%"}
                          bottom={"0"}
                          pos={"absolute"}
                        >
                          <Link to={`/product/${item?.productId}`}>
                            <Heading
                              fontWeight={"600"}
                              textColor={"#2A282F"}
                              fontSize={{ base: "14px", md: "18px" }}
                              lineHeight={{ base: "20px", md: "29px" }}
                              noOfLines={2}
                            >
                              {item?.name}
                            </Heading>
                            <HStack
                              gap={0}
                              fontSize={{ base: "10px", md: "20px" }}
                              textAlign={"center"}
                              alignItems={"center"}
                            >
                              <Rating rating={item?.avgRating} />
                              <Text textColor={"#bfbfbf"}>
                                <Text textColor={"#bfbfbf"}>
                                  {item?.reviewTotal !== 0 ? (
                                    <>({item.reviewTotal})</>
                                  ) : (
                                    ""
                                  )}
                                </Text>
                              </Text>
                            </HStack>
                            <Text
                              fontSize={{ base: "16px", md: "20px" }}
                              fontWeight={"bold"}
                              textColor={"#DB4444"}
                            >
                              $
                              {(
                                Number(item?.price) -
                                Number(item?.discountPrice)
                              ).toFixed("2")}{" "}
                              /-
                              <Box
                                ml={4}
                                fontSize={{ base: "10px", md: "20px" }}
                                textColor={"#bfbfbf"}
                                as="del"
                              >
                                ${item?.price}/-
                              </Box>
                            </Text>
                          </Link>

                          <HStack mt={1}>
                            <AddToCartComponent item={item} />
                            <Text
                              fontFamily={"Poppins"}
                              fontWeight={"600"}
                              fontSize={{ base: "14px", md: "16px" }}
                              textColor={
                                item?.quantity === 0 ? "#ff5656" : "#2b8f65"
                              }
                            >
                              {" "}
                              {item?.quantity === 0
                                ? "Out of stock"
                                : "In stock"}{" "}
                            </Text>
                          </HStack>
                        </Box>
                      </Box>
                    ) : null}
                  </>
                ))
              ) : (
                <Box
                  // border="1px solid red"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  position="absolute"
                  // width="100%"
                  // height="100%"

                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={nodataFoundImg} alt="no data available" />
                </Box>
              )}
            </>
          ) : (
            <>
              {productData && productData.length > 0 ? (
                productData.map((item, index) => (
                  <Box
                    key={index}
                    maxW={"400px"}
                    flex={1}
                    h={{ base: "280px", md: "400px" }}
                    borderTop={"1px solid #f7efef"}
                    bg={"white"}
                    rounded={"14px"}
                    overflow={"hidden"}
                    boxShadow={"md"}
                    pos={"relative"}
                  >
                    {item.discount === true || item.discount === "true" ? (
                      <Box
                        bg={"rgba(255, 86, 86, 1)"}
                        w={{ base: "14", md: "20" }}
                        top={0}
                        borderRadius={"2px"}
                        left={0}
                        fontSize={{ base: "12px", md: "16px" }}
                        borderBottomRightRadius={{ base: "4", md: "8" }}
                        pos={"absolute"}
                        textColor={"white"}
                        textAlign={"center"}
                        fontWeight={"600"}
                        pt={1}
                        h={{ base: "6", md: "8" }}
                      >
                        {calculateDiscountPercentage(
                          item.price,
                          item.discountPrice
                        )}
                        % Off
                      </Box>
                    ) : (
                      ""
                    )}
                    <WishlistComponent
                      getWishlist={getWishlist}
                      findProduct={findProduct}
                      item={item}
                      wishlistData={wishlistData}
                    />
                    <Link to={`/product/${item?.productId}`}>

                      <Box
                        roundedTop={"12px"}
                        overflow={"hidden"}
                        // m={'2'}
                        // h={"65%"}
                        // border={'1px'}
                        h={'230px'}
                        // minH={'300px'}
                        // maxH={'300px'}
                        // h={'250px'}
                        // display={"flex"}
                        // alignContent={"center"}
                        // alignItems={"center"}
                        // justifyContent={"center"}
                        objectFit={'cover'}
                        backgroundRepeat={'no-repeat'}
                        backgroundPosition={'center'}
                        backgroundSize={'cover'}
                        // mb={"auto"}
                        // justifySelf={"center"}
                        // pb={4}
                        backgroundImage={item?.coverImage || BrokenImage}
                      >
                      </Box>
                    </Link>
                    <Box
                      p={{ base: "2", md: "4" }}
                      pb={{ base: "1", md: "2" }}
                      bg={"white"}
                      w={"100%"}
                      bottom={"0"}
                      pos={"absolute"}
                    >
                      <Link to={`/product/${item?.productId}`}>
                        <Heading
                          fontWeight={"600"}
                          textColor={"#2A282F"}
                          fontSize={{ base: "14px", md: "18px" }}
                          lineHeight={{ base: "20px", md: "29px" }}
                          noOfLines={2}
                        >
                          {item?.name}
                        </Heading>
                        <HStack
                          gap={0}
                          fontSize={{ base: "10px", md: "20px" }}
                          textAlign={"center"}
                          alignItems={"center"}
                        >
                          <Rating rating={item?.avgRating} />
                          <Text textColor={"#bfbfbf"}>
                            <Text textColor={"#bfbfbf"}>
                              {item?.reviewTotal !== 0 ? (
                                <>({item.reviewTotal})</>
                              ) : (
                                ""
                              )}
                            </Text>
                          </Text>
                        </HStack>
                        <Text
                          fontSize={{ base: "16px", md: "20px" }}
                          fontWeight={"bold"}
                          textColor={"#DB4444"}
                        >
                          $
                          {(
                            Number(item?.price) - Number(item?.discountPrice)
                          ).toFixed("2")}{" "}
                          /-
                          <Box
                            ml={4}
                            fontSize={{ base: "10px", md: "20px" }}
                            textColor={"#bfbfbf"}
                            as="del"
                          >
                            ${item?.price}/-
                          </Box>
                        </Text>
                      </Link>

                      <HStack mt={1}>
                        <AddToCartComponent item={item} />
                        <Text
                          fontFamily={"Poppins"}
                          fontWeight={"600"}
                          fontSize={{ base: "14px", md: "16px" }}
                          textColor={
                            item?.quantity === 0 ? "#ff5656" : "#2b8f65"
                          }
                        >
                          {" "}
                          {item?.quantity === 0
                            ? "Out of stock"
                            : "In stock"}{" "}
                        </Text>
                      </HStack>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box
                  // border="1px solid red"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  position="absolute"
                  // width="100%"
                  // height="100%"

                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={nodataFoundImg} alt="no data available" />
                </Box>
              )}
            </>
          )}
          {/* {productData && productData.length > 0 ? (
            productData.map((item, index) => (   
              <Box
                key={index}
                maxW={"400px"}
                flex={1}
                h={{ base: "280px", md: "400px" }}
                borderTop={"1px solid #f7efef"}
                bg={"white"}
                rounded={"14px"}
                overflow={"hidden"}
                boxShadow={"md"}
                pos={"relative"}
              >
                {item.discount === true || item.discount === "true" ? (
                  <Box
                    bg={"rgba(255, 86, 86, 1)"}
                    w={{ base: "14", md: "20" }}
                    top={0}
                    borderRadius={"2px"}
                    left={0}
                    fontSize={{ base: "12px", md: "16px" }}
                    borderBottomRightRadius={{ base: "4", md: "8" }}
                    pos={"absolute"}
                    textColor={"white"}
                    textAlign={"center"}
                    fontWeight={"600"}
                    pt={1}
                    h={{ base: "6", md: "8" }}
                  >
                    {calculateDiscountPercentage(
                      item.price,
                      item.discountPrice
                    )}
                    % Off
                  </Box>
                ) : (
                  ""
                )}
                <WishlistComponent
                  getWishlist={getWishlist}
                  findProduct={findProduct}
                  item={item}
                  wishlistData={wishlistData}
                />
                <Box
                  rounded={"12px"}
                  overflow={"hidden"}
                  // m={'2'}
                  h={"65%"}
                  display={"flex"}
                  alignContent={"center"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  mb={"auto"}
                  justifySelf={"center"}
                  // pb={4}
                >
                  <Link to={`/product/${item?.productId}`}>
                    <Image
                      //   maxW={{ base: "120px", md: "200px" }}
                      //   maxH={{ base: "120px", md: "200px" }}
                      w={"100%"}
                      h={"100%"}
                      objectFit="cover"
                      src={item?.coverImage}
                      // src={ProductImgage}
                      alt="banner image"
                    />
                  </Link>
                </Box>
                <Box
                  p={{ base: "2", md: "4" }}
                  pb={{ base: "1", md: "2" }}
                  bg={"white"}
                  w={"100%"}
                  bottom={"0"}
                  pos={"absolute"}
                >
                  <Link to={`/product/${item?.productId}`}>
                    <Heading
                      fontWeight={"600"}
                      textColor={"#2A282F"}
                      fontSize={{ base: "14px", md: "18px" }}
                      lineHeight={{ base: "20px", md: "29px" }}
                      noOfLines={2}
                    >
                      {item?.name}
                    </Heading>
                    <HStack
                      gap={0}
                      fontSize={{ base: "10px", md: "20px" }}
                      textAlign={"center"}
                      alignItems={"center"}
                    >
                      <Rating rating={item?.avgRating} />
                      <Text textColor={"#bfbfbf"}>
                        <Text textColor={"#bfbfbf"}>
                          {item?.reviewTotal !== 0 ? (
                            <>({item.reviewTotal})</>
                          ) : (
                            ""
                          )}
                        </Text>
                      </Text>
                    </HStack>
                    <Text
                      fontSize={{ base: "16px", md: "20px" }}
                      fontWeight={"bold"}
                      textColor={"#DB4444"}
                    >
                      $
                      {(
                        Number(item?.price) - Number(item?.discountPrice)
                      ).toFixed("2")}{" "}
                      /-
                      <Box
                        ml={4}
                        fontSize={{ base: "10px", md: "20px" }}
                        textColor={"#bfbfbf"}
                        as="del"
                      >
                        ${item?.price}/-
                      </Box>
                    </Text>
                  </Link>

                  <HStack mt={1}>
                    <AddToCartComponent item={item} />
                    <Text
                      fontFamily={"Poppins"}
                      fontWeight={"600"}
                      fontSize={{ base: "14px", md: "16px" }}
                      textColor={item?.quantity === 0 ? "#ff5656" : "#2b8f65"}
                    >
                      {" "}
                      {item?.quantity === 0 ? "Out of stock" : "In stock"}{" "}
                    </Text>
                  </HStack>
                </Box>
              </Box>
            ))
          ) : (
            <Box
              // border="1px solid red"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              position="absolute"
              // width="100%"
              // height="100%"

              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={nodataFoundImg} alt="no data available" />
            </Box>
          )} */}
        </>
      )}
    </>
  );
}

export default Card;

const WishlistComponent = ({
  findProduct,
  item,
  wishlistData,
  getWishlist,
}) => {
  const auth = useAuthenticated();
  const [loadingRating, setLoadingRating] = useState(false);
  const wishlistApi = new WishlistApi();
  const navigate = useNavigate();
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
  const removeWishlistHandler = async (productId) => {
    setLoadingRating(true);
    try {
      const removeWishlistResponse = await wishlistApi.removeWishlist({
        productId,
      });
      if (removeWishlistResponse.data.code === 200) {
        getWishlist();
        toast.success(removeWishlistResponse.data.message);
        setLoadingRating(false);
      } else {
        toast.error(removeWishlistResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoadingRating(false);
    }
  };

  return (
    <Tooltip
      hasArrow
      label={
        !findProduct(item.productId, wishlistData)
          ? "Add To Wishlist"
          : "Remove From Wishlist"
      }
    >
      <IconButton
        position={"absolute"}
        top={{ base: "0px", md: "3" }}
        right={{ base: "1px", md: "3" }}
        bg={"white"}
        fontSize={{ base: "16px", md: "24" }}
        aria-label="wishlist"
        isDisabled={loadingRating}
        icon={
          findProduct(item.productId, wishlistData) ? (
            <FcLike size={"28px"} />
          ) : (
            <FaRegHeart />
          )
        }
        rounded={"full"}
        onClick={(e) => {
          if (findProduct(item.productId, wishlistData)) {
            removeWishlistHandler(item.productId);
          } else {
            addToWishlistHandler(item?.productId);
          }
        }}
      />
    </Tooltip>
  );
};
const AddToCartComponent = ({ item }) => {
  const cartApi = new CartApi();
  const auth = useAuthenticated();
  const [loadingATC, setLoadingATC] = useState(false);
  const navigate = useNavigate();

  const AddtoCart = async (item) => {
    if (!auth) {
      navigate("/login");
    } else {
      setLoadingATC(true);
      const cartItems = [
        {
          productId: item.productId,
          quantity: 1,
        },
      ];
      try {
        const addToCartResponse = await cartApi.addToCart({
          cart: cartItems,
        });
        if (addToCartResponse.data.code === 200) {
          toast.success("cart added successfully");
        } else {
          toast.error(addToCartResponse.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        setLoadingATC(false);
      }
    }
  };
  return (
    <Tooltip hasArrow label="Add to Cart">
      <Button
        isDisabled={item?.quantity === 0 || loadingATC ? true : false}
        h={{ base: "10", md: "8" }}
        w={{ base: "6", md: "8" }}
        variant={"none"}
        bg={"transparent"}
        p={0}
        onClick={() => AddtoCart(item)}
      >
        <Image src={AddtoCardIcon} alt={"icon"} />
      </Button>
    </Tooltip>
  );
};
