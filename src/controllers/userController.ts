import { Request, Response } from 'express';
import passport from 'passport';
import User from '../entities/database/user';
import Logger from '../logger/logger';
import UserService from '../services/userService';
import jwt_decode from "jwt-decode";

class UserController {

    constructor() { }
    async getOneById(req: Request, res: Response) {
        const userService = new UserService();
        const id = req.body.id;

        const entity = userService.getOneById(id);

        return res.send({
            message: 'successful',
            entity: entity
        });
    }

    async test(req: Request, res: Response) {
        return res.send({
            message: 'successful',
            entity: 'test user'
        });
    }

    logout = (req: Request, res: Response) => {
        console.log('test');
        console.log(req.user);
        req.logout();
        delete req.session;
        return res.status(301).redirect('http://localhost:3000');
    };

    // async getOneByEmail(req: Request, res: Response) {
    //     const email = req.body.email;

    //     const entity = this.userService.getOneByEmail(email);

    //     return res.send({
    //         message: 'successful',
    //         entity: entity
    //     });
    // }

    async getList(req: Request, res: Response) {
        const skip = req.query.skip as unknown as number;
        const take = req.query.take as unknown as number;
        const userService = new UserService();
        const entities = await userService.getList(skip, take);

        return res.send({
            message: 'succesful',
            entity: entities
        });
    }

    async auth(req: Request, res: Response): Promise<any> {
        try {
            if (req.user) {
                Logger.info('succesfull authentication', req.user)
                return res.status(201).send("authenticatied");
            }
            return res.status(403).send("not authentication");
        } catch (error) {
            Logger.error(error);
            return res.status(404).send("unsuccesfull authentication");
        }
    }

    authSucces = (req: Request, res: Response) => {
        if (req.user) {
            return res.status(200).json({
                success: true,
                message: 'succesful',
                user: req.user,
                cookies: req.cookies
            })
        }

        return res.status(401).send('not authenticated');
    };

    async create(req: Request, res: Response): Promise<any> {
        const userService = new UserService();

        const username = req.body.username as string;
        const password = req.body.password as string;

        const entity = await userService.create(username, password);

        return res.send({
            message: 'succesful',
            entity: entity
        });
    }

    signOut = (req: Request, res: Response) => {
        req.logout();
        delete req.session;
        return res.status(301).redirect('http://localhost:3000');
    };

    async getFollowers(req: Request, res: Response) {
        const userService = new UserService();
        const jwt: any = jwt_decode(`${req.cookies['session.sig']}.${req.cookies["session"]}`);

        const entities = await userService.getFollowers(jwt.passport.user.username);

        return res.send({
            message: 'succesful',
            entity: entities
        });
    }

    async followUser(req: Request, res: Response) {
        const userService = new UserService();
        const username = req.body.username;
        const jwt: any = jwt_decode(`${req.cookies['session.sig']}.${req.cookies["session"]}`);

        const entity = await userService.followUser(jwt.passport.user.id, username);

        return res.send({
            message: 'succesful',
            entity: entity
        });
    }

    async delete(req: Request, res: Response) {
        const userService = new UserService();
        const username = req.query.username as string;
        const jwt: any = jwt_decode(`${req.cookies['session.sig']}.${req.cookies["session"]}`);

        if (jwt.passport.user.role !== 'admin') {
            return res.send({
                message: 'not admin',
            });
        }

        const entity = await userService.deleteUser(username);

        return res.send({
            message: 'succesful',
            entity: entity
        });
    }

    async makeAdmin(req: Request, res: Response) {
        const userService = new UserService();
        const username = req.query.username as string;
        const jwt: any = jwt_decode(`${req.cookies['session.sig']}.${req.cookies["session"]}`);

        if (jwt.passport.user.role !== 'admin') {
            return res.send({
                message: 'not admin',
            });
        }

        const entity = await userService.makeAdmin(username);

        return res.send({
            message: 'succesful',
            entity: entity
        });
    }

}

export default UserController