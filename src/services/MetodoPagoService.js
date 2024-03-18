const BASE_URL = "http://localhost:7000/metodopago";

const MetodoPagoService = {
  getMetodosPago: async () => {
    try {
      const response = await fetch(BASE_URL);
      return response.json();
    } catch (error) {
      console.log("Error al obtener los métodos de pago:", error);
      throw error;
    }
  },

  getMetodoPagoById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      return response.json();
    } catch (error) {
      console.error(`Error al obtener método de pago con ID ${id}:`, error);
      throw error;
    }
  },

  addMetodoPago: async (metodoPagoData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metodoPagoData),
      });
      return response.json();
    } catch (error) {
      console.error('Error al agregar método de pago:', error);
      throw error;
    }
  },

  updateMetodoPago: async (id, metodoPagoData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metodoPagoData),
      });

      return response.json();
    } catch (error) {
      console.error(`Error al actualizar método de pago con ID ${id}:`, error);
      throw error;
    }
  },

  deleteMetodoPago: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      return response.json();
    } catch (error) {
      console.error(`Error al eliminar método de pago con ID ${id}:`, error);
      throw error;
    }
  },
};

export default MetodoPagoService;
