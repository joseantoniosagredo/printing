import { Document, Schema, model, Types } from 'mongoose'
import { ModelsNames } from './enums';

export type FileType = {
    //user: Types.ObjectId
    /** Field name specified in the form */
    originalName: string;
    /** Encoding type of the file */
    encoding: string;
    /** Mime type of the file */
    mimetype: string;
    /** Size of the file in bytes */
    size: number;
    /** The folder to which the file has been saved (DiskStorage) */
    destination: string;
    /** The url where to get the uploaded file (aws S3 for example) */
    filename: string;
    /** Location of the uploaded file (DiskStorage) */
    path: string;
    /** A Buffer of the entire file (MemoryStorage) */
    //buffer: Buffer;
    pages: number
    //urlStorage: string
    deleted?: boolean
}
export type FileDocumentType = FileType & Document
const schema = new Schema<FileType>({
    //user: { type: Types.ObjectId, required: true },
    originalName: { type: String, required: true },
    encoding: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    destination: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    //buffer: { type: String, required: true },
    //urlStorage: {type:String, required: true},
    pages: { type: Number, required: true },
    deleted: { type: Boolean, default: false },
})

export default model<FileDocumentType>(ModelsNames.FILE, schema, ModelsNames.FILE)