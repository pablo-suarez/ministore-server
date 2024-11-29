export const environmentMongoUri = (dbUser: string, dbPassword: string, dbHost: string): string => {
    if(process.env.PROJECT_ENV == 'local'){
        return `mongodb://${dbUser}:${dbPassword}@${dbHost}/?authMechanism=DEFAULT`;
    }
    return ``;
}