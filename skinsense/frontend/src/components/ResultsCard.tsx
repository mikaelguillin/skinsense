import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Divider,
  useColorModeValue,
  Image,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useAnalysisStore } from "../store/analysisStore";

const ResultsCard: React.FC = () => {
  const { t } = useTranslation();
  const { result, error, uploadedImage, reset } = useAnalysisStore();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (error) {
    return (
      <Box
        bg={bgColor}
        p={6}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
        shadow="md"
        w="full"
        maxW="md"
        mx="auto"
      >
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>{t("errors.analysisFailed")}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
        <Button colorScheme="brand" mt={4} onClick={reset} w="full">
          {t("buttons.tryAgain")}
        </Button>
      </Box>
    );
  }

  if (!result) return null;

  const getInterpretation = (
    facesDetected: number,
    skinTone: { r: number; g: number; b: number }
  ) => {
    if (facesDetected === 0) return t("errors.noFaceDetected");

    // Simple interpretation based on skin tone brightness
    const brightness = (skinTone?.r + skinTone?.g + skinTone?.b) / 3;
    if (brightness > 200) return t("analysis.interpretation.good");
    if (brightness > 150) return t("analysis.interpretation.fair");
    return t("analysis.interpretation.needsCare");
  };

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      shadow="md"
      w="full"
      maxW="md"
      mx="auto"
    >
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          {t("analysis.results")}
        </Text>

        {uploadedImage && (
          <Box textAlign="center">
            <Image
              src={uploadedImage}
              alt="Uploaded image"
              maxH="200px"
              borderRadius="md"
              mx="auto"
            />
          </Box>
        )}

        <HStack justify="space-between">
          <Text fontWeight="semibold">{t("analysis.facesDetected")}:</Text>
          <Badge colorScheme="brand" fontSize="md" px={3} py={1}>
            {result.facesDetected}
          </Badge>
        </HStack>

        <Divider />

        <VStack spacing={3} align="stretch">
          <Text fontWeight="semibold">{t("analysis.skinTone")}:</Text>
          <HStack justify="space-between">
            <Box
              w="40px"
              h="40px"
              borderRadius="full"
              bg={`rgb(${result.skinTone?.r}, ${result.skinTone?.g}, ${result.skinTone?.b})`}
              border="2px"
              borderColor="gray.300"
            />
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color="gray.600">
                RGB: {result.skinTone?.r}, {result.skinTone?.g},{" "}
                {result.skinTone?.b}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {t("analysis.hexValue")}: {result.skinTone?.hex}
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <Divider />

        <Box>
          <Text fontWeight="semibold" mb={2}>
            {t("analysis.interpretation.title")}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {getInterpretation(result.facesDetected, result.skinTone)}
          </Text>
        </Box>

        <Button colorScheme="brand" variant="outline" onClick={reset} w="full">
          {t("buttons.uploadAnother")}
        </Button>
      </VStack>
    </Box>
  );
};

export default ResultsCard;
