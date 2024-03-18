const BASE_URL = "http://localhost:7000/proveedores";

const ProveedoresService = {
  getProveedores: async () => {
    try {
      const response = await fetch(BASE_URL);
      return response.json();
    } catch (error) {
      console.log("Error al obtener los proveedores:", error);
      throw error;
    }
  },

  getProveedorById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      return response.json();
    } catch (error) {
      console.error(`Error al obtener proveedor con ID ${id}:`, error);
      throw error;
    }
  },

  addProveedor: async (proveedorData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proveedorData),
      });
      return response.json();
    } catch (error) {
      console.error('Error al agregar proveedor:', error);
      throw error;
    }
  },

  updateProveedor: async (id, proveedorData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proveedorData),
      });

      return response.json();
    } catch (error) {
      console.error(`Error al actualizar proveedor con ID ${id}:`, error);
      throw error;
    }
  },

  deleteProveedor: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      return response.json();
    } catch (error) {
      console.error(`Error al eliminar proveedor con ID ${id}:`, error);
      throw error;
    }
  },
};

export default ProveedoresService;
