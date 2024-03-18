import { z } from "zod";

export const loginSchema = z.object({
    
    correo: z.string({
        required_error: "El correo es requerido"
    }),
    password: z.string({
        required_error: "La contraseña es requerida",
      })
});


