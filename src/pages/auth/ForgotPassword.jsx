import React, { useState } from 'react';
import {
    Box, Text, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button
} from '@chakra-ui/react';
import { MainSubHeading } from '../../components/shared/custom design/Index';
import { ChevronLeftIcon, EmailIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import Auth from '../../apis/auth/auth.api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ForgotPassword() {
    const authApi = new Auth()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id')
    console.log(id);
    const [email, setEmail] = useState('');
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const validateEmail = () => {
        const isValid = /\S+@\S+\.\S+/.test(email);
        setEmailError(isValid ? '' : 'Please enter a valid email address');
        return isValid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateEmail()) {
            setLoading(true)
            try {
                const forgetPasswordResponse = await authApi.forgetPassword({
                    email,
                })
                if (forgetPasswordResponse.data.code === 200) {
                    localStorage.setItem('isEmail', email);
                    toast.success(forgetPasswordResponse.data.message);
                    navigate('/Enter-Otp')
                    // navigate(`/sign-up?email_verification_pending=${true}`);
                    // /Enter-Otp
                    // navigate('/verify-code')
                } else {
                    toast.error(forgetPasswordResponse.data.message);
                }
            } catch (error) {
                toast.error("something went wrong");

            } finally {
                setLoading(false);
            }
        }
    };
    useEffect(() => {
        if(id){
            setEmail(localStorage.getItem('isEmail'))
        }
    }, [])

    return (
        <Box px={2} pt={28} h={'80vh'} w={{ base: '100%', md: '500px' }} m={'auto'}>
            <Link to={'/login'}>
                <Box my={3} textColor={'#313131'} fontSize={'14px'}>
                    <ChevronLeftIcon fontSize={'24px'} />
                    Back to login
                </Box>
            </Link>
            <MainSubHeading textAlign="start">
                Forgot your password?
            </MainSubHeading>
            <MainSubHeading textAlign="start" fontSize="16px" textColor="#313131">
                Don’t worry, happens to all of us. Enter your email below to recover your password
            </MainSubHeading>
            <form onSubmit={handleSubmit}>
                <FormControl mt={4} isRequired>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
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
                            pr="3.5rem"
                        />
                        <InputRightElement pointerEvents="none" pr={4}>
                            <EmailIcon />
                        </InputRightElement>
                    </InputGroup>
                    <Text mt={1} fontSize="sm" color="red.500">
                        {emailError}
                    </Text>
                </FormControl>
                <Button
                    mt={4}
                    w="100%"
                    colorScheme=""
                    isLoading={loading}
                    className="Bg"
                    variant="solid"
                    rounded="sm"
                    type="submit"
                >
                    {!id ? "Submit" : "Resend"}
                </Button>
            </form>
        </Box>
    );
}

export default ForgotPassword;
