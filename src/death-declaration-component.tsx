import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { deathValidated } from "./components/constants";
import DeathFormRegistry from "./components/death-form/death-form-registry";
import { usePatient } from "./components/usePatient";


const DeathDeclation: React.FC = () => {
    const { t } = useTranslation();
    const param: {
        patientUuid?: string
    } = useParams();
    const { isLoading: isLoadingPatientToEdit, patient: patientSearch } = usePatient(param?.patientUuid);

    const to: NavigateOptions = { to: window.spaBase + "/death/search" };

    const toSearchPatient = (patient) => {
        const isValidate = patient.person?.attributes.find((attribute) => attribute.attributeType.uuid === deathValidated);
        if (patient.uuid === undefined || isValidate)
            navigate(to);
    }

    const getFormPatient = () => {
        toSearchPatient(patientSearch.data)
        return (
            <>
                <h4 className={`title-page`}>{t('declareDeathTitle', 'Declare a death')}</h4>
                <div className={`mhiseg-main-content `}>
                    <DeathFormRegistry patient={patientSearch.data} />
                </div>
            </>
        );
    }
    return <> {isLoadingPatientToEdit === false && getFormPatient()} </>

};
export default DeathDeclation;


