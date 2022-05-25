import { Like } from 'typeorm';
import User from '../entities/database/user';
import { BaseRepository } from './baseRepository';

class UserRepository extends BaseRepository<User> {

    getUserByName = async (username: string) => {
        return await this.repository.findOne({
            relations: ['following', 'follows'],
            where: {
                username: username
            }
        }) as User
    }

    getAllUsersByQuery = async (query: string) => {
        return await this.repository.find({
            where: { username: Like(query) }
        })
    }

    followUser = async (userId: string, followingName: string) => {
        let entity = await this.repository.findOne({
            loadRelationIds: true,
            where: {
                id: userId
            }
        }) as User

        entity.following = [followingName];

        return await this.repository.save(entity);
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