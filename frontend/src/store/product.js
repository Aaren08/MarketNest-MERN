import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required!" };
    }

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Failed to create product",
      };
    }

    if (response.ok) {
      const createdProduct = await response.json();
      set((state) => ({
        products: [...state.products, createdProduct.product],
      }));
      return { success: true, message: "Product created successfully!" };
    }
  },

  fetchProducts: async () => {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    set({ products: data });
  },

  deleteProduct: async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    }));
    return { success: true, message: "Product deleted successfully!" };
  },

  editProduct: async (productId, updatedProduct) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    const data = await response.json();
    set((state) => ({
      products: state.products.map((product) =>
        product._id === productId ? data.product : product
      ),
    }));
    return { success: true, message: "Product updated successfully!" };
  },
}));

// The above code defines a Zustand store for managing products in a React application.
