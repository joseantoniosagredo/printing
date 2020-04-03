import { Document, Schema, model, Types } from 'mongoose'
import { ModelsNames } from './enums';

type FileType = {
    user: Types.ObjectId
    /** Field name specified in the form */
    fieldname: string;
    /** Name of the file on the user's computer */
    originalname: string;
    /** Encoding type of the file */
    encoding: string;
    /** Mime type of the file */
    mimetype: string;
    /** Size of the file in bytes */
    size: number;
    /** The folder to which the file has been saved (DiskStorage) */
    destination: string;
    /** The url where to get the uploaded file (aws S3 for example) */
    //location: string;
    /** The name of the file within the destination (DiskStorage) */
    filename: string;
    /** Location of the uploaded file (DiskStorage) */
    path: string;
    /** A Buffer of the entire file (MemoryStorage) */
    //buffer: Buffer;
    pages: number
} & Document

const schema = new Schema<FileType>({
    user: { type: Types.ObjectId, required: true },
    fieldname: { type: String, required: true },
    originalname: { type: String, required: true },
    encoding: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    destination: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    //buffer: { type: String, required: true },
    pages: { type: Number, required: true },
})

export default model<FileType>(ModelsNames.FILE, schema, ModelsNames.FILE)