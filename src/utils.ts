
export default class HttpError extends Error {
    status: number
    constructor(err:Error)
    constructor(message: string, status: number)
    constructor(message: string | Error, status?: number) {
        super(typeof message === 'string' ? message : message.message)
        this.status = status || 500
    }
}
export type Callback<T = any,E = Error> = (err:E | null,result?:T) => void