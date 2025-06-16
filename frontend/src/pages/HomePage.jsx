import { Container, VStack, Text, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxW={"6xl"} py={"8"}>
      <VStack spacing={"8"}>
        <Text
          bgGradient={"linear-gradient(to right, #3FE2FF, #4299E1)"}
          bgClip={"text"}
          fontSize={"30px"}
          fontWeight={"bold"}
          textAlign={"center"}
          mb={"5"}
        >
          Current Products 🚀
        </Text>

        {isLoading ? (
          <Spinner
            borderWidth={"3px"}
            size={"lg"}
            color={"blue.500"}
            css={{ "--spinner-track-color": "colors.gray.200" }}
          />
        ) : (
          <>
            <ProductList onEmpty={setIsEmpty} />

            {isEmpty && (
              <Text
                fontSize={"xl"}
                textAlign={"center"}
                color={"gray.500"}
                fontWeight={"bold"}
              >
                Want to add more?{" "}
                <Link to="/create">
                  <Text
                    as={"span"}
                    _hover={{ textDecoration: "underline" }}
                    color={"blue.500"}
                  >
                    Create one now!
                  </Text>
                </Link>
              </Text>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
