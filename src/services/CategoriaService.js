const BASE_URL = "http://localhost:7000/categorias";

const Categorias = {
  getCategorias: async () => {
    try {
      const response = await fetch(BASE_URL);
      return response.json();
    } catch (error) {
      console.log("Error al obtener las categorias:", error);
      throw error;
    }
  },

  getCategoriaById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      return response.json();
    } catch (error) {
      console.error(`Error al obtener producto con ID ${id}:`, error);
      throw error;
    }
  },

  addCategoria: async (CategoriaData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CategoriaData),
      });
      return response.json();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  },

  updateCategoria: async (id, UserData) => {
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

  deleteCategoria: async (id) => {
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

export default Categorias;