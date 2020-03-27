
export default class HttpError extends Error {
    status: number
    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}
export type Callback<T = any,E = Error> = (err:E | null,result?:T) => void