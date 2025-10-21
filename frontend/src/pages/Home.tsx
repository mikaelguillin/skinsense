import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useAnalysisStore } from "../store/analysisStore";
import ImageUpload from "../components/ImageUpload";
import ResultsCard from "../components/ResultsCard";
import LanguageToggle from "../components/LanguageToggle";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { result, error } = useAnalysisStore();

  const bgGradient = useColorModeValue(
    "linear(to-br, brand.50, brand.100)",
    "linear(to-br, gray.900, gray.800)"
  );

  const handleImageSelect = (file: File) => {
    // Image is already processed in ImageUpload component
    console.log("Image selected:", file.name);
  };

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      <Container maxW="container.md" py={8}>
        <VStack spacing={8}>
          {/* Header */}
          <Box textAlign="center" w="full">
            <HStack justify="flex-end" mb={4}>
              <LanguageToggle />
            </HStack>
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, brand.600, brand.400)"
              bgClip="text"
              mb={2}
            >
              {t("app.title")}
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="md" mx="auto">
              {t("app.subtitle")}
            </Text>
          </Box>

          {/* Upload Section */}
          {!result && !error && (
            <Box w="full">
              <VStack spacing={6}>
                <Box textAlign="center">
                  <Heading as="h2" size="lg" mb={2}>
                    {t("upload.title")}
                  </Heading>
                  <Text color="gray.600">{t("upload.subtitle")}</Text>
                </Box>
                <ImageUpload onImageSelect={handleImageSelect} />
              </VStack>
            </Box>
          )}

          {/* Results Section */}
          {(result || error) && (
            <Box w="full">
              <ResultsCard />
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
