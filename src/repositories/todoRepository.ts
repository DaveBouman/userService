import { Todo } from '../entities/database/todo';
import { BaseRepository } from './baseRepository';

class TodoRepository extends BaseRepository<Todo> { 

    /*
    example function on how to override from base implementation
    */

    // override async getOneByUUID(uuid: string) {
    //     return await this.repository.findOne({
    //         where: {
    //             uuid: uuid
    //         }
    //     })
    // }

}

export default TodoRepository