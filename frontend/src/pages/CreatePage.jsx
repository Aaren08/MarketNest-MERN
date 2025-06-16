import {
  Button,
  Input,
  VStack,
  Container,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { Toaster, toaster } from "../components/ui/toaster";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Access the createProduct function from the product store
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", image: "" }); // Reset the form
    }
  };

  return (
    <Container maxW={"2xl"}>
      <VStack spacing={"8"}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={"8"} mt={"10"}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={"6"}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={"4"}>
            <Input
              required={true}
              placeholder="Enter a product name"
              borderColor={"gray.600"}
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              required={true}
              placeholder="Enter a product price"
              borderColor={"gray.600"}
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Input
              required={true}
              placeholder="Enter a product image URL"
              borderColor={"gray.600"}
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button
              background={"#ED9BED"}
              _hover={{ background: "#FB70FB" }}
              onClick={handleAddProduct}
              w={"full"}
            >
              Add Product
            </Button>
            <Toaster />
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
