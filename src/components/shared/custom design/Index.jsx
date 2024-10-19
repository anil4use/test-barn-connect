import {
    Text, Button, Box, Popover,
    Image,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Spinner,
    Radio
    , RadioGroup,
    HStack

} from '@chakra-ui/react'
import Video from '../../../assets/video/video.mp4'
import Pause_Icon from '../../../assets/images/pause-Icon.png'
import Play_Icon from '../../../assets/images/play-Icon.png'


import { ChevronDownIcon, ChevronUpIcon, StarIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useRef } from 'react'

export const MainHeading = ({ children, textAlign = "center" }) => {
    return (
        <Text textAlign={textAlign} fontSize={'32px'} fontWeight={'700'} lineHeight={'29px'} textColor={'#2b8f65'} fontFamily={'Kaushan,sans-serif'}>
            {children}
        </Text>
    )
}
export const MainSubHeading = ({ textColor = '#000000', paddingY = '0', fontSize = "24px", children, textAlign = "center" }) => {
    return (
        <Text fontSize={fontSize} py={paddingY}
            textAlign={textAlign} fontWeight={'700'} textColor={textColor} >
            {children}
        </Text>
    )
}
export const OurButton = ({ bg = '#2b8f65', width = 'fit-content', children, onClick, loading = false }) => {
    return (
        <Button
            mt={4}
            fontFamily={"Roboto,sans-serif"}
            colorScheme='#2b8f65' bg={bg}
            textColor={'white'}
            rounded={'full'}
            isLoading={loading}
            onClick={onClick}
            w={width}
            h={10}
            _hover={{ bg: "disable" }}
            fontWeight={'500'} >
            {children}
        </Button>
    )
}

export const Rating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            // Render a filled star
            stars.push(<StarIcon gap={2} key={i} ml={'2px'} textColor="#2b8f65" />);
        } else {
            // Render an empty star
            stars.push(<StarIcon key={i} ml={'2px'} textColor="#bfbfbf" />);
        }
    }
    return <>{stars}</>;
};

export const CustomCheckbox = ({ children = '', isChecked, setIsChecked, display = "block", defaultChecked = false }) => {

    return (
        <Box display={display}>
            <div className="custom-checkbox-container">
                <label className="custom-checkbox">
                    <input
                        type="checkbox"
                        defaultChecked={defaultChecked}
                        // checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <span className="checkmark"></span>
                    {/* Optional label */}
                    <Box fontWeight={'600'} textColor={isChecked ? "#2b8f65" : "#474B57"} className="label-text">{children}</Box>
                </label>
            </div>
        </Box>
    );
};


export const FloatingButton = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [active, SetActive] = useState(false);
    const videoRef = useRef(null);
    const togglePlayPause = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };
    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };
    return (
        <Box position='fixed'
            bottom='20px'

            // right={['16px', '84px', '84px', '84px', '120px']}
            right={'1%'}
            zIndex={2}
        >

            <Popover placement='top-start'>
                <PopoverTrigger>
                    <Button
                        fontFamily={"Roboto,sans-serif"}
                        colorScheme="#2b8f65"
                        bg={"#2b8f65"}
                        textColor={"white"}
                        rounded={"md"}
                        // w={{ base: "20", lg: "40" }}
                        //   h={12}
                        _hover={{ bg: "disable" }}
                        fontWeight={"500"}
                        fontSize={'28'}

                        onClick={() => SetActive(!active)}

                    >{active ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent p={0} h={'fit-content'} w={{ base: "380px", md: "400px" }}>
                    {/* <PopoverHeader fontWeight='semibold'>Popover placement</PopoverHeader> */}
                    <PopoverArrow />
                    {/* <PopoverCloseButton />   */}
                    <PopoverBody p={0} display={'flex'} w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
                        <Box
                            overflow={"hidden"}
                            borderRadius={{ base: "0", lg: "8px" }}
                            pos={"relative"}
                            bg={"none"}
                            display={"flex"} justifyContent={"center"}
                            alignItems={"center"}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <video
                                ref={videoRef}
                                onClick={togglePlayPause}
                                muted
                                width={"100%"}
                                height={"100%"}
                                src={Video}
                                autoPlay
                                loop
                            ></video>
                            {isHovering && (
                                <Button
                                    colorScheme="none"
                                    bg={"transparent"}
                                    _hover={"disable"}
                                    zIndex={99999}
                                    pos={"absolute"}
                                    onClick={togglePlayPause}
                                >

                                    <Image src={!isPlaying ? Play_Icon : Pause_Icon} alt="icon" />
                                </Button>
                            )}
                        </Box>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    )
}


export const SpinnerView = ({ h = '90vh' }) => {
    // <Box border={'1px'} h={h} display={'flex'} justifyContent={'center'} justifyItems={'center'} alignItems={'center'}>
    <Spinner
        zIndex={999}
        w={'300'}
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='#2b8f65'
        size='xl'
    />
    // </Box>
}
export const Heading = ({ children }) => {
    return (
        <Box textAlign={'start'} as="p" fontWeight={700} mb={1} mt={4}>
            {children}
        </Box>

    )
}
export const Heading2 = ({ children }) => {
    return (
        <Box textAlign={'start'} as="p" >
            {children}
        </Box>

    )
}

export const SortItems = ({ setSort, sort, src }) => {
    return (
        <Popover isLazy>
            <PopoverTrigger>
                <HStack>
                    <Image cursor={'pointer'} src={src} />
                </HStack>
            </PopoverTrigger>
            <PopoverContent w={{ base: "40", md: "40" }} mt={'2px'} mr={{ base: "0", md: "10" }} bg={'#91c3ae'} border={'none'} outline={'none'}>
                <PopoverArrow ml={{ base: "0", md: "5" }} bg={'#91c3ae'} />
                <PopoverBody>
                    <RadioGroup onChange={(value) => setSort(parseInt(value))} value={String(sort)}>
                        <Radio colorScheme="green" value='1'><Text fontWeight={'bold'} textColor={'white'}>Low to High</Text></Radio>
                        <Radio colorScheme="green" value='-1'><Text fontWeight={'bold'} textColor={'white'}>High to Low</Text></Radio>
                    </RadioGroup>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}