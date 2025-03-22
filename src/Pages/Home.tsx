import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchNews } from "../store/newsSlice";
import {
  Box,
  Card,
  Grid,
  GridItem,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { AppDispatch, RootState } from "../store/store.ts";

const Home = () => {
  const { category } = useParams<{ category: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { articles, status } = useSelector((state: RootState) => state.news);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (category) {
      dispatch(fetchNews(category));
    }
  }, [dispatch, category]);

  const filteredArticles = articles?.filter((article) =>
    article?.title?.toLowerCase()?.includes(search.toLowerCase())
  );
  return (
    <Box m={2} mt={20}>
      <Box mb={5} w="50%" mx="auto">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search news..."
          variant="outline"
          size="lg"
          _focus={{ borderColor: "blue.500" }}
          borderColor="gray.300"
          borderRadius="md"
          pl={2}
        />
      </Box>

      {status === "loading" ||
      status === "failed" ||
      filteredArticles?.length == 0 ? (
        <Flex
          direction="column"
          justify="center"
          align="center"
          w="100%"
          h="400px"
        >
          <VStack gap={4} align="center">
            <Spinner color="blue.600" size="lg" />
            <Text color="blue.600">
              {status === "loading"
                ? "Loading news..."
                : status === "failed"
                ? "Failed to load news..."
                : "There is no data related to this.."}
            </Text>
          </VStack>
        </Flex>
      ) : (
        <Grid gap="4" templateColumns="repeat(4, 1fr)">
          {filteredArticles &&
            filteredArticles?.map((article, index) => (
              <GridItem key={index}>
                <Card.Root width="320px" h={"420px"}>
                  <Card.Body gap="2">
                    <Image
                      src={article?.urlToImage}
                      alt={article?.title}
                      w={"300px"}
                      h={"200px"}
                    />
                    <Card.Title>
                      {article?.title?.length > 50
                        ? article?.title?.slice(0, 50) + "..."
                        : article?.title}
                    </Card.Title>
                    <Card.Description>
                      {article?.description?.length > 100
                        ? article?.description?.slice(0, 100) + "..."
                        : article?.description}
                    </Card.Description>
                  </Card.Body>
                  <Card.Footer justifyContent="flex-end">
                    <Link
                      to={`/news/${index}`}
                      className="inline-block mt-3 text-blue-600 font-medium"
                    >
                      Read More →
                    </Link>
                  </Card.Footer>
                </Card.Root>
              </GridItem>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
