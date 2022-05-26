import User from "../entities/database/user";
import UserRepository from "../repositories/userRepository";
import BaseService from "./baseService";
import KafkaService from "./kafkaService";
import crypto, { timingSafeEqual } from "crypto";

class UserService extends BaseService<User> {

    constructor(private userRepository = new UserRepository(User),
    ) {
        super(User);
        // UserConsumer;
    }

    getUserByUsername = async (username: string) => {
        return this.userRepository.getUserByUsername(username);
    }

    getAllUsersByQuery = async (name: string) => {
        return this.userRepository.getAllUsersByQuery(name);
    }

    getFollowers = async (name: string) => {
        return this.userRepository.getUserByName(name);
    }

    followUser = async (id: string, name: string) => {
        return await this.userRepository.followUser(id, name);
    }

    unFollow = async (id: string, name: string) => {
        return await this.userRepository.unFollow(id, name);
    }

    create(username: string, password: string) {
        const cryp = crypto.createHmac("sha256", 'changetosalt')

        const entity = new User;
        entity.username = username;
        entity.password = cryp.update(password).digest('hex');

        return this.userRepository.save(entity);
    }

    override getList(skip: number, take: number): Promise<User[]> {
        return this.userRepository.getList(skip, take);
    }

    async makeAdmin(username: string) {
        return await this.userRepository.makeAdmin(username);
    }

    async deleteUser(username: string) {
        return await this.userRepository.delete(username);
    }

    async updateBio(id: string, bio: string) {
        return await this.userRepository.updateBio(id, bio);
    }

    /*
    example function on how to override from base implementation
    */

    // override async getOneByUUID(uuid: string) {
    //     return this.todoRepository.getOneByUUID(uuid);
    // }

}

export default UserService