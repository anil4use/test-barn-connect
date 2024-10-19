// import React from "react";
// import {
//   Box,
//   Text,
//   HStack,
//   Grid,
//   Input,
//   InputGroup,
//   InputRightElement,
//   Image,
//   useDisclosure,
//   Spinner,
//   RadioGroup,
//   Radio,
//   Tooltip,
//   Switch,

// } from "@chakra-ui/react";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   PopoverHeader,
//   PopoverBody,
//   PopoverFooter,
//   PopoverArrow,
//   PopoverCloseButton,
//   PopoverAnchor,
// } from '@chakra-ui/react'

// import { CiSearch } from "react-icons/ci";
// import ProductBannerImg from "../../assets/images/ProductBanner.png";
// import sortIcon from "../../assets/icons/sort.svg";
// import nodataFoundImg from "../../assets/images/nodataFoundImg.png";

// import filter from "../../assets/icons/filter.svg";
// import ProductBanner from "../../components/shared/banner/Index";
// import ProductCard from "../../components/shared/Card/ProductCard";
// import SideBarComponent from "../../components/shared/sidebar/Index";
// import ProductApi from "../../apis/product.api";
// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Allproducts } from "../../redux/redux-slice/product.slice";
// import { useLocation } from "react-router-dom";
// import { SortItems } from "../../components/shared/custom design/Index";
// import { RentalToggle } from '../../redux/redux-slice/product.slice'
// import parse from 'react-html-parser'

// function Index() {
//   const { isOpen, onOpen, onClose } = useDisclosure()
//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false);
//   const [catLoading, setCatLoading] = useState(false)

//   const [sort, setSort] = useState(null);
//   const [productData, setProductData] = useState([])
//   const [category, setCategory] = useState([])
//   const [sliderValues, setSliderValues] = useState([0, 100000]);
//   const [hasMore, setHasMore] = useState(true);
//   const [search, setSearch] = useState('');
//   const [limit, setLimit] = useState(9);
//   const [initialLoading, setInitialLoading] = useState(true);


//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const categoryId = searchParams.get('cat')
//   const subCategoryId = searchParams.get('subcat')
//   // console.log(sliderValues[0], sliderValues[1]);
//   const productApi = new ProductApi();
//   const [isToggled, setIsToggled] = useState(false);
//   const rentalToggle = useSelector((state) => state?.productData?.rentalToggle);

//   const handleToggle = () => {
//     setIsToggled(!isToggled);
//     dispatch(RentalToggle(!rentalToggle));
//   };

//   const getAllProducts = async () => {
//     if (initialLoading) { // Check if it's the initial loading
//       setLoading(true);
//     }
//     try {
//       const productResponse = await productApi.allProducts({
//         categoryId,
//         subCategoryId,
//         minPrice: sliderValues[0],
//         maxPrice: sliderValues[1],
//         keyWord: search,
//         page: 1,
//         limit,
//         sort
//       });
//       if (productResponse.data.code === 200) {
//         setProductData(productResponse.data.data);
//         setHasMore(productResponse.data.data.length > 0);
//       } else {
//         toast.error(productResponse.data.message);
//         setHasMore(false);
//       }

//     } catch (error) {
//       console.error(error);
//       // toast.error("Something went wrong");
//     } finally {
//       setInitialLoading(false); // Once initial loading is done, set it to false
//     }
//   };
//   const handleChange = (e) => {
//     const value = e.target.value;
//     setSearch(value);

//   };

//   const handleScroll = () => {
//     const windowHeight = window.innerHeight;
//     const scrollHeight = document.documentElement.scrollHeight;
//     const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
//     const scrollPercentage = (scrollTop + windowHeight) / scrollHeight;

//     if (scrollPercentage < 0.5 || !hasMore) {
//       return;
//     }

//     // getAllProducts(); // Fetch more products when at the bottom of the page
//     setLimit(limit + 9)
//   };

//   useEffect(() => {
//     getAllProducts(); // Initial call to fetch products
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
//   useEffect(() => {
//     getAllProducts()

