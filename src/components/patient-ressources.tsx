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

export function killPatient(abortController: AbortController, uuid: string, person) {
    return openmrsFetch(`/ws/rest/v1/person/${uuid}`, {
        method: 'POST',
        body: person,
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal
    })
}
export function fetchPatient(patientUuid) {
    if (patientUuid) {
        return openmrsFetch(`${BASE_WS_API_URL}patient/${patientUuid}?v=full&lang=${localStorage.getItem("i18nextLng")}`, { method: 'GET' });
    }
    return Promise.resolve(null);
}
