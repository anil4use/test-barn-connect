import React, { useState } from 'react';
import {
    Box, Text, Flex, Divider, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    SkeletonText,
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
    Input
} from '@chakra-ui/react';
import filter from "../../../assets/icons/filter.svg";

import { debounce } from 'lodash'; // Import debounce function from lodash library
import { ChevronDownIcon } from '@chakra-ui/icons';
import ProductApi from '../../../apis/product.api';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function SideBarComponent({ setSliderValues, sliderValues, loading, category, cat = false }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const handleMinPriceChange = (e) => {
        let newMinPrice = parseInt(e.target.value);
        if (isNaN(newMinPrice) || newMinPrice < 0) {
            newMinPrice = 0;
        }
        if (newMinPrice >= sliderValues[1]) {
            newMinPrice = sliderValues[1] - 100;
        }
        setSliderValues([newMinPrice, sliderValues[1]]);
    };

    const handleMaxPriceChange = (e) => {
        let newMaxPrice = parseInt(e.target.value);
        if (isNaN(newMaxPrice) || newMaxPrice > 10000) {
            newMaxPrice = 10000;
        }
        if (newMaxPrice <= sliderValues[0]) {
            newMaxPrice = sliderValues[0] + 100;
        }
        setSliderValues([sliderValues[0], newMaxPrice]);
    };

    const handleSliderChange = (newValues) => {
        setSliderValues(newValues);
    };


    return (
        <>
            <Flex position={'relative'} overflow={'scroll'} display={{ base: "none", lg: "flex" }} alignSelf={'start'} pos={'sticky'} top={20} w={{ base: "100%", lg: "25%" }} h={{ base: "fit-content", xl: "640px" }} bg={'white'} border={'1px solid rgba(0, 0, 0, 0.2)'} rounded={'md'} p={{ base: "2", lg: "10" }} boxShadow={'md'} mt={4} flexDir={'column'} gap={2}
                className="hide-scrollbar">
                <MainComponent cat={cat} loading={loading} category={category} handleMaxPriceChange={handleMaxPriceChange} handleMinPriceChange={handleMinPriceChange} sliderValues={sliderValues} handleSliderChange={handleSliderChange} />
            </Flex>
            <Flex display={{ base: "flex", lg: "none" }} w={'100%'} justify={'end'} alignSelf={'end'} justifySelf={'end'} >
                {/* <Input placeholder='search' w={'100%'} /> */}
                <Image ref={btnRef} onClick={onOpen} cursor={'pointer'} src={filter} />
            </Flex>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <MainComponent loading={loading} category={category} handleMaxPriceChange={handleMaxPriceChange} handleMinPriceChange={handleMinPriceChange} sliderValues={sliderValues} handleSliderChange={handleSliderChange} />
                    </DrawerBody>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </>

    )
}

export default SideBarComponent;

const MainComponent = ({ loading, category, handleMaxPriceChange, handleMinPriceChange, sliderValues, handleSliderChange, cat }) => {
    return (
        <Box>
            <Text textColor={'#0E1422'} fontWeight={'500'} fontSize={'20px'}>
                Categories
            </Text>
            {
                loading ?
                    <>
                        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                        <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='1' />
                        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                        <SkeletonText mt='4' noOfLines={1} spacing='4' skeletonHeight='4' />
                    </>
                    : <>
                        <Flex mt={4} flexWrap={'wrap'} flexDir={{ base: "row", md: "column" }} gap={1}>
                            {category && category.map((item, index) => (
                                <React.Fragment key={index}>
                                    <Custombox item={item} index={index} cat={cat} />
                                    <Divider border={'1px solid #ccccc'} mt={2} />
                                </React.Fragment>
                            ))}
                        </Flex>
                        <Box>
                            <Text mt={8} textColor={'#0E1422'} fontWeight={'500'} fontSize={'20px'}>
                                Price
                            </Text>
                            <RangeSlider
                                aria-label={['min', 'max']}
                                onChange={handleSliderChange}
                                min={0}
                                max={10000}
                                step={100}
                                value={sliderValues} // Use sliderValues to control the slider
                            >
                                <RangeSliderTrack>
                                    <RangeSliderFilledTrack bg={'#2b8f65'} />
                                </RangeSliderTrack>
                                <RangeSliderThumb index={0} />
                                <RangeSliderThumb index={1} />
                            </RangeSlider>
                            <HStack justify={'space-between'} w={'100%'}>
                                <Flex w={'45%'} flexDir={'column'}>
                                    <label>
                                        From
                                    </label>
                                    <Input onChange={handleMinPriceChange} value={sliderValues[0]} border={'1px solid #cccccc'} h={'10'} />
                                </Flex>
                                <Flex w={'45%'} flexDir={'column'}>
                                    <label>
                                        To
                                    </label>
                                    <Input onChange={handleMaxPriceChange} value={sliderValues[1]} border={'1px solid #cccccc'} h={'10'} />
                                </Flex>
                            </HStack>
                        </Box>
                    </>}
        </Box>
    )
}

const Custombox = ({ item, index, cat }) => {
    const [isdropdown, setIsdropdown] = useState(true)
    return (
        <Menu key={index}>
            <HStack mt={4} cursor={'pointer'} textColor={!isdropdown ? "#2b8f65" : "black"} onClick={() => { setIsdropdown(!isdropdown) }} gap={3} w={'100%'} justify={'space-between'}>
                <Link to={!cat ? `/services?cat=${item?.serviceCategoryId}` : ""}>
                    <Box fontWeight={'600'} textAlign={'start'} textColor={!isdropdown ? "#2b8f65" : "black"} >
                        {item?.name}
                    </Box>
                </Link>
                {
                    cat && (
                        <ChevronDownIcon />
                    )
                }
            </HStack>
            {
                cat && (
                    <Box h={'fit-content'} animation={'90s ease-in-out'} transition="height 0.3s ease-in-out" m={'auto'} w={'100%'} display={isdropdown ? "none" : 'inline-block'} >
                        {
                            item?.subCategory?.map((sub, index) => {
                                return (
                                    <Link key={index} to={`/products?cat=${item?.categoryId}&subcat=${sub?.subCategoryId}`}>
                                        <MenuItem ml={-0} key={index} minH='48px'>
                                            {/* <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src={sub?.image}
                                                alt='Fluffybuns the destroyer'
                                                mr='12px'
                                            /> */}
                                            <span>{sub?.name}</span>
                                        </MenuItem>
                                    </Link>
                                )
                            })
                        }
                    </Box>

                )
            }
        </Menu>

    );
};
{/* <Box>
                <Box  pos={'absolute'} right={'0'} alignSelf={'end'} w={'2'} h={12} rounded={'md'} bg={!isdropdown ? '#2B8F65' : ""}>
                </Box>
            </Box> */}