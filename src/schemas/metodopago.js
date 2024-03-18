import z from 'zod'

export const metodopagoSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido"
    })
});
