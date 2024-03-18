import { z } from "zod";

export const productoSchema = z.object({
  id: z.number({
    required_error: "Nombre del producto es requerido",
  }),
  nombre: z.string({
    required_error: "Nombre del producto es requerido",
  }),
  descripcion: z.string({
      required_error: "La descripcion del producto es requerido"
    }),
  precio: z.number({
    required_error: "El precio es requerido",
  }),
  cantidadEntrada: z.number({
    required_error: "La cantidad de entrada es requerida",
  }),
  cantidad: z.number({
    required_error: "La cantidad es requerida",
  }),
  fechaEntrada: z.string({
    required_error: "La fecha de entrada es requerida",
  }),
  CategoriaId: z.number({
    required_error: "La CategoriaId de entrada es requerida",
  }),
  ProveedorId: z.number({
    required_error: "La ProveedorId de vencimiento es requerida",
  })
});
