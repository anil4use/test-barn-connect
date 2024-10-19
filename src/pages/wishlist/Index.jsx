import React from 'react'
import {
  Box,
  Text,
  HStack,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Image
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import ProductCard from '../../components/shared/Card/ProductCard'
import WishlistApi from '../../apis/wishlist.api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { updateAllWishlist } from '../../redux/redux-slice/wishlist.slice';
function Index() {
  const wishlistApi = new WishlistApi()

  const dispatch = useDispatch()
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false)
  const wishlistdata = useSelector((state) => state.wishlist.Wishlist);

  const geteWishlist = async (keyword = '') => {
    setLoading(true);
    try {
      const getwishlistResponse = await wishlistApi.getWishlist({
        keyWord: keyword,
      });
      if (getwishlistResponse.data.code === 200) {
        dispatch(updateAllWishlist(getwishlistResponse.data.data));
      } else {
        toast.error(getwishlistResponse.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wishlistdata.length === 0) {
      geteWishlist();
    }
  }, [wishlistdata.length]);

  useEffect(() => {
    if (search) {
      const timeoutId = setTimeout(() => {
        geteWishlist(search);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [search]);

  return (
    <Box pos={'relative'} minH={'80vh'}>
      <HStack
        flexDir={{ base: "column", lg: "row" }}
        w={{ base: "98%", lg: "95%" }}
        m={"auto"}
        pb={10}
      >
        {/* <ProfileSideBarComponent /> */}
        <Box
          alignSelf={"start"}
          w={{ base: "100%", md: "100%" }}
          // h={{ base: "100%", md: "1000px" }}
          top={10}
          rounded={"md"}
        // border={"1px solid #cccccc"}
        >
          <HStack
            m={"auto"}
            // bg={"#ecf5f1"}
            // pos={{ base: "initial", md: "sticky" }}
            // zIndex={99999}
            // top={"60px"}
            mt={2}
            mb={4}
            // h={20}
            p={3}
            justify={"space-between"}
          >
            <Text
              fontWeight={"600"}
              fontSize={{ base: "12px", md: "24px" }}
              textColor={"black"}
            >
              Wishlist{" "}
            </Text>
            <InputGroup w={{ base: "32", md: "80" }}>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
              <InputRightElement>
                <CiSearch color="green.500" />
              </InputRightElement>
            </InputGroup>

          
          </HStack>
          {/* {
            !data?.length <= 0 ? */}
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
            }}
            p={2}
            gap={{ base: "3", md: "4" }}
            pb={10}
          >
            <ProductCard loading={loading} productData={wishlistdata} />
          </Grid>
          {/* : <Box w={'100%'}>
                <Image m={'auto'} src={nodataFoundImg} alt='no product found img' />
              </Box>} */}
        </Box>
      </HStack>
    </Box>
  );
}

export default Index