import { Like } from 'typeorm';
import User from '../entities/database/user';
import { BaseRepository } from './baseRepository';

class UserRepository extends BaseRepository<User> {


    getOneByEmail = async (email: string) => {
        return await this.repository.findOne({
            where: {
                email: email
            }
        })
    }

    getUserByName = async (name: string) => {
        return await this.repository.findOne({
            where: {
                name: name
            }
        })
    }

    getAllUsersByQuery = async(query: string) => {
        return await this.repository.find({
            where: {name: Like(query)}
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