import { Request, Response } from 'express';
import { DeepPartial, EntityTarget } from 'typeorm';
import BaseService from '../services/baseService';

class BaseController<T> {

  constructor(entityType: EntityTarget<T>,
    private baseService = new BaseService(entityType),
  ) { }

  getOneById = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;

    const entity = await this.baseService.getOneById(id);

    return res.send({
      message: "successful",
      entity: entity,
    });
  };

  getOneByUUID = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as string;

    const entity = await this.baseService.getOneByUUID(id);

    return res.send({
      message: "successful",
      entity: entity,
    });
  };

  getList = async (req: Request, res: Response) => {
    const skip = req.query.skip as unknown as number;
    const take = req.query.take as unknown as number;

    const entities = await this.baseService.getList(skip, take);

    return res.send({
      message: "This is succesfull",
      entity: entities,
    });
  };

  create = async (req: Request, res: Response) => {
    const entity: DeepPartial<T> = req.body;

    const response = await this.baseService.create(entity);

    return res.send({
      message: "successful",
      entity: response,
    });
  };


  save = async (req: Request, res: Response) => {
    const entity: DeepPartial<T> = req.body;

    const response = await this.baseService.save(entity);

    return res.send({
      message: "successful",
      entity: response,
    });
  };

  delete = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;

    const response = await this.baseService.delete(id);

    return res.send({
      message: "successful",
      entity: response,
    });
  }

  deleteMany = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number[];

    const response = await this.baseService.deleteMany(id);

    return res.send({
      message: "successful",
      entity: response,
    });
  }

  softDelete = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;

    const response = await this.baseService.softDelete(id);

    return res.send({
      message: "successful",
      entity: response,
    });
  }

  softDeleteMany = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number[];

    const response = await this.baseService.softDeleteMany(id);

    return res.send({
      message: "successful",
      entity: response,
    });
  }

  softRemove = async (req: Request, res: Response) => {
    const entity: DeepPartial<T> = req.body;

    const response = await this.baseService.softRemove(entity);

    return res.send({
      message: "successful",
      entity: response,
    });
  }

  softRemoveMany = async (req: Request, res: Response) => {
    const entities: DeepPartial<T>[] = req.body;

    const response = await this.baseService.softRemoveMany(entities);

    return res.send({
      message: "successful",
      entity: response,
    });
  }

}

export default BaseController