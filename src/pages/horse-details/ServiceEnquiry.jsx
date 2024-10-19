import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Text,
    Button,
    Textarea,
    Flex,
    HStack
} from '@chakra-ui/react';
import ServicesApi from '../../apis/services.api';
import toast from 'react-hot-toast';

export const ServiceEnquiry = ({ isOpen, onClose, onOpen, serviceId }) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(2px) hue-rotate(90deg)'
        />
    );
    const [overlay, setOverlay] = useState(<OverlayOne />);
    const serviceApi = new ServicesApi();
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');

    const validateFullName = () => {
        const isValid = !!fullName;
        setFullNameError(isValid ? '' : 'Full Name is required');
        return isValid;
    };

    const validatePhoneNumber = () => {
        const isValid = phoneNumber.length === 10;
        setPhoneNumberError(isValid ? '' : 'Phone Number must be 10 digits');
        return isValid;
    };

    const validateEmail = () => {
        const isValid = /\S+@\S+\.\S+/.test(email);
        setEmailError(isValid ? '' : 'Please enter a valid email address');
        return isValid;
    };

    const validateMessage = () => {
        const isValid = !!message;
        setMessageError(isValid ? '' : 'Message is required');
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            validateFullName() &&
            validatePhoneNumber() &&
            validateEmail() &&
            validateMessage()
        ) {
            setLoading(true);
            try {
                const servicesEnquiryResponse = await serviceApi.serviceEnquiry({
                    name: fullName,
                    contact: phoneNumber,
                    email,
                    message,
                    serviceId
                });
                if (servicesEnquiryResponse.data.code === 200) {
                    toast.success(servicesEnquiryResponse.data.message);
                    onClose()
                    setEmail('')
                    setPhoneNumber('')
                    setMessage('')
                    setFullName('')
                } else {
                    toast.error(servicesEnquiryResponse.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Button
                onClick={() => {
                    setOverlay(<OverlayOne />);
                    onOpen();
                }}
                bg={'#2b8f65'}
                textColor={'white'}
                fontSize={'16px'}
                w={{ base: "100%", lg: "40" }}
                rounded={'sm'}
                colorScheme=''
            >
                Request Enquiry
            </Button>
            <Modal isCentered size={'md'} isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent p={2} bg={'#FAFAFA'} rounded={'3xl'}>
                <ModalHeader  as={'b'} fontWeight={'800'}>Service Enquiry</ModalHeader>

                    <ModalBody rounded={'2xl'}>
                        <form onSubmit={handleSubmit}>
                            <Flex  flexDir={'column'} gap={4}>
                                <FormControl isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        type="text"
                                        placeholder="Full Name"
                                        onBlur={validateFullName}
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        color="black"
                                        outline="none"
                                    />
                                    <Text  fontSize="sm" color="red.500">
                                        {fullNameError}
                                    </Text>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        type="tel"
                                        minLength={10}
                                        maxLength={10}
                                        placeholder="0000000000"
                                        onBlur={validatePhoneNumber}
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        color="black"
                                        outline="none"
                                    />
                                    <Text fontSize="sm" color="red.500">
                                        {phoneNumberError}
                                    </Text>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={validateEmail}
                                        type="email"
                                        placeholder="john.doe@gmail.com"
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        color="black"
                                        outline="none"
                                    />
                                    <Text pos={'absolute'} fontSize="sm" color="red.500">
                                        {emailError}
                                    </Text>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Message</FormLabel>
                                    <Textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onBlur={validateMessage}
                                        placeholder="Message"
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        color="black"
                                        outline="none"
                                    />
                                    <Text pos={'absolute'} fontSize="sm" color="red.500">
                                        {messageError}
                                    </Text>
                                </FormControl>
                                <HStack w={'60%'} justify={'end'} justifySelf={'end'} alignSelf={'flex-end'} justifyContent={'flex-end'}>
                                    <Button
                                        mt={4}
                                        w={{ base: "100%", md: "50%" }}
                                        m={'auto'}
                                        colorScheme="teal"
                                        textColor={'red'}
                                        border={'1px solid #edb3af'}
                                        variant='outline'
                                        rounded="md"
                                        onClick={onClose}

                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        mt={4}
                                        w={{ base: "100%", md: "50%" }}
                                        isLoading={loading}
                                        m={'auto'}
                                        colorScheme=""
                                        className="Bg"
                                        variant="solid"
                                        rounded="sm"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </HStack>
                            </Flex>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
