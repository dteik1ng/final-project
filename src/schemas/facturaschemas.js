import { z } from "zod";

export const facturaschemas = z.object({
  detalleFacturaId: z.number({
    required_error: "El UsuarioId es obligatorio",
  }),
  metodopagoId: z.number({
    required_error: "El UsuarioId es obligatorio",
  })
});
