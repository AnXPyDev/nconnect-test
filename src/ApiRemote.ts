import axios, { Axios } from "axios";

export default class ApiRemote {
    connection: Axios;

    constructor(baseURL: string, args: object = {}) {
        this.connection = axios.create({
            baseURL, ...args
        });
    }

    async post(endpoint: string, data: object = {}): Promise<any> {
        const res = await this.connection.post(endpoint, data);
        return res.data;
    }
}