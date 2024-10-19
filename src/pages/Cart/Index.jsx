import React, { useState, useEffect } from 'react';
import {
    Box, Text, HStack, Image, Button, TableContainer, Table, Tr, Th, Tbody, Thead, Td, Tfoot, Spinner, Flex, Heading
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import noCardFound from "../../assets/images/noCardFound.png";
import deliveryIcon from "../../assets/images/icon-delivery.png";
import returnIcon from "../../assets/images/Icon-return.png";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CartApi from '../../apis/cart.api';
import { getCartData } from '../../redux/redux-slice/cart.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

function Index() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const data = useSelector((state) => state.cart.Cart);
    console.log(data,'datas');
    
    const dispatch = useDispatch();
    const cartApi = new CartApi();
    

    const getCart = async () => {
        setLoading(true);
        try {
            const getCartResponse = await cartApi.getCart();
            if (getCartResponse.data.code === 200) {
                dispatch(getCartData(getCartResponse.data.data));
                setTotalPrice(getCartResponse.data.data.totalPrice);
            } else {
                toast.error(getCartResponse.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // if (data.length === 0) {
        getCart();
        // }
    }, []);
    const calculateTotalPrice = (newPrice) => {
        console.log(totalPrice, newPrice);
        setTotalPrice(totalPrice + newPrice);
        // setTotalPrice((prevPrice) => {
        //     return prevPrice + parseFloat(newPrice); // Adjust by deltaPrice
        // });
    };

    return (
        <Box minH={'90vh'} pos={'relative'}>
            {!loading ? (
                <>
                    <TableContainer minH={'60vh '} p={4}>
                        {data?.item?.length > 0 ? (
                            <>
                                <Table>
                                    <Thead>
                                        <Tr bg={'transparent'} border={'1px solid #cccccc'} fontSize={'16px'}>
                                            <Th fontWeight={700} border={'none'} textColor={'black'} fontSize={'14px'}>Product</Th>
                                            <Th fontWeight={700} border={'none'} textColor={'black'} fontSize={'14px'}>QTy</Th>
                                            <Th fontWeight={700} border={'none'} textColor={'black'} fontSize={'14px'}>Total</Th>
                                            <Th fontWeight={700} border={'none'} textColor={'#FF3D00'} fontSize={'14px'}>Remove</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data?.item?.map((item, index) => (
                                            <TableComponent
                                                key={index}
                                                item={item}
                                                data={data}
                                                getCart={getCart}
                                                calculateTotalPrice={calculateTotalPrice}
                                            />
                                        ))}
                                    </Tbody>
                                    <Tfoot></Tfoot>
                                </Table>
                            </>
                        ) : (
                            <Box justifyContent={'center'} alignItems={'center'} w={'100%'} display={'flex'} flexDir={'column'} p={4}>
                                <Image w={{ base: "60%", md: "20%" }} m={'auto'} src={noCardFound} alt='no data found' />
                                <Button
                                    mt={'10'}
                                    w={{ md: "20%", base: "50%" }}
                                    onClick={() => { navigate('/products') }}
                                    borderRadius={'none'}
                                    colorScheme='#E537'
                                    bg={'#2b8f65'}>
                                    Continue Shopping
                                </Button>
                            </Box>
                        )}
                    </TableContainer>
                    {data?.item?.length > 0 ?
                        <Box justifyContent={'end'}>
                            {data?.item?.length > 0 && (
                                <HStack px={2} pb={10} justify={'space-between'} justifyContent={'flex-end'} mt={4} flexDir={{ base: "column", lg: "row" }}>
                                    <HStack fontWeight={'500'} w={{ base: "100%", md: "80" }} px={2} justify={'space-between'} h={'10'} textColor={'#2b8f65'} border={'1px solid #ccccc'} bg={'#fbebd1'}>
                                        <Text>Sub Total</Text>
                                        <Text>$ {totalPrice}/-</Text>
                                    </HStack>
                                </HStack>
                            )}
                            <HStack mx={2} justify={'space-between'}>
                                <Button
                                    w={{ md: "20%", base: "50%" }}
                                    onClick={() => { navigate('/products') }}
                                    borderRadius={'none'}
                                    colorScheme='#E537'
                                    bg={'#2b8f65'}>
                                    Continue Shopping
                                </Button>
                                <Button
                                    w={{ md: "20%", base: "50%" }}
                                    borderRadius={'none'}
                                    onClick={() => { navigate('/check-out') }}
                                    colorScheme='#E537'
                                    bg={'#2b8f65'}>
                                    Check Out
                                </Button>
                            </HStack>
                            <Flex gap={3} h={{ base: "40", md: "16" }} w={{ base: "98%", md: "60%" }} m={'auto'} justifyContent={'space-between'} flexDirection={{ base: "column", md: "row" }} justify={'center'} border={'1px solid #CCCAC6'} rounded={'4px'} mb={10} mt={10}>
                                <Flex h={{ base: "20", md: "16" }} pl={2} w={{ base: "100%", md: "60%" }} border={'1px solid #cccccc'} alignItems={'center'}>
                                    <Image src={deliveryIcon} />
                                    <Box ml={4}>
                                        <Heading size="sm">Free Delivery</Heading>
                                        <Text marginTop={`1`} textDecoration={'underline'} fontSize="xs">Enter your pincode to check availability.</Text>
                                    </Box>
                                </Flex>
                                <Flex h={{ base: "20", md: "16" }} pl={2} w={{ base: "100%", md: "60%" }} border={'1px solid #cccccc'} alignItems={'center'}>
                                    <Image src={returnIcon} />
                                    <Box ml={4}>
                                        <Heading size="sm">Return Delivery</Heading>
                                        <Text marginTop={`1`} textDecoration={'underline'} fontSize="xs">Free 30days return policy.</Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Box> : ""}
                </>
            ) : (
                <Box h={'90vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='#2b8f65' size='xl' />
                </Box>
            )}
        </Box>
    );
}

export default Index;

const TableComponent = ({ item, getCart, data, calculateTotalPrice }) => {
    const [loading, setLoading] = useState(false);
    const cartApi = new CartApi();
    const [quantity, setQuantity] = useState(item.quantity);
    const handleQuantityChange = (newQuantity) => {
        const priceChange = (newQuantity - quantity) * item.totalPrice;
        setQuantity(newQuantity);
        calculateTotalPrice(priceChange);
        UpdateCartHandler(data?.cartId, item?.productId, newQuantity);
    };
    const UpdateCartHandler = useDebouncedCallback(async (cartId, productId, quantity) => {
        const cartItems = [{ cartId, productId, quantity }];
        try {
            const addToCartResponse = await cartApi.addToCart({ cart: cartItems });
            if (addToCartResponse.data.code === 200) {
                // Optionally handle any success actions here
            } else {
                toast.error(addToCartResponse.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }, 500);

    const removeCartHandler = async (cartId, productId) => {
        setLoading(true);
        try {
            const removeCartResponse = await cartApi.removeProductFromCart({ productId, cartId });
            if (removeCartResponse.data.code === 200) {
                toast.success(removeCartResponse.data.message);
                getCart();
            } else {
                toast.error(removeCartResponse.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Tr h={{ base: "14", md: "24" }} m={2} borderRadius={'3px'} bg={'white'} border={'1px solid #cccccc'}>
            <Td placeContent={'center'}>
                <HStack>
                    <Image w={{ base: "40px", md: "80px" }} h={'10'} src={item.product.coverImage} alt='img' />
                    <Box>
                        <Text fontSize={{ base: "12px", md: "16px" }} fontWeight={700}>{item.product.name}</Text>
                        <Text fontSize={{ base: "12px", md: "16px" }} fontWeight={700}>Size:</Text>
                    </Box>
                </HStack>
            </Td>
            <Td placeContent={'start'}>
                <HStack ml={{ base: "0", md: "-6" }} gap={{ base: "1", md: "4" }}>
                    <Flex align="center" bg={`transparent`} border={"1px solid #CCCAC6"} rounded={'sm'} width={{ base: "120px", md: "160px" }} justify={'space-between'} height={`40px`}>
                        <Button
                            bg={'none'}
                            rounded={'none'}
                            borderRight={'1px solid #CCCAC6'}
                            textColor={"black"}
                            _active={{ bg: "#2b8f65", textColor: "white" }}
                            fontSize={'40'}
                            isDisabled={quantity <= 1}

                            onClick={() => handleQuantityChange(quantity - 1)}
                        >
                            -
                        </Button>
                        <Text fontWeight={'bold'} mx={{ base: "0", md: "4" }}>{quantity}</Text>
                        <Button
                            bg={'none'}
                            textColor={'black'}
                            fontSize={'28'}
                            rounded={'none'}
                            borderLeft={'1px solid #CCCAC6'}
                            _active={{ bg: "#2b8f65", textColor: "white" }}
                            isDisabled={quantity >= 19}
                            onClick={() => handleQuantityChange(quantity + 1)}
                        >
                            +
                        </Button>
                    </Flex>
                </HStack>
            </Td>
            <Td pr={10} placeContent={'center'}>
                $ {item.totalPrice * quantity}/-
            </Td>
            <Td placeContent={'center'}>
                <SmallCloseIcon _disabled={loading} onClick={() => { removeCartHandler(data.cartId, item.productId) }} fontSize={24} cursor={'pointer'} textColor={'#FF3D00'} rounded={'full'} border={'1px solid gray'} />
            </Td>
        </Tr>
    );
};
