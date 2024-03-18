import z from 'zod';

export const historialSchema = z.object({
    cambio: z.string({
        required_error: 'El nombre del cambio es obligatorio',
    }),
    descripcion: z.string({
        required_error: 'La descripcion del cambio es obligatoria',
    }),
    FacturaId:z.number({
        required_error:'FacturaId es requerido',
    })
})