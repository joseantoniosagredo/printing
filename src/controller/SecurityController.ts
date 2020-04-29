import { Request, Response } from "express";
import { User } from "../models";

export function login(req: Request & { session: { user?: string } } & any, res: Response, next: () => void) {
    if (req.session.user) return next()
    res.status(401).send('User not logged')
}

export function isAdmin(req: Request & { session: { user?: string } } & any, res: Response, next: () => void) {
    login(req, res, () => {
        User.findById(req.session.user, (err, user) => {
            if (err) return res.status(500).send(err.message)
            if (!user) return res.status(401).send('User not found')
            if (user.admin === true) return next()
            return res.status(403).send()
        })
    })

}