import { Request, Response } from 'express';
import passport from "passport"

class GoogleController {

    authenticate = (passport.authenticate('google',
        {
            scope: ['profile', 'email']
        }));

    logout = (req: Request, res: Response) => {
        console.log('test');
        console.log(req.user);
        req.logout();
        delete req.session;
        return res.status(301).redirect('http://localhost:3000');
    };

    callback = (passport.authenticate("google", {
        successRedirect: 'http://localhost:3000',
        failureRedirect: 'api/v1/users/login/failed'
    }));

    authFailed = (res: Response) => {
        res.status(401).json({
            success: false,
            message: 'failure'
        })
    };

    authSucces = (req: Request, res: Response) => {
        console.log(req.user);
        if (req.user) {
            return res.status(200).json({
                success: true,
                message: 'succesfull',
                user: req.user,
                cookies: req.cookies
            })
        }

        return res.status(401).send('not authenticated');
    };
}

export default GoogleController