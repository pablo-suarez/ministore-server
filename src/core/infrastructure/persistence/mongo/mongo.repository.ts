import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";

@Injectable()
export abstract class MongoRepository<MongoModel extends { _id: string, id: string }, Entity> {
    constructor(private readonly model: Model<MongoModel>) { }

    async persists(data: Omit<MongoModel, '_id'>) {
        const result = await this.model.create({ _id: data.id, ...data });
        return this.mapToPrimitives(result);
    }

    async findById(id: string) {
        const result = await this.model.findById({ _id: id });
        if (!result) {
          throw new NotFoundException(`${id} not found`);
        }
        return this.mapToPrimitives(result);
      }

    abstract mapToPrimitives(input: MongoModel): Entity;
}