import { navigate, NavigateOptions, usePatient } from "@openmrs/esm-framework";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import DeathFormRegistry from "./components/death-form/death-form-registry";


const DeathDeclation: React.FC = () => {
    const { t } = useTranslation();
    const param: {
        patientUuid?: string
    } = useParams();
    const { isLoading: isLoadingPatientToEdit, patient: patientSearch } = usePatient(param?.patientUuid);

    const to: NavigateOptions = { to: window.spaBase + "/death/search" };

    const toSearchPatient = (patient) => {
        if (!patient.id)
            navigate(to);
    }

    const getFormPatient = () => {
        toSearchPatient(patientSearch)
        return (
            <>
                <h4 className={`title-page`}>{t('declareDeathTitle', 'Declare a death')}</h4>
                <div className={`mhiseg-main-content `}>
                    <DeathFormRegistry patient={patientSearch} />
                </div>
            </>
        );
    }
    return <> {isLoadingPatientToEdit === false && getFormPatient()} </>

};
export default DeathDeclation;


