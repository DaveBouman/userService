import { Like } from 'typeorm';
import User from '../entities/database/user';
import { BaseRepository } from './baseRepository';

class UserRepository extends BaseRepository<User> {

    getUserByName = async (username: string) => {
        return await this.repository.findOne({
            where: {
                username: username
            }
        })
    }

    getAllUsersByQuery = async (query: string) => {
        return await this.repository.find({
            where: { username: Like(query) }
        })
    }
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

export default UserRepository