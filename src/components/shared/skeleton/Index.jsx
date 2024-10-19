import { Skeleton, Flex, SkeletonCircle, SkeletonText, VStack, Stack, HStack } from '@chakra-ui/react'
export const ProductSmallCartSkeleton = ({ }) => {
    return (
        <VStack minW={{ base: "200px", md: "245px" }} w={'100%'} p={1} h={'260px'} border={'1px solid #cccccc'} gap={0} borderRadius={'10px'} >
            <Skeleton
                w={'100%'}
                height='150px'
                p={3}
                color='red'
                fadeDuration={1}
            ></Skeleton>
            <SkeletonText
                w={'100%'} mt='4' noOfLines={5} fadeDuration={1}
                spacing='2' skeletonHeight='2' />
        </VStack>

    )
}
export const LoadingCard = ({}) => {
    return (
        <Stack
            maxW={'400px'}
            flex={1}
            p={2}

            minH={{ base: "fit-content", md: '400px' }}
            borderTop={'1px solid #f7efef'}
            bg={'white'}
            rounded={'14px'}
            // overflow={'hidden'}
            boxShadow={'md'}
        >
            {/* Image Preview */}

            {/* Skeleton Text */}
            <Skeleton rounded={'xl'} fadeDuration={1} height={40}>
            </Skeleton>
            {/* <SkeletonCircle  fadeDuration={1} alignSelf={'center'} justifyContent={'center'} display={'flex'} textAlign={'center'} color={'red'} size='14' /> */}
            {/* <Skeleton  fadeDuration={1} height={10}>
            </Skeleton> */}

            {/* Additional Skeleton Text */}
            <SkeletonText
                //  fadeDuration={1}
                // startColor='#2b8f65'
                opacity={'0.6'}
                // endColor='orange.500'
                mt='4'
                noOfLines={4}
                spacing='2'
                skeletonHeight='2'
            />
            <Skeleton h={'4'} />
            <SkeletonText
                w={'100%'} mt='4' noOfLines={2} fadeDuration={1}
                spacing='2' skeletonHeight='2' />
            <Stack mt={4} justify={'space-between'} direction={'row'}>
                <Skeleton rounded={'md'} w={'20%'} h={'10'} />
                <Skeleton rounded={'md'} w={'60%'} h={'10'} />

            </Stack>
        </Stack>
    )
}
export const LoadingCardLine = () => {
    return (

        <HStack p={4} border={'1px solid #C4C4C4'} rounded={'md'} direction={'row'}>
            <Skeleton rounded={'md'} w={'10%'} h={'20'} />
            <HStack flexDir={'column'} w={'90%'}>
                <SkeletonText
                    w={'100%'} noOfLines={3}
                    spacing='2' skeletonHeight='2' />
                <Skeleton rounded={'md'} w={'100%'} h={'8'} />
            </HStack>
        </HStack>
    )
}
