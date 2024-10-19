import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Select,
    Text,
    FormErrorMessage,
    Image,
    BreadcrumbLink,
    BreadcrumbItem,
    Breadcrumb
} from '@chakra-ui/react';
import ServicesApi from '../../apis/services.api';
import toast from 'react-hot-toast';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { CustomCheckbox } from '../../components/shared/custom design/Index';
import JobsApi from '../../apis/jobsapi';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdAttachFile } from "react-icons/md";

const JobApply = () => {
    const jobsApi = new JobsApi();
    const { id } = useParams();
    const initialFormData = {
        jobId: id,
        receiveCommunication: true,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        authorizedToUSA: '',
        visaSponsorship: '',
        Referrer: '',
        resume: null,
        coverLetter: null
    }
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'firstName':
                if (!value || value.length > 40) error = 'First Name is required and should be less than 40 characters';
                break;
            case 'lastName':
                if (!value || value.length > 40) error = 'Last Name is required and should be less than 40 characters';
                break;
            case 'phoneNumber':
                if (!value || !/^\d{10}$/.test(value)) error = 'Phone Number must be 10 digits';
                break;
            case 'email':
                if (!value || !/\S+@\S+\.\S+/.test(value)) error = 'Please enter a valid email address';
                break;
            case 'authorizedToUSA':
                if (!value) error = 'Authorization to work in the US is required';
                break;
            case 'visaSponsorship':
                if (!value) error = 'Visa Sponsorship is required';
                break;

            case 'resume':
                if (!value) error = 'Please upload your CV';
                break;
            case 'coverLetter':
                if (!value) error = 'Please upload your Cover Letter';
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: fieldValue
        }));

        validateField(name, fieldValue);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: file
            }));
            validateField(name, file);

            // Optionally, you can create a preview URL for the PDF
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    [`${name}Preview`]: reader.result
                }));
            };
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: null
            }));
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: 'Please upload a valid PDF file'
            }));
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName || formData.firstName.length > 40) newErrors.firstName = 'First Name is required and should be less than 40 characters';
        if (!formData.lastName || formData.lastName.length > 40) newErrors.lastName = 'Last Name is required and should be less than 40 characters';
        if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone Number must be 10 digits';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
        if (!formData.visaSponsorship) newErrors.visaSponsorship = 'Visa Sponsorship is required';
        if (!formData.authorizedToUSA) newErrors.authorizedToUSA = 'Authorization to work in the US is required';
        if (!formData.resume) newErrors.resume = 'Please upload your CV';
        if (!formData.coverLetter) newErrors.coverLetter = 'Please upload your Cover Letter';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {
                const formPayload = new FormData();
                for (const key in formData) {
                    formPayload.append(key, formData[key]);
                }

                const addAdminResponse = await jobsApi.applyForJob(formPayload);
                if (addAdminResponse.data.code === 200) {
                    toast.success(addAdminResponse.data.message);
                    // navigate('/');
                } else {
                    toast.error(addAdminResponse.data.message);
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
            <Box bg={'#F1F2F4'} h={{ base: "fit-content" }} w={'100%'} mt={3}>
                <HStack flexDir={{ base: "column", md: "row" }} mx={4} justify={'space-between'}>
                    <Link to={`/job/${id}`}>
                        <HStack>
                            <ArrowBackIcon />
                            <Text fontSize={'18px'} fontWeight={'500'} fontFamily={'Inter'} textColor={'#18191C'}>
                                Go Back
                            </Text>
                        </HStack>
                    </Link>
                    <Breadcrumb fontWeight='medium' fontSize={{ base: "14", md: "16" }} my={2}>
                        <BreadcrumbItem textColor={'#767F8C'}>
                            <Link to={'/'}>
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem textColor={'#767F8C'}>
                            <Link to={`/job/${id}`}>
                                Job Details
                            </Link>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href='#'> apply job</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </HStack>
            </Box>
            <Box minH={'80vh'} w={{ base: '100%', md: '80%' }} m={'auto'}>
                <Box bg={'#f4f5f4'} px={2} p={{ base: "2", md: "10" }} my={3} border={'1px solid #D9D9D9'} rounded={'xl'}>
                    <Heading mt={{ base: "1", md: -6 }} fontWeight={'500'} textColor='#2B8F65' fontSize={{ base: "24", md: "40" }} textAlign="center">
                        Apply Job
                    </Heading>
                    <Heading fontWeight={'400'} mt={3} textAlign="center" fontSize={{ base: "12", md: "16" }} textColor="#313131">
                        Connect with Us: Reach Out and Join Our Talent Community!
                    </Heading>
                    <form onSubmit={handleSubmit}>
                        <Flex flexDir={'column'} gap={4}>
                            <HStack mt='1'>
                                <FormControl isInvalid={errors.firstName}>
                                    <FormLabel>First Name</FormLabel>
                                    <Input
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="First Name"
                                        maxLength="40"
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        color="black"
                                        outline="none"
                                    />
                                    <FormErrorMessage textColor={'red'}>{errors.firstName}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.lastName}>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Last Name"
                                        maxLength="40"
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        color="black"
                                        outline="none"
                                    />
                                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                                </FormControl>
                            </HStack>

                            <HStack>
                                <FormControl isInvalid={errors.email}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="john.doe@gmail.com"
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        color="black"
                                        outline="none"
                                    />
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.phoneNumber}>
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        type="tel"
                                        placeholder="0000000000"
                                        pattern="[0-9]{10}"
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        color="black"
                                        outline="none"
                                    />
                                    <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                                </FormControl>
                            </HStack>

                            <HStack>
                                <FormControl isInvalid={errors.authorizedToUSA}>
                                    <FormLabel> Work In US</FormLabel>
                                    <Select
                                        name="authorizedToUSA"
                                        value={formData.authorizedToUSA}
                                        onChange={handleChange}
                                        placeholder='Select option'
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        color="black"
                                        outline="none"
                                    >
                                        <option value='true'>Yes</option>
                                        <option value='false'>No</option>
                                    </Select>
                                    <FormErrorMessage>{errors.authorizedToUSA}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.visaSponsorship}>
                                    <FormLabel>Visa Sponsorship</FormLabel>
                                    <Select
                                        name="visaSponsorship"
                                        value={formData.visaSponsorship}
                                        onChange={handleChange}
                                        placeholder='Select option'
                                        border="1px solid #79747E"
                                        focusBorderColor="none"
                                        bg="white"
                                        color="black"
                                        outline="none"
                                    >
                                        <option value='true'>Yes</option>
                                        <option value='false'>No</option>
                                    </Select>
                                    <FormErrorMessage>{errors.visaSponsorship}</FormErrorMessage>
                                </FormControl>
                            </HStack>

                            <FormControl isInvalid={errors.Referrer}>
                                <FormLabel>Referrer (optional) </FormLabel>
                                <Input
                                    name="Referrer"
                                    value={formData.Referrer}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Referrer"
                                    border="1px solid #79747E"
                                    focusBorderColor="none"
                                    bg="white"
                                    color="black"
                                    outline="none"
                                />
                                <FormErrorMessage>{errors.Referrer}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.resume}>
                                <FormLabel>Upload your CV</FormLabel>
                                <Box
                                    p="4"
                                    borderWidth="2px"
                                    borderRadius="md"
                                    borderStyle="dashed"
                                    borderColor="gray.300"
                                    cursor="pointer"
                                    _hover={{ borderColor: 'gray.500' }}
                                    onClick={() => document.getElementById('resumeInput').click()}
                                >
                                    <HStack justify={'center'}>
                                        <Text textAlign={'center'} >Click or drag a file to this area to upload. </Text>
                                        <MdAttachFile />
                                    </HStack>
                                </Box>
                                <Input
                                    id="resumeInput"
                                    name="resume"
                                    accept=".pdf,application/pdf" // Accept only PDF files
                                    type="file"
                                    onChange={handleFileChange}
                                    display="none"
                                />
                                {formData.resume && (
                                    <HStack mt={2} textAlign="center">
                                        <Box className='hide-scrollbar' w={'300px'} h={'200px'}>
                                            <embed src={formData.resumePreview} width="100%" height="200px" type="application/pdf" />
                                        </Box>
                                        <Text fontSize={{ base: "10", md: "14px" }}>{formData.resume.name}</Text>
                                    </HStack>
                                )}
                                <FormErrorMessage>{errors.resume}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.coverLetter}>
                                <FormLabel>Upload Cover Letter</FormLabel>
                                <Box
                                    p="4"
                                    borderWidth="2px"
                                    borderRadius="md"
                                    borderStyle="dashed"
                                    borderColor="gray.300"
                                    cursor="pointer"
                                    _hover={{ borderColor: 'gray.500' }}
                                    onClick={() => document.getElementById('coverLetterInput').click()}
                                >
                                    <HStack justify={'center'}>
                                        <Text textAlign={'center'} >Click or drag a file to this area to upload. </Text>
                                        <MdAttachFile />
                                    </HStack>
                                </Box>
                                <Input
                                    id="coverLetterInput"
                                    name="coverLetter"
                                    accept=".pdf,application/pdf" // Accept only PDF files
                                    type="file"
                                    onChange={handleFileChange}
                                    display="none"
                                />
                                {formData.coverLetter && (
                                    <HStack mt={2} textAlign="center">
                                        <Box className='hide-scrollbar' w={'300px'} h={'200px'}>
                                            <embed src={formData.coverLetterPreview} width="100%" height="200px" type="application/pdf" />
                                        </Box>
                                        <Text fontSize={{ base: "10", md: "14px" }}>{formData.coverLetter.name}</Text>
                                    </HStack>
                                )}
                                <FormErrorMessage>{errors.coverLetter}</FormErrorMessage>
                            </FormControl>


                            <Button
                                mt={4}
                                w={{ base: "100%", md: "40%" }}
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
                        </Flex>
                    </form>
                </Box>
            </Box>
        </>

    );
};

export default JobApply;
