export const pictureFilter = ( req: Express.Request, picture: Express.Multer.File, callback: Function) => {
    if( !picture ) return callback( new Error('File is empty'), false );

    const pictureExtension = picture.mimetype.split('/')[1];
    const validExtensions = ['jpg','jpeg','png','gif'];

    if( validExtensions.includes( pictureExtension )){
        return callback(null,true);
    }
    callback(null,false);
}