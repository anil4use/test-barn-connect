import React, { useState } from 'react';
import {
    Box, Text, Flex, FormControl, FormLabel, Input, Textarea, Image, Grid, VStack, Button
} from '@chakra-ui/react';
import BannerImg from '../../assets/images/contactBanner.png';
import ProductBanner from '../../components/shared/banner/Index';
import { MainSubHeading } from '../../components/shared/custom design/Index';
import phone from '../../assets/icons/phone.svg';
import location from '../../assets/icons/location.svg';
import messageIcon from '../../assets/icons/message.svg';
import toast from 'react-hot-toast';
import OtherApi from '../../apis/other.api';

function Index() {
    const otherApi = new OtherApi()
    const [loading, setLoading] = useState(false)
    const emptyForm = {
        name: '',
        contact: '',
        email: '',
        query: ''
    }
    const [formData, setFormData] = useState(emptyForm);

    const [errors, setErrors] = useState({
        name: '',
        contact: '',
        email: '',
        query: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Validation
        let error = '';
        switch (name) {
            case 'name':
                error = value.length < 1 ? 'Full Name is required' : '';
                break;
            case 'contact':
                error = !/^\d{10}$/.test(value) ? 'Phone Number must be 10 digits' : '';
                break;
            case 'email':
                error = !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid Email Address' : '';
                break;
            case 'query':
                error = value.length < 1 ? 'query is required' : '';
                break;
            default:
                break;
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const ContactUsResponse = await otherApi.contactUs(formData);
            if (ContactUsResponse.data.code === 200) {
                toast.success(ContactUsResponse.data.message);
                setFormData(emptyForm); // Reset the form
            } else {
                toast.error(ContactUsResponse.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const { name, contact, email, query } = formData;

    return (
        <Box pos={'relative'}>
            <ProductBanner BannerImage={BannerImg} Heading={'Check-Out'} Breadcrumb={'Home Product Check-out'} />
            <Box pt={4} w={'90%'} m={'auto'}>
                <MainSubHeading>Drop us a query for any query or You.</MainSubHeading>
                <MainSubHeading fontSize='16px'>Write to us, we’ll get back to you as fast as we can. You may find some of your questions <Box display={{ base: "none", lg: "inline-block" }} as='br' /> answered on our FAQ page.</MainSubHeading>
                <form onSubmit={handleSubmit}>

                    <Flex mt={4} flexDir={'column'} gap={3}>

                        <Flex bg={'primary'} flexDir={{ base: "column", md: "row" }} gap={4}>
                            <FormControl isInvalid={errors.name}>
                                <FormLabel className='pc1' primary={"primary"}>Full Name*</FormLabel>
                                <Input
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    w={'100%'}
                                    maxLength={'50'}
                                    color={'black'}
                                    placeholder='Enter your name'
                                    focusBorderColor='none'
                                    bg={'white'}
                                    outline={'none'}
                                />
                                <Text color="red.500">{errors.name}</Text>
                            </FormControl>
                            <FormControl isInvalid={errors.contact}>
                                <FormLabel className='pc1'>Phone Number*</FormLabel>
                                <Input
                                    name="contact"
                                    value={contact}
                                    onChange={handleChange}
                                    w={'100%'}
                                    type='tel'
                                    color={'black'}
                                    placeholder='Enter your phone number'
                                    focusBorderColor='none'
                                    bg={'white'}
                                    outline={'none'}
                                />
                                <Text color="red.500">{errors.contact}</Text>
                            </FormControl>
                        </Flex>
                        <FormControl isInvalid={errors.email}>
                            <FormLabel className='pc1'>Your Email*</FormLabel>
                            <Input
                                name="email"
                                value={email}
                                onChange={handleChange}
                                w={'100%'}
                                color={'black'}
                                placeholder='Enter your email'
                                focusBorderColor='none'
                                bg={'white'}
                                outline={'none'}
                            />
                            <Text color="red.500">{errors.email}</Text>
                        </FormControl>
                        <FormControl isInvalid={errors.query}>
                            <FormLabel className='pc1'>Message*</FormLabel>
                            <Textarea
                                name="query"
                                value={query}
                                onChange={handleChange}
                                w={'100%'}
                                color={'black'}
                                placeholder='Enter your query'
                                focusBorderColor='none'
                                bg={'white'}
                                outline={'none'}
                            />
                            <Text color="red.500">{errors.query}</Text>
                        </FormControl>
                        <Box alignSelf={'center'}>
                            <Button mt={4}
                                fontFamily={"Roboto,sans-serif"}
                                colorScheme='#2b8f65'
                                textColor={'white'}
                                bg={'#2B8F65'}
                                rounded={'full'}
                                isLoading={loading}
                                type='submit'
                                w={'40'}
                                h={10}
                                _hover={{ bg: "disable" }}
                                fontWeight={'500'}>Send Message</Button>
                        </Box>
                    </Flex>
                </form>

                <Grid
                    w={'80%'}
                    pt={10}
                    m={'auto'}
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)"
                    }}
                    justifyContent={'center'}
                    alignContent={'center'}
                    alignItems={'center'}
                    gap={4}
                    mb={'-20'}

                >
                    <VStack zIndex={99} textAlign={'center'} rounded={'xl'} bg={'white'} className='border' h={{ base: "fit-content", md: "230px" }}>
                        <Image src={location} />
                        <Text fontSize={'24px'} fontWeight={'700'}>Address</Text>
                        <Text fontSize={'18px'} fontWeight={'700'}>32 st Kilda Road, Melbourne VIC, 3004 Indore</Text>
                    </VStack>
                    <VStack zIndex={99} textAlign={'center'} p={8} rounded={'xl'} bg={'white'} className='border' h={{ base: "fit-content", md: "230px" }}>
                        <Image src={messageIcon} />
                        <Text fontSize={'24px'} fontWeight={'700'}>Email</Text>
                        <Text fontSize={'18px'} fontWeight={'700'}>example@yourmail.com</Text>
                    </VStack>
                    <VStack zIndex={99} textAlign={'center'} p={8} rounded={'xl'} bg={'white'} className='border' h={{ base: "fit-content", md: "230px" }}>
                        <Image src={phone} />
                        <Text fontSize={'24px'} fontWeight={'700'}>Phone</Text>
                        <Text fontSize={'18px'} fontWeight={'700'}>+91 26613 22033</Text>
                    </VStack>
                </Grid>
                <Box mt={4} pb={4} >
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14717.32925982634!2d75.9165736!3d22.7530455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa84286eb91cf5c45%3A0xd5d1e812a21d58a1!2sNext%20Gen%20Tech%20Services%20-%20Your%20Trusted%20Tech%20Partner!5e0!3m2!1sen!2sin!4v1708602069792!5m2!1sen!2sin'
                        width="100%" // Adjust the width as needed
                        height="450"
                        style={{ border: "0", borderRadius: "10px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Box>
            </Box>
        </Box>
    );
}

export default Index;
