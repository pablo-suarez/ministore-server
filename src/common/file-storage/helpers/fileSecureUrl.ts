export const fileSecureUrl = (fileId: string): string => {
    const host = process.env.CURRENT_HOST;
    if (!host) {
        throw new Error("FILE_HOST is not defined in the environment");
      }
    return `${host}/api/files/${fileId}`; ;
}