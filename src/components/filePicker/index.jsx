import { useState, useEffect } from "react";
import {
  Box,
  Image,
  Stack,
  IconButton,
  Input,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const FilePicker = ({ apiImages, files, onFilesChange, label }) => {
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url)); // Clean up URLs when component unmounts or files change
    };
  }, [files]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    onFilesChange((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileToRemove) => {
    const index = previewUrls.findIndex((url) => url === fileToRemove);
    const updatedUrls = previewUrls.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);
    setPreviewUrls(updatedUrls);
    onFilesChange(updatedFiles);
    URL.revokeObjectURL(fileToRemove); // Free up memory
  };

  return (
    <>
      <Text fontSize={"md"} py={2} fontWeight={600}>
        {label}
      </Text>
      <Stack
        spacing={1}
        align="center"
        w={"full"}
        h={"full"}
        bgColor={"gray.100"}
        borderRadius={5}
        border={"1px dashed black"}
        htmlFor="file-input"
      >
        <Input
          w={"full"}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          id={`file-input-${label}`}
        />
        <label
          htmlFor={`file-input-${label}`}
          style={{ width: "inherit", textAlign: "center" }}
        >
          <Box
            w={"full"}
            h={"full"}
            cursor={"pointer"}
            alignItems={"center"}
            py={3}
          >
            <Avatar pt={2} />
            <Text pt={2} w={"full"} h={"full"}>
              Click here to select files.
            </Text>
          </Box>
        </label>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {previewUrls.length > 0 ? (
            <>
              {previewUrls.map((url, index) => (
                <Box key={index} position="relative" m={2}>
                  <Image
                    src={url}
                    alt={`Selected Image ${index}`}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <IconButton
                    icon={<CloseIcon />}
                    size="xs"
                    position="absolute"
                    top="2px"
                    right="2px"
                    onClick={() => handleRemoveFile(url)}
                    aria-label="Remove Image"
                  />
                </Box>
              ))}
            </>
          ) : (
            <>
              {apiImages &&
                apiImages?.map((url, index) => (
                  <>
                    {" "}
                    <Box key={index} position="relative" m={2}>
                      <Image
                        src={url}
                        alt={`Selected Image ${index}`}
                        boxSize="100px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    </Box>
                  </>
                ))}
            </>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default FilePicker;