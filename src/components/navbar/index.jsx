import React, { useState,useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  Stack,
  Switch,
  Image,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  FormControl,
  FormLabel,
  Modal,
  Radio,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  RadioGroup,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import LOGO from "../../assets/images/barm-logo.png";
import Profile_Icon from "../../assets/images/profile-Icon.png";
import OrderHistoyIcon from "../../assets/images/order-hitory.png";
import LogoutIcon from "../../assets/images/logout.png";
import userIcon from "../../assets/images/profile.png";
import { Link } from "react-router-dom";
import { useLocation, NavLink as act, Link as kkkkk } from "react-router-dom";
import { useAuthenticated } from "../../hooks/useAuthenticated.hook";
import { logout } from "../../utils/common.util";
import { useNavigate } from "react-router-dom";
import wishlist from "../../assets/images/wishlist.svg";
import wishlistActive from "../../assets/images/wishlistActive.svg";
import Product from "../../assets/images/Product.svg";
import productActive from "../../assets/images/ProductActive.svg";
import cart from "../../assets/images/cart.svg";
import cartActive from "../../assets/images/cartActive.svg";
import service from "../../assets/images/service.svg";
import serviceActive from "../../assets/images/serviceActive.svg";
import barn from "../../assets/images/barn.svg";
import barnActive from "../../assets/images/barnActive.svg";
import { RentalToggle } from "../../redux/redux-slice/product.slice";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../apis/auth/auth.api";
import { GrUserAdmin } from "react-icons/gr";
import toast from "react-hot-toast";


const Links = [
  {
    name: "Barns",
    url: "/barns",
    icon: barn,
    ActiveIcon: barnActive,
    line: true,
  },
  {
    name: "Services",
    url: "/services",
    icon: service,
    ActiveIcon: serviceActive,
    line: true,
  },

  {
    name: "Product",
    url: "/products",
    icon: Product,
    ActiveIcon: productActive,
    line: true,
  },
];

const ProfileLinks = [
  {
    name: "My Account",
    url: "/profile",
    icon: userIcon,
    ActiveIcon: userIcon,
    line: true,
  },

  // {
  //     name: "My-Order",
  //     url: "/my-order",
  //     icon: userIcon,
  //     ActiveIcon: userIcon,
  //     line: true
  // },
  {
    name: "Order-History",
    url: "/order-history",
    icon: OrderHistoyIcon,
    ActiveIcon: userIcon,
    line: true,
  },

  {
    name: "Cart",
    url: "/cart",
    icon: cart,
    ActiveIcon: cartActive,
    line: true,
  },
  {
    name: "Wishlist",
    url: "/wishlist",
    icon: wishlist,
    ActiveIcon: wishlistActive,
    line: true,
  },
];

const NavLink = ({ link, onClose }) => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const isAuth = useAuthenticated();

  return (
    <Link to={link.url} onClick={onClose}>
      <HStack
        display={isAuth && link.url === "horses" ? "none" : "flex"}
        py={1}
        rounded={"md"}
        // gap={2}
      >
        <HStack gap={1}>
          <Image
            w={4}
            src={location === link.url ? link.ActiveIcon : link.icon}
            alt="icon"
          />
          <Text
            textColor={location === link.url ? "#2b8f65" : "black"}
            fontWeight={"bold"}
          >
            {link.name}
          </Text>
        </HStack>
        {link.line && (
          <Box
            ml={2}
            pr={-1}
            display={{ base: "none", lg: "block" }}
            h={"20px"}
            borderRadius={"20px"}
            w={"1px"}
            border={"1px"}
            borderColor={"#FFB7B7"}
          />
        )}
      </HStack>
    </Link>
  );
};

