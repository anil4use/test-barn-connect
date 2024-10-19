import React, { useState } from 'react';
import {
    Box, Text, FormControl, Flex, FormLabel, Input, Checkbox, InputGroup, InputRightElement, Button
} from '@chakra-ui/react';
import { MainHeading, MainSubHeading } from '../../components/shared/custom design/Index';
import { EmailIcon, PhoneIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import Auth from '../../apis/auth/auth.api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SetNewPassword() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const authApi = new Auth()
    const navigate = useNavigate()
    const validatePassword = () => {
        const isValid = password.length >= 8;
        setPasswordError(isValid ? '' : 'Password must be at least 8 characters long');
        return isValid;
    };

    const validateConfirmPassword = () => {
        const isValid = password === confirmPassword;
        setConfirmPasswordError(isValid ? '' : 'Passwords do not match');
        return isValid;
    };


    const handleClick = () => setShow(!show);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validatePassword() && validateConfirmPassword()) {
            setLoading(true)
            try {
                const setNewPassResponse = await authApi.setPassword({
                    email,
                    password,
                    confirmPassword
                })
                if (setNewPassResponse.data.code === 200) {
                    toast.success(setNewPassResponse.data.message);
                    localStorage.setItem('isEmail', '');
                    navigate('/login')
                } else {
                    toast.error(setNewPassResponse.data.message);
                }
            } catch (error) {
                toast.error("something went wrong");

            } finally {
                setLoading(false);
            }
        }
    };
    useEffect(() => {
        setEmail(localStorage.getItem('isEmail'));
    }, []);

    return (
        <Box display={'flex'} justifyContent={'center'} px={2} py={10} h={'80vh'} pb={10} alignItems={'center'}>

            <Box w={{ base: '100%', md: '500px' }} m={'auto'}>
                <MainSubHeading textAlign="start">
                    Set a password
                </MainSubHeading>
                <MainSubHeading textColor='#313131' fontSize='14px' textAlign="start">
                    Your previous password has been reseted. Please set a new password for your account.
                </MainSubHeading>
                <form onSubmit={handleSubmit}>
                    <Flex mt={4} flexDir={'column'} gap={4}>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={show ? 'text' : 'password'}
                                    placeholder="********"
                                    onBlur={validatePassword}
                                    border="1px solid #79747E"
                                    focusBorderColor="none"
                                    bg="white"
                                    color="black"
                                    outline="none"
                                />
                                <InputRightElement cursor={'pointer'} onClick={handleClick} pr={4}>
                                    {show ? <ViewOffIcon /> : <ViewIcon />}
                                </InputRightElement>
                            </InputGroup>
                            <Text mt={1} fontSize="sm" color="red.500">
                                {passwordError}
                            </Text>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <Input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type={show ? 'text' : 'password'}
                                    placeholder="********"
                                    onBlur={validateConfirmPassword}
                                    border="1px solid #79747E"
                                    focusBorderColor="none"
                                    bg="white"
                                    color="black"
                                    outline="none"
                                />
                                <InputRightElement cursor={'pointer'} onClick={handleClick} pr={4}>
                                    {show ? <ViewOffIcon /> : <ViewIcon />}
                                </InputRightElement>
                            </InputGroup>
                            <Text mt={1} fontSize="sm" color="red.500">
                                {confirmPasswordError}
                            </Text>
                        </FormControl>

                        <Button
                            isLoading={loading}
                            w="100%"
                            colorScheme=""
                            className="Bg"
                            variant="solid"
                            rounded="sm"
                            type="submit"
                        >
                            Set Password
                        </Button>

                    </Flex>

                </form>

            </Box>
        </Box>
    );
}

export default SetNewPassword;
