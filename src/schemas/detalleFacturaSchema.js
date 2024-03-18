import { z } from "zod";

export const detalleFacturaSchema = z.object({
  cantidad: z.number({
    required_error: "La cantidad es requerida",
  }),
  ProductoId: z.number({
    required_error: "La CategoriaId de entrada es requerida",
  }),

});
