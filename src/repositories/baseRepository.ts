import { Repository, EntityTarget, DeepPartial } from "typeorm";
import dataSource from "../dataSource";

interface Base {
    id: any,
    uuid: any
}

export class BaseRepository<T> {
    repository: Repository<T>;

    constructor(repository: EntityTarget<T>) {
        this.repository = dataSource.getRepository(repository);
    }

    async getOneById(id: number) {
        return await this.repository.findOneBy({
            id: id,
        })
    }

    async getOneByUUID(uuid: string) {
        return await this.repository.findOneBy({
            uuid: uuid,
        })
    }

    async getList(skip: number, take: number) {
        return await this.repository.find({
            skip: skip,
            take: take
        })
    }

    async create(entity: DeepPartial<T>) {
        return await this.repository.create(entity);
    }

    async save(entity: DeepPartial<T>) {
        return await this.repository.save(entity);
    }

    async deleteMany(ids: number[]) {
        return await this.repository.delete(ids);
    }

    async softDelete(id: number) {
        return await this.repository.softDelete(id);
    }

    async softDeleteMany(ids: number[]) {
        return await this.repository.softDelete(ids);
    }

    async softRemove(entity: DeepPartial<T>) {
        return await this.repository.softRemove(entity);
    }

    async softRemoveMany(entities: DeepPartial<T>[]) {
        return await this.repository.softRemove(entities);
    }
}
