import { getCurrentUser, openmrsFetch } from "@openmrs/esm-framework";
import { mergeMap } from "rxjs/operators";
import { deathValidated } from "./constants";
const BASE_WS_API_URL = '/ws/rest/v1/';

export function getSynchronizedCurrentUser(opts: any) {
    return getCurrentUser(opts).pipe(
        mergeMap(async user => {
            return user;
        }),
    );
}
export const getConceptAnswer = (concept, setQuestion) => {
    setQuestion(concept.display)
    return (concept.answers).map(answer => {
        return ({ uuid: answer.uuid, name: answer.display, display: answer.display })
    })
}
export async function fetchConceptByUuid(conceptUuid: string, lang: string) {
    return openmrsFetch(`${BASE_WS_API_URL}concept/${conceptUuid}?v=full&lang=${lang}`, {
        method: "GET",
    });
}
export function killPatient(abortController: AbortController, patient: string, date: Date, causeOfDeath: string) {
    return openmrsFetch(`/ws/rest/v1/person/${patient}`, {
        method: 'POST',
        body: {
            dead: true,
            deathDate: date.toISOString(),
            causeOfDeath: causeOfDeath,
        },
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal
    });
}