//   }, [categoryId, subCategoryId, sliderValues, limit, sort])



//   const getAllgetCategory = async () => {
//     try {
//       setCatLoading(true);
//       const CategoriesResponse = await productApi.getAllgetCategory();
//       if (CategoriesResponse.data.code === 200) {
//         setCategory(CategoriesResponse.data.data);
//         setCatLoading(false);
//       } else {
//         // toast.error(CategoriesResponse.data.message);
//         setCatLoading(false)
//       }
//     } catch (error) {
//       console.error(error);
//       setCatLoading(false)
//       // toast.error("Something went wrong");
//     }
//   };
//   useEffect(() => {
//     getAllgetCategory()
//   }, []);
//   useEffect(() => {
//     let timeoutId;
//     timeoutId = setTimeout(() => {
//       getAllProducts();
//     }, 1000);
//     return () => clearTimeout(timeoutId);
//   }, [search]);

//   return (
//     <Box minH={'80vh'} pos={"relative"}>

//       <HStack
//         flexDir={{ base: "column", lg: "row" }}
//         w={{ base: "98%", md: "95%" }}
//         m={"auto"}

//       >
//         <Box display={{ base: "none", lg: "contents" }}>
//           <SideBarComponent cat={true} loading={catLoading} sliderValues={sliderValues} category={category} setSliderValues={setSliderValues} />
//         </Box>
//         {/* <Sidebar /> */}
//         <Box
//           alignSelf={"start"}
//           w={{ base: "100%", lg: "100%" }}
//           rounded={"md"}
//         >
//           <HStack
//             m={"auto"}
//             mt={2}
//             mb={4}
//             p={3}
//             justify={"space-between"}
//           >
//             <Box p={4}>
//               <HStack spacing={4}>
//                 <Text fontWeight={800}>All</Text>
//                 <Switch
//                   id="toggle-switch"
//                   isChecked={isToggled}
//                   onChange={handleToggle}
//                   colorScheme={isToggled ? 'green' : 'blue'}
//                 />
//                 <Text fontWeight={800}>Rental</Text>
//               </HStack>

//             </Box>
//             <Text
//               fontWeight={"600"}
//               fontSize={{ base: "12px", lg: "24px" }}
//               textColor={"black"}
//               display={{ base: "none", md: "block" }}
//             >
//               {!rentalToggle ? 'All Product' : 'Rental Product'}
//             </Text>
//             <HStack>
//               <InputGroup w={{ base: "40", lg: "80" }}>
//                 <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
//                 <InputRightElement>
//                   <CiSearch onClick={getAllProducts} color="green.500" />
//                 </InputRightElement>
//               </InputGroup>
//               <Tooltip hasArrow label='Add to Cart' >
//                 <SortItems setSort={setSort} src={sortIcon} sort={sort} />
//               </Tooltip>
//               <Box display={{ base: "flex", lg: "none" }}>
//                 <SideBarComponent cat={true} loading={catLoading} sliderValues={sliderValues} category={category} setSliderValues={setSliderValues} />
//               </Box>
//             </HStack>
//           </HStack>
//           <Grid
//             templateColumns={{
//               base: "repeat(2, 1fr)",
//               md: "repeat(3, 1fr)",
//               lg: "repeat(3, 1fr)",
//               xl: "repeat(4, 1fr)",
//             }}
//             p={2}
//             gap={{ base: "3", md: "4" }}
//             pb={10}
//           >
//             <ProductCard loading={loading && initialLoading} productData={productData} />
//           </Grid>
//         </Box>
//       </HStack>
//     </Box>
//   );
// }

// export default Index;

import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import ProductApi from "../../apis/product.api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/shared/Card/ProductCard";
import SideBarComponent from "../../components/shared/sidebar/Index";
import { SortItems } from "../../components/shared/custom design/Index";
import sortIcon from "../../assets/icons/sort.svg";

