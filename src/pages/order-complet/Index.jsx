import React from 'react'
import {
    Box, Text,
    Image,
    Button,
    VStack
} from '@chakra-ui/react'
import BannerImg from '../../assets/images/successBanner.png'
import ProductBanner from '../../components/shared/banner/Index'
import clock from '../../assets/icons/clock.svg'
import notebook from '../../assets/icons/notebook.svg'
import right from '../../assets/icons/right.svg'
import { MainSubHeading } from '../../components/shared/custom design/Index';
import { Link } from 'react-router-dom'
function Index() {
    return (
        <Box pos={'relative'}>
            {/* <ProductBanner BannerImage={BannerImg} Heading={'Order Completed'} Breadcrumb={'Home Pages order-completedd'} /> */}
            <Box mb={20} py={4}>
                <Image m={'auto'} src={right} alt={'Order Completed'} />
                <Text mb={{ base: "20", md: "4" }} textAlign={'center'} fontFamily={'Josefin Sans'} fontWeight={'700'} textColor={'#101750'} fontSize={{ base: "20px", md: "35px" }}>
                    Your Order Is Completed!
                </Text>
                <VStack pos={'relative'} py={10} w={'80%'} m={'auto'} border={'1px solid #cccccc'}>
                    <MainSubHeading textColor='#8D92A7' fontSize='16px'>
                        Thank you for your order! Your order is being processed and will be completed within 3-6 <Box display={{ base: "none", lg: "inline-block" }} as='br' />
                        hours. You will receive an email confirmation when your order is completed.
                    </MainSubHeading>
                    <Link to={'/products'}>
                        <Button mt={4} h={12} rounded={'sm'} variant={'solid'} colorScheme='#2b8f65' bg={'#2b8f65'}>
                            Continue Shopping
                        </Button>
                    </Link>
                    <Image left={-10} top={-20} pos={'absolute'} src={clock} alt={'Order Completed'} />
                    <Image right={-10} bottom={-14} pos={'absolute'} src={notebook} alt={'Order Completed'} />
                </VStack>
            </Box>

        </Box>
    )
}

export default Index

