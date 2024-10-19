import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Divider,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
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
  Input,
} from "@chakra-ui/react";
import filter from "../../assets/icons/filter.svg";

import { debounce } from "lodash"; // Import debounce function from lodash library
import { ChevronDownIcon } from "@chakra-ui/icons";
import ProductApi from "../../apis/product.api";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CustomCheckbox } from "../../components/shared/custom design/Index";

function SidebarValues({
  setSliderValues,
  sliderValues,
  loading,
  category,
  cat = false,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
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
      <Flex
        position={"relative"}
        overflow={"scroll"}
        display={{ base: "none", lg: "flex" }}
        alignSelf={"start"}
        pos={"sticky"}
        top={20}
        w={{ base: "100%", lg: "25%" }}
        h={{ base: "fit-content", xl: "640px" }}
        bg={"white"}
        border={"1px solid rgba(0, 0, 0, 0.2)"}
        rounded={"md"}
        p={{ base: "2", lg: "4" }}
        boxShadow={"md"}
        mt={4}
        flexDir={"column"}
        gap={2}
        className="hide-scrollbar"
      >
        <MainComponent
          cat={cat}
          loading={loading}
          category={category}
          handleMaxPriceChange={handleMaxPriceChange}
          handleMinPriceChange={handleMinPriceChange}
          sliderValues={sliderValues}
          handleSliderChange={handleSliderChange}
        />
      </Flex>
      <Flex
        display={{ base: "flex", lg: "none" }}
        mt={{ base: 2 }}
        w={"100%"}
        justify={"end"}
        alignSelf={"end"}
        justifySelf={"end"}
      >
        <Input placeholder="search" w={"80"} />
        <Image ref={btnRef} onClick={onOpen} cursor={"pointer"} src={filter} />
      </Flex>
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
            <MainComponent
              loading={loading}
              category={category}
              handleMaxPriceChange={handleMaxPriceChange}
              handleMinPriceChange={handleMinPriceChange}
              sliderValues={sliderValues}
              handleSliderChange={handleSliderChange}
            />
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SidebarValues;

const MainComponent = ({
  loading,
  category,
  handleMaxPriceChange,
  handleMinPriceChange,
  sliderValues,
  handleSliderChange,
  cat,
}) => {
  const [isCheckedWaterActivities, setIsCheckedWaterActivities] =
    useState(false);
  const [isCheckedSocialDistancing, setIsCheckedSocialDistancing] =
    useState(false);
  const [isCheckedAdrenaline, setIsCheckedAdrenaline] = useState(false);
  const [isCheckedNature, setIsCheckedNature] = useState(false);
  const [isCheckedHiddenGems, setIsCheckedHiddenGems] = useState(false);
  const [isCheckedStreetArt, setIsCheckedStreetArt] = useState(false);
  const [isCheckedFood, setIsCheckedFood] = useState(false);
  return (
    <Box>
      <Text textColor={"#0E1422"} fontWeight={"700"} fontSize={"20px"}>
        Filter by{" "}
      </Text>
      {loading ? (
        <>
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="1" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="4" />
        </>
      ) : (
        <>
          <Box>
            <Text
              mt={8}
              textColor={"#0E1422"}
              fontWeight={"500"}
              fontSize={"20px"}
            >
              Price
            </Text>
            <RangeSlider
              aria-label={["min", "max"]}
              onChange={handleSliderChange}
              min={0}
              max={10000}
              step={100}
              value={sliderValues} // Use sliderValues to control the slider
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack bg={"#2b8f65"} />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <HStack justify={"space-between"} w={"100%"}>
              <Flex w={"45%"} flexDir={"column"}>
                <label>From</label>
                <Input
                  onChange={handleMinPriceChange}
                  value={sliderValues[0]}
                  border={"1px solid #cccccc"}
                  h={"10"}
                />
              </Flex>
              <Flex w={"45%"} flexDir={"column"}>
                <label>To</label>
                <Input
                  onChange={handleMaxPriceChange}
                  value={sliderValues[1]}
                  border={"1px solid #cccccc"}
                  h={"10"}
                />
              </Flex>
            </HStack>
          </Box>
          <Flex
            flexDir={"column"}
            gap={2}
            mt={4}
            p={1}
            rounded={"lg"}
            w={"100%"}
            border={"1px solid #cccccc"}
          >
            <Text
              mt={4}
              textColor={"#0E1422"}
              fontWeight={"700"}
              fontSize={"20px"}
            >
              Amenities
            </Text>

            <CustomCheckbox
              isChecked={isCheckedWaterActivities}
              setIsChecked={setIsCheckedWaterActivities}
            >
              Water activities
            </CustomCheckbox>
            <CustomCheckbox
              isChecked={isCheckedSocialDistancing}
              setIsChecked={setIsCheckedSocialDistancing}
            >
              Good for social distancing
            </CustomCheckbox>
            <CustomCheckbox
              isChecked={isCheckedAdrenaline}
              setIsChecked={setIsCheckedAdrenaline}
            >
              Adrenaline
            </CustomCheckbox>
            <CustomCheckbox
              isChecked={isCheckedNature}
              setIsChecked={setIsCheckedNature}
            >
              Nature
            </CustomCheckbox>
            <CustomCheckbox
              isChecked={isCheckedHiddenGems}
              setIsChecked={setIsCheckedHiddenGems}
            >
              Hidden gems
            </CustomCheckbox>
            <CustomCheckbox
              isChecked={isCheckedStreetArt}
              setIsChecked={setIsCheckedStreetArt}
            >
              Street art & graffiti
            </CustomCheckbox>
            <CustomCheckbox
              isChecked={isCheckedFood}
              setIsChecked={setIsCheckedFood}
            >
              Food
            </CustomCheckbox>
          </Flex>
        </>
      )}
    </Box>
  );
};
