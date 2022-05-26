import { Connection, Like } from 'typeorm';
import User from '../entities/database/user';
import { BaseRepository } from './baseRepository';

class UserRepository extends BaseRepository<User> {

    getUserByUsername = async (username: string) => {
        const entity = await this.repository.findOne({
            relations: ['following', 'follows'],
            where: {
                username: username
            }
        })
        return entity;
    }

    getAllUsersByQuery = async (query: string) => {
        return await this.repository.find({
            where: { username: Like(query) }
        })
    }

    followUser = async (userId: string, followingName: string) => {
        let entity = await this.repository.findOne({
            relations: ['follows'],
            where: {
                id: userId
            }
        }) as User

        let entity2 = await this.repository.findOne({
            relations: ['follows'],
            where: {
                username: followingName
            }
        })

        if (entity2 != null)
            entity.follows.push(entity2);

        return await this.repository.save(entity);
    }

    unFollow = async (userId: string, followingName: string) => {
        let entity = await this.repository.findOne({
            relations: ['follows'],
            where: {
                id: userId
            }
        }) as User;

        return await this.repository.save(entity);
    }


    override async getList(skip: number, take: number): Promise<User[]> {
        return await this.repository.find({
            skip: skip,
            take: take,
            order: {
                username: "ASC"
            }
        });
    }

    updateBio = async (id: string, bio: string) => {
        let entity = await this.repository.findOne({
            loadRelationIds: true,
            where: {
                id: id
            }
        }) as User

        entity.bio = bio;

        return await this.repository.save(entity);
    }

    makeAdmin = async (username: string) => {
        let entity = await this.repository.findOneOrFail({
            where: {
                username: username
            }
        })

        entity.role = "admin"

        return await this.repository.save(entity);
    }

    delete = async (username: string) => {
        const entity = await this.repository.findOne({
            relations: {
                following: true,
                follows: true
            },
            where: {
                username: username
            }
        }) as User

        return this.repository.delete(entity)
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