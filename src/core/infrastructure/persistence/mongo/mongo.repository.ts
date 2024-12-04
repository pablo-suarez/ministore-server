import { Injectable, NotFoundException } from "@nestjs/common";
import { Model, QueryOptions, UpdateQuery } from "mongoose";

@Injectable()
export abstract class MongoRepository<MongoModel extends { _id: string, id: string }, Entity> {
  constructor(private readonly model: Model<MongoModel>) { }

  async persists(data: Omit<MongoModel, '_id'>) {
    const result = await this.model.create({ _id: data.id, ...data });
    return this.mapToPrimitives(result);
  }

  async findManyByIds(ids: string[]): Promise<Entity[]> {
    const results = await this.model.find({ _id: { $in: ids } }).exec();
    return results.map(this.mapToPrimitives);
  }

  async findById(id: string) {
    const result = await this.model.findById({ _id: id });
    if (!result) {
      throw new NotFoundException(`${id} not found`);
    }
    return this.mapToPrimitives(result);
  }

  async findByIdAndUpdate(
    id: string,
    newData: UpdateQuery<MongoModel>,
    options: QueryOptions<MongoModel>,
  ) {
    const result = await this.model.findByIdAndUpdate({ _id: id }, newData, options);
    if (!result) {
      throw new NotFoundException(`${id} not found`);
    }
    return this.mapToPrimitives(result);
  }

  abstract mapToPrimitives(input: MongoModel): Entity;
}