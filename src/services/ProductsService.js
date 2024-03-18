const BASE_URL = "http://localhost:7000/productos";

const Products = {
  getProducts: async () => {
    try {
      const response = await fetch(BASE_URL);
      return response.json();
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      return response.json();
    } catch (error) {
      console.error(`Error al obtener producto con ID ${id}:`, error);
      throw error;
    }
  },

  addProduct: async (ProductData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ProductData),
      });
      return response.json();
    } catch (error) {
      console.error("Error al agregar producto:", error);
      throw error;
    }
  },

  updateProduct: async (id, UserData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserData),
      });

      return response.json();
    } catch (error) {
      console.error(`Error al actualizar producto con ID ${id}:`, error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      return response.json();
    } catch (error) {
      console.error(`Error al eliminar producto con ID ${id}:`, error);
      throw error;
    }
  },
};

export default Products;
