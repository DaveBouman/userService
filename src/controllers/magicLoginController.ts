import { Request, Response } from 'express';
import { magicLogin } from "../middleware/passportMiddleware"
import passport from "passport"

class MagicLoginController {

    login = async () => {
        magicLogin.send
    }

    callback = async () => {
        passport.authenticate("magiclogin", {
            successRedirect: `${process.env.DOMAIN}`,
            failureRedirect: '/auth/failed'
        })
    }

    authFailed = async (res: Response) => {
        res.status(401).json({
            success: false,
            message: 'failure'
        })
    }

    authSucces = async (req: Request, res: Response) => {
        if (req.user) {
            res.status(200).json({
                success: true,
                message: 'succesfull',
                user: req.user,
                cookies: req.cookies
            })
        }
    }
}



export default MagicLoginController