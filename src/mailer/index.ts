import { Callback } from "../utils";
import { Config, Token } from "../models";
import { UserType } from "../models/User"
import * as nodemailer from "nodemailer"
import { TokenType } from "../models/Token";
import { Document } from "mongoose";

let subject = '¡Bienvenido a imprenta victoria!'
let html = `<h1>¡Bienvenido a imprenta victoria!</h1>
            <p>Para estar seguros que eres tú quien ha creado esta cuenta de usuario, por favor verifique su cuenta pulsando <a href='$$'>aqui</a></p>`
let path = '/'
export function welcomeEmail(user: UserType & Document, callback: Callback) {
    Config.findOne({}, (err, config) => {
        if (err) return callback(err)
        let transporter = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: config.email.security,// true for 465, false for other ports
            auth: {
                user: config.email.user,
                pass: config.email.pass,
            }
        });
        const date = new Date(Date.now()+config.expired)
        const token:TokenType = {
            user:user._id,
            expiredAt:date,
            type:'signup',
            canceled:false
        }
        const tokendb = new Token(token)
        tokendb.save(err => {
            if (err) return callback(err)
            transporter.sendMail({
                from: config.email.user,
                to:user.email,
                subject,
                html: html.replace(/\$\$/g, `${config.domain}/verify/user?token=${tokendb._id.toString()}`)
            }).then(()=>callback(null)).catch(callback)
        })
        

    })
}
const subjectPassword = '¿Olvidaste tu contraseña en Imprenta Victoria?'
const htmlPassword = `<h1>¿No recuerdas tu contraseña?</h1>
    No te preocupes! Aquí estamos nosotros para crearte un acceso seguro para cambiar tu contraseña.<br/>
    Por favor, haz <a href='$$'>click aquí</a><br/>
    <br/>
    Saludos,<br/>
    Imprenta Victoria`
export function ChangePassword(user: UserType & Document, callback: Callback) {
    Config.findOne({}, (err, config) => {
        if (err) return callback(err)
        let transporter = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: config.email.security,// true for 465, false for other ports
            auth: {
                user: config.email.user,
                pass: config.email.pass,
            }
        });
        const date = new Date(Date.now()+config.expired)
        const token:TokenType = {
            user:user._id,
            expiredAt:date,
            type:'resetPassword',
            canceled:false
        }
        const tokendb = new Token(token)
        tokendb.save(err => {
            if (err) return callback(err)
            transporter.sendMail({
                from: config.email.user,
                to:user.email,
                subject:subjectPassword,
                html: htmlPassword.replace(/\$\$/g, `${config.domain}/user/password?token=${tokendb._id.toString()}&user=${user._id}`)
            }).then(()=>callback(null)).catch(callback)
        })
        

    })
}