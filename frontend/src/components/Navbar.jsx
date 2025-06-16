import { Link } from "react-router-dom";
import { Flex, HStack, Text, Container, Button } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { BsPlusSquare } from "react-icons/bs";
import { LuMoon, LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={"4"}>
      <Flex
        h={"16"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          as={Link}
          to={"/"}
          bgGradient={"linear-gradient(to right, #3FE2FF, #4299E1)"}
          bgClip={"text"}
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          Product Store 🛒
        </Text>

        <HStack spacing={"2"} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <BsPlusSquare fontSize={"20"} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <LuMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
