import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'
import Usuario from '../models/usuarios.js'
import Rol from '../models/rol.js'
import { validarEmail, validarPassword } from '../helpers/recuperacioncontra.js'

const saltos = bcrypt.genSaltSync(10)

export const postUsuarioService = (data) => {
    return new Promise(async (resolve, reject) => {
        const {
            correo: email,
            password,
            RolId
        } = data
        const emailLower = email.toLowerCase()
        try {
            // constular usuarios
            const isInto = await Usuario.findOne({
                where: {
                    [Op.or]: {
                        id: documento,
                        correo: emailLower
                    }
                }
            })

            //  consultar roles
            const existeRol = await Rol.findByPk(RolId)

            // Validar que el rol exista
            if (!existeRol) {
                return resolve({
                    ok: false,
                    message: 'Rol no encontrado'
                })
            }

            // validar que no existan correo o id en uso
            if (isInto) {
                return resolve({
                    ok: false,
                    message: 'Correo o Documento ya en uso'
                })
            }

            // validar email
            if (!validarEmail(email)) {
                return resolve({
                    ok: false,
                    message: `Correo ${email} es inválido, solo recibe @gmail.com`
                })
            }

            // validar password
            if (!validarPassword(password)) {
                return resolve({
                    ok: false,
                    message: 'Contraseña Inválida. \n Debe tener ser de 8 car. y contener una mayúscula, una mínuscula, un número, un caracter especial'
                })
            }

            // Encriptar
            const passwordHast = bcrypt.hashSync(password, saltos)
        } catch (error) {
            reject(error)
        }
    }) 
}

export const getUsuarioService = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const usuario = await Usuario.findByPk(idUser)
            if (!usuario) {
                return resolve({
                    ok: false,
                    message: 'usuario no encontrado'
                })
            }

            resolve({
                ok: true,
                messge: 'usuario obtenido',
                data: usuario
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const putUsuarioService = (UsuarioId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id) {
                delete data.id
            }

            const usuario = await Usuario.findByPk(UsuarioId)
            if (!usuario) {
                return resolve({
                    ok: false,
                    message:  'Usuario no encontrado'
                })
            }
            if (data.RolId) {
                //  consultar roles
                const existeRol = await Rol.findByPk(data.RolId)

                // Validar que el rol exista
                if (!existeRol) {
                    return resolve({
                        ok: false,
                        message: 'Rol no encontrado'
                    })
                }
            }

            if (data.correo) {
                // validar email
                if (!validarEmail(data.correo)) {
                    return resolve({
                        ok: false,
                        message: `Correo ${data.correo} es inválido, solo recibe @gmail.com`
                    })
                }
            }

            let dataNueva = data

            if (data.password) {
                // validar password
                if (!validarPassword(data.password)) {
                    return resolve({
                        ok: false,
                        message: 'Contraseña Inválida. \n Debe tener ser de 8 car. y contener una mayúscula, una mínuscula, un número, un caracter especial'
                    })
                }

                dataNueva.password = bcrypt.hashSync(data.password, saltos)
            }
            const usuarioActualizado = await usuario.update(dataNueva)

            if (!usuarioActualizado) {
                await t.rollback(transaccion.data)
                return resolve({
                    ok:false,
                    message: 'Usuario no fue actualizado'
                })
            }

            await t.commit(transaccion.data)
            resolve({
                ok: true,
                message: ' Usuario Actualizado'
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteUsuarioService = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const usuario = await Usuario.findByPk(idUser)
            if (!usuario) {
                return resolve({
                    ok: false,
                    message: 'usuario no encontrado'
                })
            }
            await usuario.destroy()

            resolve({
                ok: true,
                message: ' Usuario Eliminado'
            })
        } catch (error) {
            reject(error)
        }
    })
}
