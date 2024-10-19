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
  Flex,
  RadioGroup,
  Radio,
  InputLeftElement,
  Tooltip,
  Button,
  Skeleton,
  SkeletonText

} from "@chakra-ui/react";

import { CiCalendarDate, CiDollar, CiLocationOn, CiTimer } from "react-icons/ci";

import { CiSearch } from "react-icons/ci";
import sortIcon from "../../assets/icons/sort.svg";
import jobs from "../../assets/images/jobs.png";
import noResultFound from "../../assets/images/noResultFound.png";

import SideBarComponent from "./sidebar";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import JobsApi from "../../apis/jobsapi";
import { formatDate, formatTime } from "../../utils/common.util";
import { LoadingCardLine } from "../../components/shared/skeleton/Index";
import { Link } from "react-router-dom";
import { SortItems } from "../../components/shared/custom design/Index";
function Index() {
  const [loading, setLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false)

  const [sort, setSort] = useState(null);
  const [data, setData] = useState([])
  const [search, setSearch] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [limit, setLimit] = useState(9);


  const [filters, setFilters] = useState({
    categoryId: '',
    locationValue: '',
    experienceLevel: '',
    postedDate: '',
    hourlySalaryValue: '',
    monthlySalaryValue: '',
    yearlySalaryValue: '',
    jobType: '',
    // fullTime: false,
    // temporary: false,
    // partTime: false
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const jobApi = new JobsApi()
  const getAllJobs = async () => {
    setLoading(true);
    try {
      const jobResponse = await jobApi.getAllJobs({
        ...filters,
        page,
        limit,
        sort,
        keyWord: search || searchLocation,
        jobType:''

      });
      if (jobResponse.data.code === 200) {
        setData(jobResponse.data.data);
        setTotalPages(Math.ceil(jobResponse.data.data.length / limit));

      } else {
        toast.error(jobResponse.data.message);
      }

    } catch (error) {
      console.error(error);
      // toast.error("Something went wrong");
    } finally {
      setLoading(false); // Once initial loading is done, set it to false
    }
  };
  useEffect(() => {
    getAllJobs()
  }, [filters, search, searchLocation, sort, limit, page])
  console.log(search);
  const TotalJobs = data.length
  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      getAllJobs();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <Box minH={'80vh'} pos={"relative"}>
      <Box mx={{ base: "2", md: "10" }}>
        <Text fontFamily={'Mulish'} fontWeight={'bold'} fontSize={{ base: "28", md: "56px" }}>
          Find your <Text as={'span'} textColor={'#2B8F65'}> new job</Text> today
        </Text>
        <Text textColor={'black'} fontSize={'18px'}>
          Thousands of jobs in the computer, engineering and technology sectors are waiting for you.
        </Text>
        <HStack my={4} gap={0}>
          <InputGroup rounded={'none'}>
            <Input rounded={'none'} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="What position are you looking for ?" />
            <InputLeftElement>
              <CiSearch color="green.500" />
            </InputLeftElement>
          </InputGroup>
          <InputGroup rounded={'none'}>
            <Input rounded={'none'} value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} placeholder="Location" />
            <InputLeftElement>
              <CiLocationOn color="green.500" />
            </InputLeftElement>
          </InputGroup>
          <Button colorScheme="" rounded={'none'} w={'40'} bg={'#2B8F65'} >
            Search
          </Button>
        </HStack>
      </Box>
      <HStack
        flexDir={{ base: "column", lg: "row" }}
        w={{ base: "98%", md: "95%" }}
        m={"auto"}

      >

        <Box display={{ base: "none", lg: "contents" }}>
          <SideBarComponent filters={filters} setFilters={setFilters} loading={loading} />
        </Box>
        {/* <Sidebar /> */}
        <Box
          alignSelf={"start"}
          w={{ base: "100%", lg: "100%" }}
          rounded={"md"}
        >
          <HStack
            m={"auto"}
            bg={"#ecf5f1"}
            zIndex={99999}
            top={"60px"}
            mt={2}
            mb={4}
            // h={20}
            p={3}
            justify={"space-between"}
          >
            <Text
              fontWeight={"600"}
              fontSize={{ base: "12px", lg: "24px" }}
              textColor={"black"}
            >
              {TotalJobs} Jobs{" "}
            </Text>
            <HStack>
              <Tooltip hasArrow label='Add to Cart' >
                <SortItems setSort={setSort} src={sortIcon} sort={sort} />
              </Tooltip>
              <Box display={{ base: "flex", lg: "none" }}>
                <SideBarComponent filters={filters} setFilters={setFilters} loading={loading} />
              </Box>
            </HStack>
          </HStack>

          {
            data.length <= 0 ?
              <Box>
                <Image m={'auto'} pb='10' w={80} src={noResultFound} alt="no data found" />
              </Box> :

              <>
                <Box display={'flex'} flexDir={'column'} gap={3}
                >
                  {
                    loading ? <>
                      <LoadingCardLine />
                      <LoadingCardLine />
                      <LoadingCardLine />
                      <LoadingCardLine />
                    </> : (
                      data && data.map((item, index) => {
                        return (
                          <Link key={index} to={`/job/${item?.jobId}`}>
                            <HStack p={1} mb={4} fontFamily={'DM Sans'} justify={'space-between'} gap={{ base: "1", md: 4 }} border={'1px solid #C4C4C4'} rounded={'md'} overflow={'hidden'} w={'100%'} h={{ base: "fit-content", md: 'fit-content' }}>
                              {/* <Box alignSelf={'start'} p={3} h={'100%'} fontWeight={'semibold'} textAlign={'center'} w={{ base: "20%", md: "10%" }} >
                          <Image src={jobs} alt="img" />
                        </Box> */}
                              <Box ml={4} w={{ base: '80%', md: "100%" }}>
                                <Text display={{ base: "none", md: "flex" }} fontSize={{ base: "14px", md: '18px' }} fontWeight={'500'} textColor={'#141414'}>
                                  {item?.companyName}
                                </Text>
                                <Text fontSize={{ base: "20px", md: '24px' }} fontWeight={'600'} textColor={'#141414'}>
                                  {item?.name}
                                </Text>
                                <HStack justify={'space-evenly'} justifyContent={'start'} gap={{ base: "1", md: "10" }} w={'100%'} display={{ base: "none", md: "flex" }} alignItems={'center'}>
                                  <HStack>
                                    <Text> {item?.location}</Text>
                                    <CiLocationOn />
                                  </HStack>
                                  <HStack><Text>{item?.jobType}</Text> <CiTimer /></HStack>
                                  <HStack><Text> {item?.salary} $  </Text> </HStack>
                                  <HStack>
                                    <Text>
                                      {item?.postedDate ? `${formatDate(item.postedDate)} ${formatTime(item.postedDate)}` : ""}
                                    </Text><CiCalendarDate /> </HStack>
                                </HStack>
                                <Text noOfLines={2} fontSize={{ base: "10px", md: '16px' }} textColor={'#333333'}>
                                  {item?.description}
                                </Text>
                              </Box>

                            </HStack>
                          </Link>
                        )
                      })

                    )}


                </Box>
                <Flex
                  // bg="#edf3f8"
                  p={10}
                  w="full"
                  // h={12}
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >

                  <Flex mt={4}>
                    <PagButton disabled={page === 1} onClick={() => setPage(page - 1)}>
                      Previous
                    </PagButton>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <PagButton
                        key={index}
                        active={page === index + 1}
                        onClick={() => setPage(index + 1)}
                      >
                        {index + 1}
                      </PagButton>
                    ))}
                    <PagButton disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                      Next
                    </PagButton>
                  </Flex>

                </Flex>

              </>
          }
        </Box>
      </HStack>
    </Box>
  );
}

export default Index;



const PagButton = ({ active, disabled, children, onClick }) => {
  const activeStyle = {
    bg: "brand.600",
    _dark: {
      bg: "brand.500",
    },
    color: "",
  };

  return (
    <Button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg="white"
      color="gray.700"
      colorScheme=""
      _dark={{
        color: "white",
        bg: "gray.800",
      }}
      opacity={disabled && 0.6}
      isDisabled={disabled}
      disabled={disabled}
      _hover={!disabled && activeStyle}
      cursor={disabled && "not-allowed"}
      onClick={onClick}
      {...(active && activeStyle)}
    >
      {children}
    </Button>
  );
};