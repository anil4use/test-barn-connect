import React from 'react'
import {
    Box, Text,
    Image, Button,
} from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useState } from 'react';
function Index({ BannerImage }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            {
                !isLoading ?
                    <Box
                        pos={'relative'}
                        h={{ base: "220px", md: "200px", lg: "300px", xl: "310px" }}
                        w={'100%'} m={'auto'} p={{ base: "1", lg: "4" }} >
                        <Image
                            w={'100%'}
                            rounded={'10px'}
                            h={{ base: "220px", md: "100%" }}
                            objectFit={'cover'}
                            src={BannerImage}
                            loading="lazy"
                            alt="banner image" />
                    </Box>
                    : <Skeleton w={'95%'} m={'auto'} rounded={'10px'} startColor='#2b8f65' >
                        <Image
                            w={'100%'}
                            rounded={'10px'}
                            h={{ base: "220px", md: "auto" }}
                            objectFit={'cover'}
                            src={BannerImage}
                            alt="banner image" />
                    </Skeleton>}
        </div>
    )
}

export default Index

const skeleton = (() => {
    return (
        <Skeleton startColor='pink.500' endColor='orange.500' height='20px' />
    )
})
{/* <Box
                            pos={'absolute'}
                            top={"50%"}
                            transform={"translate(-50%, -50%)"}
                            textAlign={"center"}
                            left={"50%"}>
                            <Text
                                fontSize={{ base: "28px", md: "28px", lg: "48px" }}
                                textColor={'#2b8f65'}
                                fontWeight={'700'}
                            >
                                {Heading}
                            </Text>
                            <Text
                                fontSize={{ base: "16px", md: "18px", lg: "24px" }}
                                textColor={'#ffffff'}
                                fontWeight={'700'}
                            >
                                {breadcrumbItems.map((item, index) => (
                                    <Box
                                        key={index}
                                        as='span'
                                        textColor={index === breadcrumbItems.length - 1 ? '#2b8f65' : 'white'}>
                                        {item}
                                        {index !== breadcrumbItems.length - 1 && ' / '}
                                    </Box>
                                ))}
                            </Text>
                            <Button mt={3}
                                fontFamily={"Roboto,sans-serif"}
                                colorScheme='#2b8f65'
                                bg={'#2b8f65'}
                                textColor={'white'}
                                rounded={'full'}
                                w={{ base: "full", lg: "52" }}
                                h={12}
                                _hover={{ bg: "disable" }}
                                fontWeight={'500'} >
                                Become A Member
                            </Button>
                        </Box> */}