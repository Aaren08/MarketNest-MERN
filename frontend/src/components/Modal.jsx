import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

const Modal = ({
  isOpen,
  onClose,
  updateProduct,
  setUpdateProduct,
  handleEditProduct,
  product,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="blackAlpha.600"
      zIndex="9999"
      display={isOpen ? "flex" : "none"}
      alignItems="center"
      justifyContent="center"
      p="4"
    >
      <Box
        bg={bgColor}
        borderRadius="md"
        boxShadow="xl"
        w="full"
        maxW="lg"
        position="relative"
        p="6"
      >
        {/* Header */}
        <Box fontSize="xl" fontWeight="bold" mb="4">
          Update Product
        </Box>

        {/* Close Button */}
        <Button
          size="sm"
          position="absolute"
          top="3"
          right="3"
          onClick={onClose}
        >
          ✕
        </Button>

        {/* Body */}
        <VStack spacing={4} mb={6}>
          <Input
            placeholder="Product Name"
            borderColor={"gray.600"}
            name="name"
            value={updateProduct.name}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, name: e.target.value })
            }
          />
          <Input
            placeholder="Product Price"
            borderColor={"gray.600"}
            name="price"
            type="number"
            value={updateProduct.price}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, price: e.target.value })
            }
          />
          <Input
            placeholder="Product Image URL"
            borderColor={"gray.600"}
            name="image"
            value={updateProduct.image}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, image: e.target.value })
            }
          />
        </VStack>

        {/* Footer */}
        <Box display="flex" justifyContent="flex-end" gap="3">
          <Button
            colorScheme="blue"
            onClick={() => handleEditProduct(product._id, updateProduct)}
          >
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Modal;
