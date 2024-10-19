import React, { useState } from 'react';
import {
    Box, Text, Flex, Divider, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb,

    Image,
    HStack,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    RadioGroup,
    Radio,
    Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';
import filter from "../../assets/icons/filter.svg";
import { CustomCheckbox } from '../../components/shared/custom design/Index';
const SidebarComponent = ({ filters, setFilters, loading }) => {
    const btnRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };


    return (
        <>
            <Flex position={'relative'} overflow={'scroll'} mb={10} display={{ base: "none", lg: "flex" }} alignSelf={'start'} pos={'sticky'} top={20} w={{ base: "100%", lg: "25%" }} h={{ base: "fit-content", xl: '750px' }} bg={'white'} border={'1px solid rgba(0, 0, 0, 0.2)'} rounded={'md'} p={{ base: "2", lg: "10" }} boxShadow={'md'} mt={4} flexDir={'column'} gap={2} className="hide-scrollbar">
                <MainComponent filters={filters} handleFilterChange={handleFilterChange} />
            </Flex>

            <Flex display={{ base: "flex", lg: "none" }} w={'100%'} justify={'end'} alignSelf={'end'} justifySelf={'end'}>
                <Image ref={btnRef} onClick={onOpen} cursor={'pointer'} src={filter} />
            </Flex>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <MainComponent filters={filters} handleFilterChange={handleFilterChange} />
                    </DrawerBody>
                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default SidebarComponent;

const MainComponent = ({ filters, handleFilterChange }) => {
    const {
        locationValue,
        experienceLevel,
        postedDate,
        hourlySalaryValue,
        monthlySalaryValue,
        yearlySalaryValue,
        fullTime,
        temporary,
        partTime
    } = filters;

    const handleLocationChange = (value) => {
        handleFilterChange('locationValue', value);
    };

    const handleWorkExChange = (value) => {
        handleFilterChange('experienceLevel', value);
    };

    const handleDOPChange = (value) => {
        handleFilterChange('postedDate', value);
    };

    const handleHourlySalaryChange = (value) => {
        handleFilterChange('hourlySalaryValue', value);
    };

    const handleMonthlySalaryChange = (value) => {
        handleFilterChange('monthlySalaryValue', value);
    };

    const handleYearlySalaryChange = (value) => {
        handleFilterChange('yearlySalaryValue', value);
    };

    const handleFullTimeChange = (isChecked) => {
        handleFilterChange('fullTime', isChecked);
    };

    const handleTemporaryChange = (isChecked) => {
        handleFilterChange('temporary', isChecked);
    };

    const handlePartTimeChange = (isChecked) => {
        handleFilterChange('partTime', isChecked);
    };

    return (
        <Box>
            <Text textColor={'#0E1422'} fontWeight={'700'} mb={3} fontSize={'20px'}>
                Filter
            </Text>

            <Flex flexWrap={'wrap'} flexDir={{ base: "column", md: "column" }} gap={1}>
                <>
                    <Divider border={'1px solid #ccccc'} mt={2} />
                    <Text textColor={'#141414'} fontSize={'18px'} fontWeight={'semibold'}>Location</Text>
                    <CheckboxContainer name={'Remote job'} value={locationValue === 'Remote job'} onChange={() => handleLocationChange('Remote job')} />
                    <CheckboxContainer name={'Exact location'} value={locationValue === 'Exact location'} onChange={() => handleLocationChange('Exact location')} />
                    <CheckboxContainer name={'Within 15 km'} value={locationValue === 'Within 15 km'} onChange={() => handleLocationChange('Within 15 km')} />
                    <CheckboxContainer name={'Within 30 km'} value={locationValue === 'Within 30 km'} onChange={() => handleLocationChange('Within 30 km')} />
                    <CheckboxContainer name={'Within 50 km'} value={locationValue === 'Within 50 km'} onChange={() => handleLocationChange('Within 50 km')} />


                    <Divider border={'1px solid #ccccc'} mt={2} />
                    <Text textColor={'#141414'} fontSize={'18px'} fontWeight={'semibold'}>Date of posting</Text>
                    <CheckboxContainer name={'All time'} value={postedDate === 'All time'} onChange={() => handleDOPChange('All time')} />
                    <CheckboxContainer name={'Last 24 hours'} value={postedDate === '24h'} onChange={() => handleDOPChange('24h')} />
                    <CheckboxContainer name={'Last 3 days'} value={postedDate === '3d'} onChange={() => handleDOPChange('3d')} />
                    <CheckboxContainer name={'Last 7 days'} value={postedDate === '7d'} onChange={() => handleDOPChange('7d')} />

                    <Divider border={'1px solid #ccccc'} mt={2} />
                    <Text textColor={'#141414'} fontSize={'18px'} fontWeight={'semibold'}>Salary</Text>
                    <Tabs variant="unstyled" colorScheme="teal">
                        <TabList fontSize={'14px'} gap={'1px'} border={'1px solid #FFFFFF'}>
                            <Tab _selected={{ color: 'black', bg: '#E2FFF3' }} rounded={'md'} fontWeight={'semibold'} fontSize={'14px'} border={'1px solid #2B8F65'} >Hourly</Tab>
                            <Tab _selected={{ color: 'black', bg: '#E2FFF3' }} rounded={'md'} fontWeight={'semibold'} border={'1px solid #2B8F65'} >Monthly</Tab>
                            <Tab _selected={{ color: 'black', bg: '#E2FFF3' }} rounded={'md'} fontWeight={'semibold'} border={'1px solid #2B8F65'} >Yearly</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <CheckboxContainer name={'$0 - $20/hr'} value={hourlySalaryValue === '$0 - $20/hr'} onChange={() => handleHourlySalaryChange('$0 - $20/hr')} />
                                <CheckboxContainer name={'$20 - $40/hr'} value={hourlySalaryValue === '$20 - $40/hr'} onChange={() => handleHourlySalaryChange('$20 - $40/hr')} />
                                <CheckboxContainer name={'$40 - $60/hr'} value={hourlySalaryValue === '$40 - $60/hr'} onChange={() => handleHourlySalaryChange('$40 - $60/hr')} />
                                <CheckboxContainer name={'$60 - $80/hr'} value={hourlySalaryValue === '$60 - $80/hr'} onChange={() => handleHourlySalaryChange('$60 - $80/hr')} />
                                <CheckboxContainer name={'$80+/hr'} value={hourlySalaryValue === '$80+/hr'} onChange={() => handleHourlySalaryChange('$80+/hr')} />
                            </TabPanel>
                            <TabPanel>
                                <CheckboxContainer name={'$0 - $2k/mo'} value={monthlySalaryValue === '$0 - $2k/mo'} onChange={() => handleMonthlySalaryChange('$0 - $2k/mo')} />
                                <CheckboxContainer name={'$2k - $4k/mo'} value={monthlySalaryValue === '$2k - $4k/mo'} onChange={() => handleMonthlySalaryChange('$2k - $4k/mo')} />
                                <CheckboxContainer name={'$4k - $6k/mo'} value={monthlySalaryValue === '$4k - $6k/mo'} onChange={() => handleMonthlySalaryChange('$4k - $6k/mo')} />
                                <CheckboxContainer name={'$6k - $8k/mo'} value={monthlySalaryValue === '$6k - $8k/mo'} onChange={() => handleMonthlySalaryChange('$6k - $8k/mo')} />
                                <CheckboxContainer name={'$8k+/mo'} value={monthlySalaryValue === '$8k+/mo'} onChange={() => handleMonthlySalaryChange('$8k+/mo')} />
                            </TabPanel>
                            <TabPanel>
                                <CheckboxContainer name={'$0 - $50k/yr'} value={yearlySalaryValue === '$0 - $50k/yr'} onChange={() => handleYearlySalaryChange('$0 - $50k/yr')} />
                                <CheckboxContainer name={'$50k - $100k/yr'} value={yearlySalaryValue === '$50k - $100k/yr'} onChange={() => handleYearlySalaryChange('$50k - $100k/yr')} />
                                <CheckboxContainer name={'$100k - $150k/yr'} value={yearlySalaryValue === '$100k - $150k/yr'} onChange={() => handleYearlySalaryChange('$100k - $150k/yr')} />
                                <CheckboxContainer name={'$150k - $200k/yr'} value={yearlySalaryValue === '$150k - $200k/yr'} onChange={() => handleYearlySalaryChange('$150k - $200k/yr')} />
                                <CheckboxContainer name={'$200k+/yr'} value={yearlySalaryValue === '$200k+/yr'} onChange={() => handleYearlySalaryChange('$200k+/yr')} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>


                    <Divider border={'1px solid #ccccc'} mt={2} />
                    <Text textColor={'#141414'} fontSize={'18px'} fontWeight={'semibold'}>Work experience</Text>
                    <CheckboxContainer name={'Any experience'} value={experienceLevel === 'Any experience'} onChange={() => handleWorkExChange('Any experience')} />
                    <CheckboxContainer name={'Intership'} value={experienceLevel === 'Intership'} onChange={() => handleWorkExChange('Intership')} />
                    <CheckboxContainer name={'Work remotely'} value={experienceLevel === 'Work remotely'} onChange={() => handleWorkExChange('Work remotely')} />


                    <Divider border={'1px solid #ccccc'} mt={2} />
                    <Text textColor={'#141414'} fontSize={'18px'} fontWeight={'semibold'}>Type of employment</Text>

                    <CustomCheckbox isChecked={fullTime} setIsChecked={handleFullTimeChange}>Full-time</CustomCheckbox>
                    <CustomCheckbox isChecked={temporary} setIsChecked={handleTemporaryChange}>Temporary</CustomCheckbox>
                    <CustomCheckbox isChecked={partTime} setIsChecked={handlePartTimeChange}>Part-time</CustomCheckbox>


                </>
            </Flex>


        </Box>
    )
}

// const CheckboxContainer = ({ value, name, onChange }) => {
//     return (
//         <RadioGroup mt={2} value={value} onChange={onChange}>
//             <Radio size='md' value={name} colorScheme='green'>
//                 {name}
//             </Radio>
//         </RadioGroup>
//     );
// };


const CheckboxContainer = ({ value, name, onChange }) => {
    return (
        <Flex alignItems="center" mt={2}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
                type="radio"
                checked={value}
                onChange={onChange}
                style={{ marginRight: '8px', cursor: "pointer", width: "20px", height: "20px" }} // Adjust styling as needed
            />
            <Text>{name}</Text>
        </label>
    </Flex>
    );
};