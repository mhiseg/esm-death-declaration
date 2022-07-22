import { getCurrentUser, openmrsFetch } from "@openmrs/esm-framework";
import { mergeMap } from "rxjs/operators";
import { deathValidatedUuid } from "./constants";
const BASE_WS_API_URL = '/ws/rest/v1/';

export interface PatientIdentifier {
    uuid?: string;
    identifier: string;
    identifierType: string | any;
    location?: string;
    preferred?: boolean;
}

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
    console.log(person);
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


export function formatPatient(patient) {
    return {
        codePatient: patient?.identifiers[0]?.identifier || '',
        identifier: patient?.identifiers[1]?.display || '',
        familyName: patient?.person?.names[0]?.familyName || '',
        givenName: patient?.person?.names[0]?.givenName || '',
        uuid: patient?.uuid || null,
        cause: "",
        deathDate: "",
        deathPlace: "",
        secondaryCause: "",
        origin: "",
        deathTime: "",
    }
}

export function searchPatient(identifier) {
    if (identifier) {
        return openmrsFetch(`${BASE_WS_API_URL}patient/${identifier}?v=full&lang=${localStorage.getItem("i18nextLng")}`, { method: 'GET' });
    }
    return Promise.resolve(null);
}

export async function getPatient(query) {
    const data = await openmrsFetch(
        `${BASE_WS_API_URL}patient?v=full&q=${query}&limit=1`,
        {
            method: "GET",
        }
    );
    return data?.data?.results[0];
}
export async function addPatientIdentifier(abortController: AbortController, patientUuid: string, uuid: string, identifier: PatientIdentifier) {
    await openmrsFetch(`${BASE_WS_API_URL}patient/${patientUuid}/identifier/${uuid == null ? "" : uuid}`, {
        method: 'POST',
        body: identifier,
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal
    });
}