export default function WithAction() {
  const authApi = new Auth();
  const [adminType, setAdminType] = useState(""); // Default selected option

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuth = useAuthenticated();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      const VerifyCodeResponse = await authApi.verifyToken({
        token: "handleSubmit",
      });
      if (VerifyCodeResponse.data.code === 200) {
        navigate("/login");
        toast.success(VerifyCodeResponse.data.message);
      } else {

        toast.error(VerifyCodeResponse.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      // console.log('VerifyCodeResponses');
    }
  };



  return (
    <Box as="nav" zIndex={999} top={0} pos={"sticky"} w={"100%"}>
      {/* <Box gap={3} px={{ base: "1px", lg: "10" }} pr={3} bg={'black'} h={'35px'} w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <HStack >
                    <HStack textColor={'white'} fontWeight={'bold'}>
                        <MdPhone /> <Text fontSize={{ base: "10px", md: "14px" }}>Tel: 888 688 6822 </Text>
                    </HStack>
                    <HStack textColor={'white'} fontWeight={'bold'}>
                        <MdOutlineMail />
                        <Text fontSize={{ base: "10px", md: "14px" }}>
                            contact@barnconnect.com
                        </Text>
                    </HStack>
                </HStack>
                <HStack display={{ base: "flex", md: "flex" }}>
                    <SocialLinks Icon={<FaLinkedinIn />}
                        Link={'#'} />
                    <SocialLinks Icon={<FaXTwitter />}
                        Link={'#'} />
                    <SocialLinks Icon={<FaInstagram />}
                        Link={'#'} />
                    <SocialLinks Icon={<FaYoutube />}
                        Link={'#'} />
                    <SocialLinks Icon={<FaFacebookF />}
                        Link={'#'} />
                </HStack> */}

      {/* {
                    !isAuth ?
                        <Link to={'/sign-up'}>
                            <Text cursor={'pointer'} textColor={'white'} fontWeight={'bold'}>
                                Register
                            </Text>
                        </Link> : <Text onClick={() => {
                            logout(navigate)
                        }} cursor={'pointer'} textColor={'white'} fontWeight={'bold'}>
                            logout
                        </Text>} */}
      {/* <Box display={{ base: "none", lg: "block" }} h={'20px'} borderRadius={'20px'} w={'1px '} border={'1px'} borderColor={'#FFB7B7'} />
                <HStack cursor={'pointer'}>
                    {
                        !isAuth ?
                            <Link to={'/login'}>
                                <Text textColor={'white'} fontWeight={'bold'}>
                                    login
                                </Text>
                            </Link> :
                            ""}
                    <Link to={'/card'}>
                        <Image src={Card_Icon} alt='icon' />
                    </Link>
                </HStack> */}

      {/* </Box> */}
      <Box
        boxShadow={"rgba(0, 0, 0, 0.15) 0px 3.4px 3px 1px"}
        bg={"#ffff"}
        px={{ base: "0", md: "2" }}
      >
        <Flex
          h={16}
          alignItems={"center"}
          gap={2}
          justifyContent={{ base: "start", md: "space-between" }}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            ml={2}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link to={"/"}>
              <Image w={28} src={LOGO} alt="logo" />
            </Link>
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
          </HStack>
          {/* <Button onClick={onOpen}>Open Modal</Button> */}
          {/* <Modal
            isOpen={isOpen}
            onClose={() => {
              setIsToggled(false); // Reset toggle state when modal is closed
              onClose(); // Call the original onClose function
            }}
          >
            <ModalOverlay
              bg="rgba(0, 0, 0, 0.5)" // Semi-transparent black background
              backdropFilter="blur(10px)" // Blurry background effect
            />
            <ModalContent>
              <ModalHeader>Want to become ?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <RadioGroup onChange={setAdminType} value={adminType}>
                  <Stack direction="column">
                    <Radio value="serviceProvider">Service Provider</Radio>
                    <Radio value="BarnOwner">Barn Owner</Radio>
                    <Radio value="productSeller">Product Seller</Radio>
                  </Stack>
                </RadioGroup>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  mr={3}
                  onClick={() => {
                    setIsToggled(!isToggled); // Toggle the state
                    onClose(); // Close the modal
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  colorScheme="green"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Next
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal> */}

          <Flex alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(
                (link, index) =>
                  (isAuth || link.url !== "/horses") && (
                    <NavLink key={index} link={link} />
                  )
              )}
              <Profile navigate={navigate} onClose={onClose} />
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box
            pl={2}
            w={"100%"}
            bg={"white"}
            mt={-1}
            pos={"fixed"}
            pb={4}
            display={{ md: "none" }}
          >
            <Stack as={"nav"} spacing={4}>
              {Links.map(
                (link, index) =>
                  (isAuth || link.url !== "/horses") && (
                    <NavLink onClose={onClose} key={index} link={link} />
                  )
              )}
              <Profile navigate={navigate} onClose={onClose} />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
const SocialLinks = ({ Icon, Link }) => {
  return (
    <Box
      as="a"
      rounded={"full"}
      fontSize={{ base: "10px", md: "md" }}
      // h={6}
      textColor={"white"}
      _hover={{ textColor: "#03A8B2" }}
      target="_blank"
      href={Link}
    >
      {Icon}
    </Box>
  );
};
const Profile = ({ onClose,onOpen }) => {

  const isAuth = useAuthenticated();
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const [userData, setUserData] = useState([]);
  // const data = useSelector((state) => state.user.v_user_info);
  const authApi = new Auth();


  const handletglBtn = async () => {    
    try {
      const VerifyCodeResponse = await authApi.getUserDetail({
        token: "handleSubmit",
      });
      let e = VerifyCodeResponse?.data;
      if (VerifyCodeResponse?.data?.code === 200) {
        setUserData(e?.data)
      } else {
        if (VerifyCodeResponse?.data?.message === "Unauthorized") {          
        logout(navigate);
        }
        toast.error(VerifyCodeResponse?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      // console.log('VerifyCodeResponses');
    }
  };
  const handleToggle = (checked) => {
    setIsToggled(checked);
    if (checked) {
      window.open("http://localhost:5174/admin", "_blank");
    } else {
      navigate("/");
    }
  };
  

  return (
    <div>
      {!isAuth ? (
        <HStack>
          <Link to={"/login"} onClick={onClose}>
            <Text cursor={"pointer"} textColor={"#2b8f65"} fontWeight={"bold"}>
              Login
            </Text>
          </Link>
          <p>or</p>
          <Link to={"/sign-up"} onClick={onClose}>
            <Text cursor={"pointer"} textColor={"#2b8f65"} fontWeight={"bold"}>
              Register
            </Text>
          </Link>
        </HStack>
      ) : (
        <Popover isLazy>
          <PopoverTrigger>
            <HStack
              pb={1}
              cursor={"pointer"}
              textColor={location === "/profile" ? "#2b8f65" : "black"}
              fontWeight={"bold"}
              onClick={handletglBtn}
            >
              <Image w={4} src={Profile_Icon} alt="icon" />
              <Text>Profile</Text>
            </HStack>
          </PopoverTrigger>
          <PopoverContent
            textColor={"black"}
            w={{ base: "96", md: "60" }}
            mr={{ base: "0", md: "4" }}
            bg={"white"}
            border={"none"}
            outline={"none"}
            mt="4"
          >
            <PopoverArrow bg={"white"} />
            <PopoverBody>
              {ProfileLinks &&
                ProfileLinks.map((item, index) => {
                  return (
                    <div key={index}>
                      <Link to={`${item.url}`} onClick={onClose}>
                        <HStack h={10} cursor={"pointer"}>
                          <Image
                            tintColor={"#000000"}
                            w={6}
                            src={
                              location === item?.url
                                ? item.ActiveIcon
                                : item.icon
                            }
                            alt="icon"
                          />
                          <Text
                            fontFamily={"Poppins"}
                            fontSize={"14px"}
                            textColor={"black"}
                          >
                            {item.name}
                          </Text>
                        </HStack>
                      </Link>
                      <Divider bg={"rgba(151, 214, 188, 1)"} />
                    </div>
                  );
                })}

              {userData?.isAdmin ? (
                <>
                  <Divider bg={"rgba(151, 214, 188, 1)"} />
                  <HStack h={10} cursor={"pointer"}>
                    <Switch
                      isChecked={isToggled}
                      onChange={(e) => {handleToggle(e.target.checked)}}
                    />
                     {/* <Image
                            tintColor={"#000000"}
                            w={6}
                            src={
                              location === item?.url
                                ? item.ActiveIcon
                                : item.icon
                            }
                            alt="icon"
                          /> */}
                    <Text
                      fontFamily={"Poppins"}
                      fontSize={"14px"}
                      textColor={"black"}
                    >
                      Switch Admin
                    </Text>
                  </HStack>
                </>
              ) : 
               <>
              <Divider bg={"rgba(151, 214, 188, 1)"} />
              <HStack h={10} cursor={"pointer"}>
              {/* &nbsp;&nbsp; */}
              <GrUserAdmin size={'20px'} pl={'5px !important'} />
                <Text
                  fontFamily={"Poppins"}
                  fontSize={"14px"}
                  textColor={"black"}
                  onClick={(()=>{navigate("/become-member")})}
                >
                  Become a member
                </Text>
              </HStack>
            </>}

              <Divider bg={"rgba(151, 214, 188, 1)"} />
              <HStack
                onClick={() => {
                  logout(navigate);
                }}
                h={10}
                cursor={"pointer"}
              >
                <Image w={6} src={LogoutIcon} alt="icon" />
                <Text
                  fontFamily={"Poppins"}
                  fontSize={"14px"}
                  textColor={"black"}
                >
                  Logout
                </Text>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

const Links2 = [
  {
    name: "Orders-History",
    url: "//order-history",
    icon: Profile_Icon,
    line: true,
  },
  {
    name: "Orders-History",
    url: "//order-history",
    icon: Profile_Icon,
    line: true,
  },
];
