import { Todo } from "../entities/database/todo";
import TodoRepository from "../repositories/todoRepository";
import BaseService from "./baseService";

class TodoService extends BaseService<Todo> {

    constructor(private todoRepository = new TodoRepository(Todo)) {
        super(Todo);
    }

    /*
    example function on how to override from base implementation
    */

    // override async getOneByUUID(uuid: string) {
    //     return this.todoRepository.getOneByUUID(uuid);
    // }

}

export default TodoService