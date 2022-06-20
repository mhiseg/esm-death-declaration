import React from "react";
import { useTranslation } from "react-i18next";
import DeathFormRegistry from "./components/death-form/death-form-registry";


const PatientRegistration: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <h4 className={`title-page`}>{t('declareDeathTitle', 'Declare a death')}</h4>
            <div className={`mhiseg-main-content `}>
                <DeathFormRegistry />
            </div>
        </>
    );
};
export default PatientRegistration;



