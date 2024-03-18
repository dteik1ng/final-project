//recuperacion de contraseña 

const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,}$/

export const validarPassword = (password) => {
    return passwordRegex.test(password)
}

export const validarEmail = (email) => {
    return emailRegex.test(email)
}

// Crear codigo para recuperacion de password
export const generarCodigoAleatorio = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let codigo = ''
    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
        codigo += caracteres.charAt(indiceAleatorio)
    }
    return codigo
}