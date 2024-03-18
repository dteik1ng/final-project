import { z } from "zod";

export const proveedorSchemas = z.object({
  id: z.number({
    required_error: "El id es requerido",
  }),
  nombre: z.string({
    required_error: "El nombre es requerido",
  }),
  direccion: z.string({
    required_error: "La direccion del proveeder es requerida",
  }),
  celular: z.string({
    required_error: "El celular del proveedor es requerida",
  })
});
