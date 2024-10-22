import React, { useState } from "react";
import {
  Box,
  Text,
  FormControl,
  Flex,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { MainSubHeading } from "../../components/shared/custom design/Index";
import Auth from "../../apis/auth/auth.api";
import HorseApi from "../../apis/horse.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FilePicker from "../../components/filePicker";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Index() {
  //   const dispatch = useDispatch();
  const authApi = new Auth();
  const horseApi = new HorseApi();
  const [horseAge, setHorseAge] = useState("");
  const [horseBreed, setHorseBreed] = useState("");
  const [horseName, setHorseName] = useState("");
  const [BoardFacName, setSetBoardFacName] = useState("");
  const [BoardFacAddress, setSetBoardFacAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [horseImages, setHorseImages] = useState([]);
  const [horseDocs, setHorseDocs] = useState([]);
  const [horseApiImages, setHorseApiImages] = useState([]);
  const [docsApiImages, setDocsApiImages] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isBarn = searchParams.get("isBarn");
  const barnId = searchParams.get("id");
  console.log(barnId, isBarn);

  const { id } = useParams();
  const Navigate = useNavigate();

  const [horseAgeError, setHorseAgeError] = useState(""); //
  const [horseBreedError, setHorseBreedError] = useState(""); //
  const [horseNameError, setHorseNameError] = useState(""); //

  const handleHorseImagesChange = (images) => {
    console.log(images);
    setHorseImages(images);
  };

  const handleHorseDocsChange = (docs) => {
    setHorseDocs(docs);
  };

  console.log(horseImages);

  //   for (const key in formData) {
  //     if (formData.hasOwnProperty(key)) {
  //       data.append(key, formData[key]);
  //     }
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("horseName", horseName);
    formData.append("horseBreed", horseBreed);
    formData.append("horseAge", horseAge);
    // formData.append("boardingFacilityName", BoardFacName);
    // formData.append("boardingFacilityAddress", BoardFacAddress);
    //   Append images
    horseImages.forEach((file, index) => {
      formData.append("images", file);
    });
    // Append documents
    horseDocs.forEach((file) => {
      formData.append("docs", file);
    });

    try {
      const RegisterResponse = await authApi.HorseProfile(formData);
      if (RegisterResponse.data.code === 200) {
        toast.success(RegisterResponse.data.message);
        if (isBarn) {
          Navigate(`/check-out?isBarn=${true}&barnId=${barnId}`);
        } else {
          Navigate("/horses");
        }
      } else {
        toast.error(RegisterResponse.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    //   setLoading(true);
    const formData = new FormData();
    formData.append("horseId", id);
    formData.append("horseName", horseName);
    formData.append("horseBreed", horseBreed);
    formData.append("horseAge", horseAge);
    // formData.append("boardingFacilityName", BoardFacName);
    // formData.append("boardingFacilityAddress", BoardFacAddress);

    if (horseImages.length > 0) {
      horseImages.forEach((file, index) => {
        formData.append("images", file);
      });
    } else {
      formData.append("images", "");
    }
    if (horseDocs.length > 0) {
      // Append documents
      horseDocs.forEach((file) => {
        formData.append("docs", file);
      });
    } else {
      formData.append("docs", "");
    }

    try {
      const RegisterResponse = await authApi.updatehorseProfile(formData);
      if (RegisterResponse.data.code === 200) {
        toast.success(RegisterResponse.data.message);
        Navigate("/horses");
      } else {
        toast.error(RegisterResponse.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const GetHorseById = async (e) => {
    console.log("test");
    try {
      const RegisterResponse = await horseApi.getHorseById({ horseId: id });
      if (RegisterResponse.data.code === 200) {
        let e = RegisterResponse?.data?.data;
        console.log("e,", e);
        setHorseAge(e?.horseAge);
        setHorseBreed(e?.horseBreed);
        setHorseName(e?.horseName);
        setHorseApiImages(e?.images);
        setDocsApiImages(e?.horseDocument);
      } else {
        toast.error(RegisterResponse.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    if (id) {
      GetHorseById();
    }
  }, [id]);

  //   const handleSubmit= async (e) => {
  //     e.preventDefault();
  // console.log("Horse Register");
  //   }

  return (
    <Box
      px={2}
      pt={10}
      h={"fit-content"}
      pb={10}
      w={{ base: "100%", md: "800px" }}
      m={"auto"}
    >
      <MainSubHeading textAlign="start">Create Horse Profile</MainSubHeading>
      <MainSubHeading textColor="#313131" fontSize="14px" textAlign="start">
        Let's get you all set up so you can Rent and Sell Horse.
      </MainSubHeading>
      <form onSubmit={id ? handleUpdate : handleSubmit}>
        <Flex mt={4} flexDir={"column"} gap={4}>
          <Flex gap={"4"} flexDir={{ base: "column", md: "row" }}>
            <FormControl>
              <FormLabel>Horse name</FormLabel>
              <Input
                required
                value={horseName}
                onChange={(e) => setHorseName(e.target.value)}
                type="text"
                placeholder="Business Name"
                border="1px solid #79747E"
                focusBorderColor="none"
                bg="white"
                color="black"
                outline="none"
                onBlur={() =>
                  setHorseNameError(horseName ? "" : "horse name is required")
                }
              />
              <Text mt={1} fontSize="sm" color="red.500">
                {horseNameError}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>Horse Breed</FormLabel>
              <Input
                required
                value={horseBreed}
                onChange={(e) => setHorseBreed(e.target.value)}
                type="text"
                placeholder="Business Name"
                border="1px solid #79747E"
                focusBorderColor="none"
                bg="white"
                color="black"
                outline="none"
                onBlur={() =>
                  setHorseBreedError(
                    horseBreed ? "" : "horse breed is required"
                  )
                }
              />
              <Text mt={1} fontSize="sm" color="red.500">
                {horseBreedError}
              </Text>
            </FormControl>
          </Flex>

          <Flex gap={"4"} flexDir={{ base: "column", md: "row" }}>
            <FormControl>
              <FormLabel>Horse Age</FormLabel>
              <Input
                required
                value={horseAge}
                onChange={(e) => {
                  const temp = e.target.value;
                  if (/^\d*$/.test(temp)) {
                    if (temp <= 40) {
                      setHorseAge(temp);
                    } else {
                      setHorseAgeError("please enter a valid age");
                    }
                  }
                }}
                type="text"
                placeholder="Business Name"
                border="1px solid #79747E"
                focusBorderColor="none"
                bg="white"
                color="black"
                outline="none"
                onBlur={() =>
                  setHorseAgeError(horseAge ? "" : "horse age is required")
                }
              />
              <Text mt={1} fontSize="sm" color="red.500">
                {horseAgeError}
              </Text>
            </FormControl>
            {/* <FormControl>
              <FormLabel>Boarding Facility Name</FormLabel>
              <Input
                required
                value={BoardFacName}
                onChange={(e) => setSetBoardFacName(e.target.value)}
                type="text"
                placeholder="Business Name"
                border="1px solid #79747E"
                focusBorderColor="none"
                bg="white"
                color="black"
                outline="none"
              />
            </FormControl> */}
          </Flex>

          {/* <Flex gap={"4"} flexDir={{ base: "column", md: "row" }}>
            <FormControl>
              <FormLabel>Boarding Facility Address.</FormLabel>
              <Input
                required
                value={BoardFacAddress}
                onChange={(e) => setSetBoardFacAddress(e.target.value)}
                type="text"
                placeholder="Business Name"
                border="1px solid #79747E"
                focusBorderColor="none"
                bg="white"
                color="black"
                outline="none"
              />
            </FormControl>
          </Flex> */}
          <Box>
            <FilePicker
              label="Horse Images"
              files={horseImages}
              apiImages={horseApiImages}
              onFilesChange={handleHorseImagesChange}
            />
          </Box>
          <Box>
            <FilePicker
              label="Horse Documents"
              files={horseDocs}
              apiImages={docsApiImages}
              onFilesChange={handleHorseDocsChange}
            />
          </Box>
          <Button
            isLoading={loading}
            w="100%"
            colorScheme=""
            className="Bg"
            variant="solid"
            rounded="sm"
            type="submit"
          >
            Submit Form
          </Button>
        </Flex>
      </form>
      {/* <OtherLogin
          Google={"Sign Up with Google"}
          Facebook={"Sign Up with Facebook"}
        /> */}
    </Box>
  );
}

export default Index;
