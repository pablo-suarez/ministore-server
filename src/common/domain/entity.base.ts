export type EntityID = string;

export interface BaseEntityProps {
    id: EntityID;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateEntityProps<T> {
    id: EntityID;
    props: T;
    createdAt: Date;
    updatedAt: Date;
}

export abstract class Entity<EntityProps> {
    constructor({ id, createdAt, updatedAt, props }: CreateEntityProps<EntityProps>) {
        this.setId(id);
        const now = new Date();
        this._createdAt = createdAt || now;
        this._updatedAt = updatedAt || now;
        this.props = props;
    }

    protected readonly props: EntityProps;

    protected abstract _id: EntityID;

    private readonly _createdAt: Date;

    private _updatedAt: Date;

    get id(): EntityID {
        return this._id;
    }

    private setId(id: EntityID) {
        this._id = id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    static isEntity(entity: unknown): entity is Entity<unknown> {
        return entity instanceof Entity;
    }

    public getProps(): EntityProps & BaseEntityProps {
        const propsCopy = {
            id: this._id,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            ...this.props,
        };
        return Object.freeze(propsCopy);
    }

}