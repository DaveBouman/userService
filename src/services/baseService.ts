import { DeepPartial, EntityTarget } from "typeorm";
import { BaseRepository } from "../repositories/baseRepository";

class BaseService<T> {

    constructor(entityType: EntityTarget<T>,
        private baseRepository = new BaseRepository(entityType)) { }

    async getOneById(id: number) {
        return this.baseRepository.getOneById(id);
    }

    async getOneByUUID(uuid: string) {
        return this.baseRepository.getOneByUUID(uuid);
    }

    async getList(skip: number, take: number) {
        return this.baseRepository.getList(skip, take);
    }

    async save(entity: DeepPartial<T>) {
        return this.baseRepository.save(entity);
    }

    async delete(id: number) {
        return this.baseRepository.delete(id);
    }

    async deleteMany(ids: number[]) {
        return this.baseRepository.deleteMany(ids);
    }

    async softDelete(id: number) {
        return this.baseRepository.softDelete(id);
    }

    async softDeleteMany(ids: number[]) {
        return this.baseRepository.softDeleteMany(ids);
    }

    async softRemove(entity: DeepPartial<T>) {
        return this.baseRepository.softRemove(entity);
    }

    async softRemoveMany(entities: DeepPartial<T>[]) {
        return this.baseRepository.softRemoveMany(entities);
    }

}

export default BaseService