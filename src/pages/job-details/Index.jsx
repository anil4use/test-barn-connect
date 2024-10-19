import React from 'react'
import {
    Box, Text,
    HStack,
    Image, Select,
    Flex, SimpleGrid,
    Grid, Heading, Stack,
    Card, CardBody, VStack,
    GridItem, Button,
    Center,
    Divider,
    Icon,
    Textarea,
    useDisclosure,
    SkeletonText,
    Avatar,
    Skeleton,
    Breadcrumb,
    BreadcrumbItem,
    OrderedList,
    BreadcrumbLink,
    Badge, ListItem,
    UnorderedList
} from '@chakra-ui/react'
import likeIocn from "../../assets/images/likeIocn.png";
import jobs from "../../assets/images/jobs.png";
import MapTrifold from "../../assets/icons/MapTrifold.png";
import CalendarBlank from "../../assets/icons/CalendarBlank.png";
import Timer from "../../assets/icons/Timer.png";
import StackIcon from "../../assets/icons/StackIcon.png";
import Wallet from "../../assets/icons/Wallet.png";
import briefcase from "../../assets/icons/briefcase.png";
import { PiMessengerLogoLight } from "react-icons/pi";

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowForwardIcon, LinkIcon } from '@chakra-ui/icons';
import { CiFacebook, CiLinkedin, CiTwitter } from 'react-icons/ci';
import JobsApi from '../../apis/jobsapi';
import { useEffect } from 'react';
import { formatDate } from '../../utils/common.util';
function Index() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const { id } = useParams()
    const jobsApi = new JobsApi()


    const getJobDetails = async () => {
        try {
            setLoading(true);
            const jobResponse = await jobsApi.getJobById({
                jobId: id
            });
            if (jobResponse.data.code === 200) {
                setData(jobResponse.data.data);
                // setImages(jobResponse.data.data.images)
            } else {
                toast.error(jobResponse.data.message);
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJobDetails()
    }, [])


    return (
        <div>
            <Box bg={'#F1F2F4'} h={{ base: "fit-content" }} w={'100%'} mt={3}>
                <HStack flexDir={{ base: "column", md: "row" }} mx={3} justify={'space-between'}>
                    <Box>
                        <Text fontSize={'18px'} fontWeight={'500'} fontFamily={'Inter'} textColor={'#18191C'}>
                            Job Details
                        </Text>
                    </Box>
                    <Breadcrumb fontWeight='medium' fontSize={{ base: "14", md: "16" }} my={2}>
                        <BreadcrumbItem textColor={'#767F8C'}>
                            <Link to={'/'}>
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem textColor={'#767F8C'}>
                            <Link to={'/'}>
                                Find Job
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem textColor={'#767F8C'}>
                            <Link to={'/'}>
                                Barn Worker
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href='#'>Job Details</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </HStack>
            </Box>
            <HStack
                w={{ base: "98%", lg: "98%" }}
                m={'auto'}
                gap={{ base: "2", lg: "10" }}
                flexDir={{ base: 'column', lg: "row" }}
                justifyContent={'space-between'}>
                {
                    loading ? <Flex p={2} mt={20} flexDir={'column'} gap={2} alignSelf={'start'} w={{ base: "98%", md: "50%" }}>

                        <SkeletonText noOfLines={4} pb={10} spacing='4' skeletonHeight='1' />
                        <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='1' />
                        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                        <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='4' />
                    </Flex>
                        :

                        <Box

                            w={{ base: "100%", lg: "80%", }}
                            cursor={`pointer`}
                            h={'100%'}
                            flexDir={'column'}
                            justifySelf={'self-start'}
                        >


                            <HStack fontFamily={'DM Sans'} justify={'space-between'} gap={{ base: "1", md: 4 }} rounded={'md'} overflow={'hidden'} w={'100%'} >
                                {/* <Box alignSelf={'start'} p={3} h={'100%'} fontWeight={'semibold'} textAlign={'center'} w={{ base: "20%", md: "14%" }} >
                                    <Image src={jobs} w={28} alt="img" />
                                </Box> */}
                                <Box w={{ base: '80%', md: "100%" }}>
                                    <Text display={{ base: "none", md: "flex" }} fontSize={{ base: "14px", md: '18px' }} fontWeight={'700'} textColor={'#141414'}>
                                        {data.name}
                                    </Text>
                                    <HStack>
                                        <Text fontSize={{ base: "14px", md: '18px' }} fontWeight={'500'} textColor={'#474C54'}>
                                            at {data?.companyName}
                                        </Text>
                                        <Button colorScheme='' bg={'#2B8F65'} h={8} w={'40'}>{data?.jobType}</Button>
                                        <Badge variant='subtle' textColor={'#E05151'} h={8} p={2} rounded={'full'} colorScheme='' bg={'#FFEDED'}>
                                            Featured
                                        </Badge>
                                    </HStack>

                                </Box>
                            </HStack>
                            <Heading my={3} textColor={'#18191C'} fontWeight={'medium'} fontSize={{ base: "16px", md: "18px" }}>
                                Number of jobs {data?.numberOfOpenings}
                            </Heading>
                            <Heading my={3} textColor={'#18191C'} fontWeight={'medium'} fontSize={{ base: "16px", md: "18px" }}>
                                Job Description
                            </Heading>

                            <Text textColor={'#5E6670'} >
                                {data?.description}
                            </Text>
                            <Heading my={3} textColor={'#18191C'} fontWeight={'medium'} fontSize={{ base: "16px", md: "18px" }}>
                                Requirements:
                            </Heading>
                            <UnorderedList textColor={'#5E6670'}>
                                {
                                    data?.requiredSkills?.map((item, index) => <ListItem key={index}>{item}</ListItem>)
                                }

                            </UnorderedList>
                            <Heading my={3} textColor={'#18191C'} fontWeight={'medium'} fontSize={{ base: "16px", md: "18px" }}>
                                Desirable:
                            </Heading>
                            <UnorderedList textColor={'#5E6670'}>
                                {
                                    data?.responsibilities?.map((item, index) => <ListItem key={index}>{item}</ListItem>)
                                }
                            </UnorderedList>
                            <Heading my={3} textColor={'#18191C'} fontWeight={'medium'} fontSize={{ base: "16px", md: "18px" }}>
                                Benefits:
                            </Heading>
                            <UnorderedList textColor={'#5E6670'}>
                                {
                                    data?.benefits?.map((item, index) => <ListItem key={index}>{item}</ListItem>)
                                }
                            </UnorderedList>


                        </Box>}

                <Flex pos={{ base: "unset", md: 'sticky' }} p={2} top={'110px'} flexDir={'column'} gap={2} alignSelf={'start'} w={{ base: "98%", lg: "30%" }}>


                    <HStack mt={4} alignSelf={'end'} gap={{ base: "1", md: "4" }}>

                        <Link to={`/job/apply/${id}`}>
                            <Button
                                bg={'#2b8f65'}
                                textColor={'white'}
                                fontSize={'16px'}
                                w={{ base: "100%", lg: "40" }}
                                rounded={'sm'}
                                justifySelf={'end'}
                                alignSelf={'end'}
                                colorScheme=''
                                gap={3}

                            >
                                Apply Now <ArrowForwardIcon />
                            </Button>
                        </Link>

                    </HStack>
                    <HStack justify={'space-between'} p={5} rounded={'lg'} border={'2px solid #E7F0FA'} w={'100%'} h={'fit-content'}>
                        <VStack>
                            <Text textColor={'#18191C'} fontFamily={'Inter'}>
                                Salary (USD)
                            </Text>
                            <Text as={'h3'} textColor={'#0BA02C'} fontWeight={'500'} fontSize={{ base: "16px", md: "20px" }} fontFamily={'Inter'}>
                                $ {data?.salary}
                            </Text>
                            <Text textColor={'#767F8C'} fontFamily={'Inter'}>
                                Yearly salary
                            </Text>
                        </VStack>
                        <Divider h={'20'} border={'1px solid #E7F0FA'} orientation='vertical' />
                        <VStack>
                            <Image w={'1o'} src={MapTrifold} alt='MapTrifold icon' />
                            <Text textColor={'#18191C'} fontFamily={'Inter'}>
                                Job Location
                            </Text>
                            <Text textColor={'#767F8C'} fontFamily={'Inter'}>
                                {data?.location}
                            </Text>
                        </VStack>
                    </HStack>
                    <HStack p={5} flexDir={'column'} rounded={'lg'} border={'2px solid #E7F0FA'} w={'100%'} h={'fit-content'}>
                        <Text alignSelf={'self-start'} textColor={'#18191C'} textAlign={'start'} fontFamily={'Inter'}>
                            Job Overview
                        </Text>
                        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                            <MiniImfoComponent src={CalendarBlank} tittle={'Job Posted:'} loading={loading} name={formatDate(data.postedDate)} />
                            <MiniImfoComponent src={Timer} tittle={'Job expire in:'} loading={loading} name={formatDate(data?.applicationDeadline)} />
                            <MiniImfoComponent src={StackIcon} tittle={'Job Level:'} loading={loading} name={data?.experienceLevel} />
                            {/* <MiniImfoComponent src={Wallet} tittle={'Experience'} name={'$50k-80k/month'} /> */}
                            <MiniImfoComponent src={briefcase} tittle={'Education'} loading={loading} name={data?.educationRequired} />
                        </Grid>
                        <Divider w={'100%'} border={'1px solid #E7F0FA'} />
                        <Box>
                            <Text alignSelf={'self-start'} textColor={'#18191C'} textAlign={'start'} fontFamily={'Inter'}>
                                Share this job:
                            </Text>
                            <HStack>
                                <Button colorScheme='' gap={3} textColor={'#2B8F65'} bg={'#E7F0FA'} w={{ base: "28", md: "40" }} h={12}>
                                    <LinkIcon /> <Text fontSize={{ base: "12", md: "16px" }}>Copy Links</Text>
                                </Button>
                                <Button colorScheme='' p={0} fontSize={34} textColor={'#2B8F65'} bg={'#E7F0FA'} w={'12'} h={12}>
                                    <CiLinkedin />
                                </Button>
                                <Button colorScheme='' p={0} fontSize={34} textColor={'#2B8F65'} bg={'#E7F0FA'} w={'12'} h={12}>
                                    <CiFacebook />
                                </Button>
                                <Button colorScheme='' p={0} fontSize={34} textColor={'#2B8F65'} bg={'#E7F0FA'} w={'12'} h={12}>
                                    <CiTwitter />
                                </Button>
                                <Button colorScheme='' p={0} fontSize={34} textColor={'#2B8F65'} bg={'#E7F0FA'} w={'12'} h={12}>
                                    <PiMessengerLogoLight />

                                </Button>
                            </HStack>
                        </Box>
                    </HStack>

                </Flex>

            </HStack>



        </div>
    )
}

export default Index
const MiniImfoComponent = ({ src, tittle, name, loading }) => {
    return (
        <Box minW={28}>
            <Image src={src} alt='calender Icon' />
            <Text textColor={'#767F8C'} fontSize={'12px'}>
                {tittle}:
            </Text>
            {
                loading ? <SkeletonText noOfLines={2} mt={3} spacing='4' skeletonHeight='1' />
                    : <Text textColor={'#18191C'} fontSize={'13px'}>
                        {name}
                    </Text>
            }
        </Box>
    )
}