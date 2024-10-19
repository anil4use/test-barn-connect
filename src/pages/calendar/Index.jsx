import React from 'react'
import {
    Box, Text,
    HStack,
    Image, Select,
    Flex, SimpleGrid,
    Grid, Heading, Stack,
    Card, CardBody, VStack,
    Checkbox,
    Divider,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Button
} from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import BannerImg from '../../assets/images/calendarBanner.png'
import ProductBanner from '../../components/shared/banner/Index'
import { useState } from 'react';
import { SmallAddIcon } from '@chakra-ui/icons';
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import MyCalendar from './Calendar';

function Index() {

    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }

    return (
        <Box pos={'relative'}>
            <ProductBanner BannerImage={BannerImg} Heading={'Calendar'} Breadcrumb={'Home Calendar'} />
            <Box border={'1px solid red'} >



                <div>
                    <MyCalendar />
                </div>




            </Box>

        </Box>
    )
}

export default Index