function Index() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);

  const [sort, setSort] = useState(null);
  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState([]);
  const [sliderValues, setSliderValues] = useState([0, 100000]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(9);
  const [initialLoading, setInitialLoading] = useState(true);
  const [filterType, setFilterType] = useState("all"); // New state for button filtering
  const [filteredProductData, setFilteredProductData] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get('cat');
  const subCategoryId = searchParams.get('subcat');
  const productApi = new ProductApi();

  const getAllProducts = async () => {
    if (initialLoading) {
      setLoading(true);
    }
    try {
      const productResponse = await productApi.allProducts({
        categoryId,
        subCategoryId,
        minPrice: sliderValues[0],
        maxPrice: sliderValues[1],
        keyWord: search,
        page: 1,
        limit,
        sort
      });
      if (productResponse.data.code === 200) {
        let products = productResponse.data.data;
        setProductData(products);
        setHasMore(products.length > 0);
      } else {
        toast.error(productResponse.data.message);
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };
  useEffect(() => {
    if (filterType === "buy") {
      setFilteredProductData(productData.filter(product => !product.isRental));
    } else if (filterType === "rental") {
      setFilteredProductData(productData.filter(product => product.isRental));
    } else {
      setFilteredProductData(productData);
    }
  }, [filterType, productData])

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
    const scrollPercentage = (scrollTop + windowHeight) / scrollHeight;

    if (scrollPercentage < 0.5 || !hasMore) {
      return;
    }

    setLimit(limit + 9);
  };

  useEffect(() => {
    getAllProducts();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [categoryId, subCategoryId, sliderValues, limit, sort]);

  useEffect(() => {
    const getAllgetCategory = async () => {
      try {
        setCatLoading(true);
        const CategoriesResponse = await productApi.getAllgetCategory();
        if (CategoriesResponse.data.code === 200) {
          setCategory(CategoriesResponse.data.data);
        } else {
          toast.error(CategoriesResponse.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        setCatLoading(false);
      }
    };

    getAllgetCategory();
  }, []);

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      getAllProducts();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleFilterClick = (type) => {
    setFilterType(type);
  };

  return (
    <Box minH={'80vh'} pos={"relative"}>
      <HStack
        flexDir={{ base: "column", lg: "row" }}
        w={{ base: "98%", md: "95%" }}
        m={"auto"}
      >
        <Box display={{ base: "none", lg: "contents" }}>
          <SideBarComponent
            cat={true}
            loading={catLoading}
            sliderValues={sliderValues}
            category={category}
            setSliderValues={setSliderValues}
          />
        </Box>

        <Box alignSelf={"start"} w={{ base: "100%", lg: "100%" }} rounded={"md"}>
          <HStack m={"auto"} mt={2} mb={4} p={3} flexWrap={'wrap'} justify={"space-between"}>
            <HStack flexWrap={'wrap'}>
              <Button
                colorScheme=""
                bg={filterType === "all" ? "black" : "#9da0a0"}
                onClick={() => handleFilterClick("all")}
              >
                All
              </Button>
              <Button
                colorScheme=""
                bg={filterType === "buy" ? "black" : "#9da0a0"}
                onClick={() => handleFilterClick("buy")}
              >
                Buy Product
              </Button>
              <Button
                colorScheme=""
                bg={filterType === "rental" ? "black" : "#9da0a0"}
                onClick={() => handleFilterClick("rental")}
              >
                Rental Product
              </Button>
            </HStack>

            <HStack>
              <InputGroup w={{ base: "40", lg: "80" }}>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                <InputRightElement>
                  <CiSearch onClick={getAllProducts} color="green.500" />
                </InputRightElement>
              </InputGroup>
              <Tooltip hasArrow label='Add to Cart'>
                <SortItems setSort={setSort} src={sortIcon} sort={sort} />
              </Tooltip>
              <Box display={{ base: "flex", lg: "none" }}>
                <SideBarComponent
                  cat={true}
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
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            p={2}
            gap={{ base: "3", md: "4" }}
            pb={10}
          >
            <ProductCard loading={loading && initialLoading} productData={filteredProductData} />
          </Grid>
        </Box>
      </HStack>
    </Box>
  );
}

export default Index;
