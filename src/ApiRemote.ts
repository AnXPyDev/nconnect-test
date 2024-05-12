import axios, { Axios } from "axios";

export class ApiException extends Error {
    code: number;
    data: object;

    constructor(code: number, data: object) {
        super();
        this.code = code;
        this.data = data;
    }

    handle(code: number, handler: (data: any) => void) {
        if (code === this.code) {
            handler(this.data);
        }
        return this;
    }
}

export default class ApiRemote {
    connection: Axios;

    constructor(baseURL: string, args: object = {}) {
        this.connection = axios.create({
            baseURL, ...args
        });
    }

    async post(endpoint: string, data: object = {}): Promise<any> {
        const res = (await this.connection.post(endpoint, data)).data;

        if (res.code) {
            throw new ApiException(res.code, res);
        }

        return res;
    }
}