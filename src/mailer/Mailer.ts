import * as nodemailer from "nodemailer"

export default class Mailer {
    transporter = nodemailer.createTransport()
    static singleton:Mailer | null = null
    constructor(host:string, port:number,secure:boolean,user:string,pass:string){
        this.transporter = nodemailer.createTransport({
            host,
            port,//: 587,
            secure, //: false, // true for 465, false for other ports
            auth: {
              user: user, // generated ethereal user
              pass: pass // generated ethereal password
            }
          });
        Mailer.singleton = this
    }
    sendMail(from:string, to:string, subject:string, html:string){
      if(Mailer.singleton)  
        return Mailer.singleton.transporter.sendMail({
            from, // sender address
            to, // list of receivers
            subject, // Subject line
            html
          });
    }
}