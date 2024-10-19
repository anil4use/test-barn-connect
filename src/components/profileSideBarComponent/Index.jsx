import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Image,
  DrawerHeader,
  HStack,
  Heading,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  RadioGroup,
  Stack,
  Radio,
  ModalFooter,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { IoBagCheckOutline } from "react-icons/io5";
import { GiHorseHead } from "react-icons/gi";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { LiaAddressCard } from "react-icons/lia";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { CiDiscount1 } from "react-icons/ci";

export const ProfileSideBarComponent = () => {
  const location = useLocation().pathname;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adminType, setAdminType] = useState(""); // Default selected option

  const btnRef = React.useRef();

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
      onOpen();
    }
    // dispatch(RentalToggle(!rentalToggle));
  };
  return (
    <>
      <Flex
        position={"relative"}
        display={{ base: "none", lg: "flex" }}
        alignSelf={"start"}
        pos={"sticky"}
        top={20}
        w={{ base: "100%", lg: "25%" }}
        h={{ base: "fit-content", xl: "640px" }}
        bg={"white"}
        border={"1px solid rgba(0, 0, 0, 0.2)"}
        rounded={"md"}
        p={{ base: "2", lg: "10" }}
        boxShadow={"md"}
        mt={4}
        flexDir={"column"}
        gap={2}
      >
        <Heading
          py={2}
          fontWeight={"600"}
          fontSize={"24px"}
          textColor={"#0E1422"}
        >
          Profile
        </Heading>
        {sideLink.map((e, i) => {
          return (
            <Link to={e.path}>
              <HStack
                pb={5}
                alignSelf={"start"}
                textAlign={"start"}
                borderBottom={"1px solid #E9E9EB "}
                cursor={"pointer"}
                fontSize={"20px"}
                fontWeight={"600"}
                textColor={location === e.path ? "#2B8F65" : "black"}
              >
                {e?.icon}
                <Text>{e?.tittle}</Text>
                <Box>
                  <Box
                    pos={"absolute"}
                    right={"0"}
                    alignSelf={"end"}
                    w={"2"}
                    h={12}
                    mt={-5}
                    rounded={"md"}
                    bg={location === e.path ? "#2B8F65" : ""}
                  ></Box>
                </Box>
              </HStack>
            </Link>
          );
        })}
      </Flex>
      <Box
        w={"20%"}
        mr={"-10"}
        pt={2}
        display={{ base: "flex", lg: "none" }}
        justifyContent={"flex-end"}
      >
        <Button
          justifySelf={"end"}
          position={"relative"}
          right={0}
          ref={btnRef}
          onClick={onOpen}
        >
          <HamburgerIcon />
        </Button>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Box>
              <Heading
                py={2}
                fontWeight={"600"}
                fontSize={"24px"}
                textColor={"#0E1422"}
              >
                Profile
              </Heading>
              {sideLink.map((e, i) => {
                return (
                  <Link to={e.path}>
                    <HStack
                      pb={5}
                      alignSelf={"start"}
                      textAlign={"start"}
                      borderBottom={"1px solid #E9E9EB "}
                      cursor={"pointer"}
                      fontSize={"20px"}
                      fontWeight={"600"}
                      textColor={location === e.path ? "#2B8F65" : "black"}
                    >
                      {e?.icon}
                      <Text>{e?.tittle}</Text>
                      <Box>
                        <Box
                          pos={"absolute"}
                          right={"0"}
                          alignSelf={"end"}
                          w={"2"}
                          h={12}
                          mt={-5}
                          rounded={"md"}
                          bg={location === e.path ? "#2B8F65" : ""}
                        ></Box>
                      </Box>
                    </HStack>
                  </Link>
                );
              })}
              {/* <Box p={4}>
                <HStack spacing={4}>
                  <Text fontWeight={800}>User</Text>
                  <Switch
                    id="toggle-switch"
                    isChecked={isToggled}
                    onChange={handleToggle}
                    colorScheme={isToggled ? "green" : "blue"}
                  />
                  <Text fontWeight={800}>Admin</Text>
                </HStack>
              </Box> */}
            </Box>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
const sideLink = [
  {
    tittle: "My Account",
    path: "/profile",
    icon: <FaRegUser />,
  },
  // {
  //     tittle: "Wishlist",
  //     path: "/wishlist",
  //     icon: <GoHeart />,

  // },
  // {
  //     tittle: "My Order",
  //     path: "/order-tracking",
  //     icon: <IoBagCheckOutline />
  // },
  {
    tittle: "My Horse",
    path: "/horses",
    icon: <GiHorseHead />,
    // icon: barn,
    // ActiveIcon: barnActive,
    // line: true,
  },
  {
    tittle: "Order History",
    path: "/order-history",
    icon: <IoBagCheckOutline />,
  },
  {
    tittle: "Manage Address",
    path: "/manage-address",
    icon: <LiaAddressCard />,
  },
  {
    tittle: "Coupons",
    path: "/coupons",
    icon: <CiDiscount1 size={28} />,
  },
  //   {
  //     tittle: "",
  //     path: "/coupons",
  //     icon: <CiDiscount1 size={28} />
  // },
  // {
  //     tittle: "Jobs",
  //     path: "/jobs",
  //     icon: <CiDiscount1 size={28} />
  // },
];
