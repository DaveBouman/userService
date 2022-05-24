import { Todo } from '../entities/database/todo';
import { Request, Response } from 'express';
import BaseController from './baseController';

class TodoController extends BaseController<Todo> {

    constructor(
    ) {
        super(Todo);
    }

    /*
    example function on how to override from base implementation
    */

    override getList = async (req: Request, res: Response) => {
        const skip = req.query.skip as unknown as number;
        const take = req.query.take as unknown as number;


        return res.send({
            message: "This is succesfull",
            entity: 'entities',
        });
    };


    // override getOneById = async (req: Request, res: Response) => {
    //     const id = req.params.id as unknown as number;

    //     const entity = await this.todoService.getOneByUUID(id);

    //     return res.send({
    //         message: 'successful',
    //         entity: entity
    //     });
    // }
}

export default TodoController