import ApiRemote, { ApiException } from "./ApiRemote";
import { Presentation, Speaker, Stage, Timeslot } from "./models";

import testAuth from "./tests/auth";

async function main() {

const remote = new ApiRemote("http://127.0.0.1:8000/api").init();

await testAuth(remote);


}

main();


