import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import {
  Box,
  Heading,
  Text,
  Image,
  Link as ChakraLink,
  Flex,
  VStack,
  Spinner,
} from "@chakra-ui/react";
const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = useSelector(
    (state: RootState) => state?.news?.articles[Number(id)]
  );

  return (
    <>
      {!article ? (
        <Flex
          direction="column"
          justify="center"
          align="center"
          h="100vh"
          w="100%"
        >
          <VStack gap={4} align="center">
            <Spinner color="blue.600" size="lg" />
            <Text color="blue.600">News not found.</Text>
          </VStack>
        </Flex>
      ) : (
        <Box
          w="3xl"
          mx="auto"
          p={5}
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
          mt={20}
        >
          <Heading as="h1" size="xl" color="gray.800" mb={3}>
            {article?.title}
          </Heading>
          <Text fontSize="sm" color="gray.500" mb={5}>
            Published on: {article?.publishedAt}
          </Text>
          <Image
            src={article?.urlToImage}
            alt={article?.title}
            w="full"
            h="64"
            objectFit="cover"
            borderRadius="lg"
          />
          <Text fontSize="lg" color="gray.700" mt={5}>
            {article?.description}
          </Text>
          <ChakraLink
            href={article?.url}
            color="blue.600"
            fontWeight="semibold"
            mt={5}
            display="inline-block"
            textDecoration="underline"
          >
            Read full article
          </ChakraLink>
          <Link to="/">
            <Text
              mt={5}
              color="gray.600"
              fontWeight="medium"
              _hover={{ textDecoration: "underline" }}
            >
              ← Back to Home
            </Text>
          </Link>
        </Box>
      )}
    </>
  );
};

export default NewsDetail;
