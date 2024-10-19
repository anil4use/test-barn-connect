import React from 'react'
import {
    Box, Text,
    HStack,
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
} from '@chakra-ui/react'
import faqsRightImg from '../../assets/images/faqsRightImg.png'
import { MinusIcon, AddIcon } from '@chakra-ui/icons'
import { useState } from 'react';
function index() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const Data = [
        {
            question: "What is Webflow and why is it the best website builder?",
            answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."
        },
        {
            question: "What is Webflow and why is it the best website builder?",
            answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."
        },
        {
            question: "What is Webflow and why is it the best website builder?",
            answer: "Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere."
        },

    ]
    return (
        <HStack
            flexDir={{ base: "column", lg: "row" }} w={'98%'} m={'auto'} pb={10} >
            <Box alignSelf={'start'} w={{ base: "100%", lg: "60%" }}>
                <Text textColor={'#2b8f65'} fontWeight={'700'} fontSize={'20px'}>
                    FAQS.
                </Text>
                <Text textColor={'#000000'} fontWeight={'700'} fontSize={{ base: "20px", md: "28px" }}>
                    Frequently Asked Questions.
                </Text>
                <Accordion allowMultiple={false} defaultIndex={0}>
                    {Data.map((item, i) => (
                        <AccordionItem key={i}>
                            {({ isExpanded }) => (
                                <div>
                                    <h2>
                                        <AccordionButton pb={4} pt={4} onClick={() => handleToggle(i)}>
                                            <Box textColor={!isExpanded ? "#170F49" : "#2b8f65"} fontWeight={'600'} fontSize={{ base: "16px", md: "22px" }} flex='1' textAlign='left'>
                                                {item.question}
                                            </Box>
                                            {isExpanded ? (
                                                <MinusIcon textColor={'#2b8f65'} fontSize='14px' fontWeight={'700'} />
                                            ) : (
                                                <AddIcon fontSize='14px' textColor={'#170F49'} fontWeight={'700'} />
                                            )}
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel textColor={'#6F6C90'} pb={4} display={isExpanded ? 'block' : 'none'}>
                                        {item.answer}
                                    </AccordionPanel>
                                </div>
                            )}
                        </AccordionItem>
                    ))}
                </Accordion>
            </Box>
            <Box display={{ base: "none", lg: "block" }} w={'40%'}>
                <Image src={faqsRightImg} align={'image'} />
            </Box>

        </HStack>
    )
}

export default index