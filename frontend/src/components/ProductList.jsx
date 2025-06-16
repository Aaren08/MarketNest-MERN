import { useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import Modal from "./Modal";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "../components/ui/toaster";

const ProductList = ({ onEmpty }) => {
  const { fetchProducts, products, editProduct } = useProductStore();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Notify parent when empty
  useEffect(() => {
    if (onEmpty) {
      onEmpty(products.length === 0);
    }
  }, [products, onEmpty]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setUpdateProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  const handleEditProduct = async (productId, editedProduct) => {
    const { success, message } = await editProduct(productId, editedProduct);
    closeModal();

    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        variant: "edit",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        variant: "edit",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        spacing={"10"}
        w={"full"}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEditClick={openModal}
          />
        ))}
      </SimpleGrid>

      {/* Global Modal rendered ONCE */}
      {selectedProduct && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          product={selectedProduct}
          updateProduct={updateProduct}
          setUpdateProduct={setUpdateProduct}
          handleEditProduct={handleEditProduct}
        />
      )}
      <Toaster />
    </Box>
  );
};

export default ProductList;
