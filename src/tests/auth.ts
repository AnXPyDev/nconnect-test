import ApiRemote, { ApiException } from "../ApiRemote";

export default async function(remote: ApiRemote) {

const login_res = await remote.post("auth/admin/login");

const authRemote = remote.withToken(login_res.token).init();

const res = await authRemote.post("auth/admin/test");

console.log(login_res, res);

await authRemote.post("auth/admin/logout");
await authRemote.post("auth/admin/test");

}