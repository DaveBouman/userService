import User from "../entities/database/user";
import UserRepository from "../repositories/userRepository";
import BaseService from "./baseService";
import KafkaService from "./kafkaService";
import crypto from "crypto";

class UserService extends BaseService<User> {


    constructor(private userRepository = new UserRepository(User),
    ) {
        super(User);
        // UserConsumer;
    }

    getOneByEmail = async (email: string) => {
        const entity = this.userRepository.getOneByEmail(email);

        return entity;
    }

    getUserByName = async (name: string) => {
        return this.userRepository.getUserByName(name);
    }

    getAllUsersByQuery = async (name: string) => {
        return this.userRepository.getAllUsersByQuery(name);
    }

    create = async (username: string, password: string) => {
        const cryp = crypto.createHmac("sha256", 'changetosalt')

        const entity = new User;
        entity.username = username;
        entity.password = cryp.update(password).digest('hex');


        return this.userRepository.create(entity);
    }

    /*
    example function on how to override from base implementation
    */

    // override async getOneByUUID(uuid: string) {
    //     return this.todoRepository.getOneByUUID(uuid);
    // }

}

export default UserService