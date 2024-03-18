import { z } from "zod";

const usuarioSchema = z.object({
  //id: z.number({
   // required_error: "El ID del usuario es requerido",
  //}),
  nombre: z.string({
    required_error: "Nombre del usuario es requerido",
  }),
  apellido: z.string({
    required_error: "Apellido del usuario es requerido",
  }),
  direccion: z.string({
    required_error: "La dirección del usuario es requerida",
  }),
  celular: z.string({
    required_error: "El número de celular del usuario es requerido",
  }),
  correo: z.string({
    required_error: "El correo es requerido",
  }),
  password: z.string({
    required_error: "La contraseña es requerida",
  }).min(6, "La contraseña debe tener como mínimo 6 caracteres"),
});
export default usuarioSchema;