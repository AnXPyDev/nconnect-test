import ApiRemote from "./ApiRemote";
import { Presentation, Speaker, Stage } from "./models";

async function main() {

const remote = new ApiRemote("http://127.0.0.1:8000/api");

const speaker: Speaker = (await remote.post("speaker/create", {
    name: "Rytmus Vrbovsky",
    description: "Cigan smrlavy"
} as Speaker)).speaker!!;

const stage: Stage = (await remote.post("stage/create", {
    name: "THAP0106"
} as Stage)).stage!!;

console.log(speaker, stage);

const presentation: Presentation = (await remote.post("presentation/create", {
    name: "Presentation test",
    description: "Presentation desc",

    start_date: "2024-01-12 12:00:00",
    end_date: "2024-01-12 13:00:00",

    stage_id: stage.id,
    speaker_id: speaker.id
} as Presentation)).presentation!!;

let res = await remote.post("presentation/create", {
    name: "Presentation test 2",
    description: "Presentation desc",

    start_date: "2024-01-12 12:30:00",
    end_date: "2024-01-12 13:30:00",

    stage_id: stage.id,
    speaker_id: speaker.id 
} as Presentation);

if (res.code) {
    console.log("Overlaps", res.overlaps);
} else {
    console.log(res.presentation);
}




}

main();


