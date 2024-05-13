import axios, { Axios } from "axios";

export enum ApiCodes {
    NoAuth = 666
};

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
    baseURL: string;
    args: object;
    headers: object;
    connection!: Axios;

    constructor(baseURL: string, args: object = {}, headers = {}) {
        this.baseURL = baseURL;
        this.args = args;
        this.headers = {
            "Accept": "application/json",
            ...headers
        };
    }

    init() {
        this.connection = axios.create({
            baseURL: this.baseURL,
            headers: this.headers,
            ...this.args,
        });
        return this;
    }

    async post(endpoint: string, data: object = {}): Promise<any> {
        const res = (await this.connection.post(endpoint, data)).data;

        if (res.code) {
            throw new ApiException(res.code, res);
        }

        return res;
    }

    withToken(token: string) {
        return new ApiRemote(this.baseURL, this.args, {
            ...this.headers,
            "Authorization": `Bearer ${token}`
        });
    }
}