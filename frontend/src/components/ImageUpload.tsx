import React, { useCallback } from "react";
import { Box, Button, VStack, Text, useToast, Spinner } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useAnalysisStore } from "../store/analysisStore";
import { analyzeImage, validateImage } from "../services/uploadService";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const {
    isUploading,
    setUploading,
    setError,
    setAnalyzing,
    setResult,
    setUploadedImage,
  } = useAnalysisStore();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file
      const validationError = validateImage(file);
      if (validationError) {
        setError(t(`errors.${validationError}`));
        return;
      }

      try {
        setUploading(true);
        setError(null);

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setUploadedImage(previewUrl);

        // Analyze image
        setAnalyzing(true);
        const result = await analyzeImage(file);
        setResult(result);

        onImageSelect(file);

        toast({
          title: t("analysis.results"),
          description:
            t("analysis.facesDetected") + ": " + result.facesDetected,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : t("errors.analysisFailed");
        setError(errorMessage);

        toast({
          title: t("errors.analysisFailed"),
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setUploading(false);
        setAnalyzing(false);
      }
    },
    [
      t,
      setUploading,
      setError,
      setAnalyzing,
      setResult,
      setUploadedImage,
      onImageSelect,
      toast,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
    disabled: isUploading,
  });

  return (
    <VStack spacing={4} w="full" maxW="md" mx="auto">
      <Box
        {...getRootProps()}
        p={8}
        border="2px dashed"
        borderColor={isDragActive ? "brand.500" : "gray.300"}
        borderRadius="lg"
        bg={isDragActive ? "brand.50" : "gray.50"}
        cursor={isUploading ? "not-allowed" : "pointer"}
        transition="all 0.2s"
        _hover={
          !isUploading ? { borderColor: "brand.500", bg: "brand.50" } : {}
        }
        w="full"
        textAlign="center"
      >
        <input {...getInputProps()} />
        <VStack spacing={3}>
          {isUploading ? (
            <Spinner size="lg" color="brand.500" />
          ) : (
            <Text fontSize="4xl">📸</Text>
          )}
          <Text fontSize="lg" fontWeight="semibold">
            {isUploading ? t("analysis.analyzing") : t("upload.dragText")}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {t("upload.supportedFormats")}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {t("upload.maxSize")}
          </Text>
          {!isUploading && (
            <Button colorScheme="brand" size="lg" mt={4}>
              {t("upload.button")}
            </Button>
          )}
        </VStack>
      </Box>
    </VStack>
  );
};

export default ImageUpload;
