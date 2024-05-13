import ApiRemote, { ApiException } from "../ApiRemote";
import { Presentation, Speaker, Stage, Timeslot } from "../models";

export default async function(remote: ApiRemote) {

const speaker = (await remote.post("speaker/create", {
    name: "Patrik Vrbovsky",
    description: "popis",
    imagepath: "null"
} as Speaker)).speaker;

const stage: Stage = (await remote.post("stage/create", {
    name: "THP0106"
} as Stage)).stage;

const timeslot: Timeslot = (await remote.post("timeslot/create", {
    stage_id: stage.id,
    start_at: "2024-01-01 12:00:00",
    end_at: "2024-01-01 13:00:00"
} as Timeslot)).timeslot;

try {
    const timeslot2: Timeslot = (await remote.post("timeslot/create", {
        stage_id: stage.id,
        start_at: "2024-01-01 12:30:00",
        end_at: "2024-01-01 14:00:00"
    } as Timeslot)).timeslot;
} catch (e) {
    (e as ApiException).handle(1, (data: { overlaps: Timeslot[] }) => {
        console.log(data.overlaps);
    });
}

const presentation: Presentation = (await remote.post("presentation/create", {
    name: "Presentation",
    speaker_id: speaker.id,
    timeslot_id: timeslot.id,
    description: "desc",
    long_description: "ldesc"
} as Presentation)).presentation;

console.log(speaker, stage, timeslot, presentation);

const presentation2: Presentation = (await remote.post("presentation/create", {
    name: "Presentation",
    speaker_id: speaker.id,
    timeslot_id: timeslot.id,
} as Presentation)).presentation;

}