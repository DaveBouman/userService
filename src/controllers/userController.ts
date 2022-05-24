import { Request, Response } from 'express';
import User from '../entities/database/user';
import Logger from '../logger/logger';
import UserService from '../services/userService';

class UserController {

    constructor(private userService = new UserService()) { }

    async getOneById(req: Request, res: Response) {
        const id = req.body.id;

        const entity = this.userService.getOneById(id);

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

    // async getOneByEmail(req: Request, res: Response) {
    //     const email = req.body.email;

    //     const entity = this.userService.getOneByEmail(email);

    //     return res.send({
    //         message: 'successful',
    //         entity: entity
    //     });
    // }

    // async getList(req: Request, res: Response) {
    //     const entities = this.userService.getList();

    //     return res.send({
    //         message: 'succesful',
    //         entity: entities
    //     });
    // }

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

    async create(req: Request, res: Response): Promise<any> {
        const entity = this.userService.create(req.body) as unknown as User;

        return res.send({
            message: 'succesful',
            entity: entity
        });
    }
}

export default UserController