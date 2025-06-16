import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "../components/ui/toaster";

const ProductCard = ({ product, onEditClick = () => {} }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        variant: "delete",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        variant: "delete",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bgColor}
      mb={"5"}
      ml={"5"}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={"48"}
        w={"full"}
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={"2"}>
          {product.name}
        </Heading>

        <Text fontSize={"xl"} fontWeight={"bold"} color={textColor} mb={"4"}>
          ${product.price}
        </Text>

        <HStack spacing="2">
          <Box
            as={"button"}
            cursor={"pointer"}
            onClick={() => onEditClick(product)}
            bg={"blue.500"}
            color={"white"}
            p={"2"}
            borderRadius={"md"}
            _hover={{ bg: "blue.600" }}
          >
            <FaEdit />
          </Box>

          <Box
            as={"button"}
            cursor={"pointer"}
            onClick={() => handleDeleteProduct(product._id)}
            bg={"red.500"}
            color={"white"}
            p={"2"}
            borderRadius={"md"}
            _hover={{ bg: "red.600" }}
          >
            <FaTrash />
          </Box>
        </HStack>
      </Box>

      <Toaster />
    </Box>
  );
};

export default ProductCard;
