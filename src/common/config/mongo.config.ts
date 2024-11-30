import { registerAs } from "@nestjs/config";
import * as Joi from 'joi';
import { MongoDBConfig } from '../types/mongo.type';

export default registerAs('mongo', (): MongoDBConfig => {

    const values: MongoDBConfig = {
        mongoDBHost: process.env.DB_MONGO_HOST,
        mongoDBUser: process.env.DB_MONGO_USER,
        mongoDBName: process.env.DB_MONGO_NAME,
        mongoDBPassword: process.env.DB_MONGO_PASSWORD,
    }

    const schema = Joi.object<MongoDBConfig, true>({
        mongoDBHost: Joi.string(),
        mongoDBUser: Joi.string(),
        mongoDBName: Joi.string(),
        mongoDBPassword: Joi.string(),
    });

    const { error } = schema.validate(values, { abortEarly: false });
    if (error) {
        const messageError = `Validation failed - Missing MongoDB variable ${error.message}`;
        throw new Error(messageError);
    }

    return values;
});