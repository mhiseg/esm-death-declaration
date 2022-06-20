import React, { useState } from "react";
import styles from "./form.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import FieldForm from "./field/field-component";
import { DeathDeclarationContext } from "./death-declaration-context";
import { Person, showToast } from "@openmrs/esm-framework";
import { killPatient } from "../patient-ressources";


interface PatientIdentifier {
    uuid?: string;
    identifier: string;
    identifierType: string | any;
    location?: string;
    preferred?: boolean;
}

type Patient = {
    uuid?: string;
    identifiers: Array<PatientIdentifier>;
    person: Person;
    voided?: boolean;
}

export interface DeathFormProps {
    patient: any;
}

const DeathFormRegistry: React.FC<DeathFormProps> = ({ patient }) => {
    const { t } = useTranslation();
    const abortController = new AbortController();

    console.log(patient, '====================')


    const [initialV, setInitiatV] = useState({
        codePatient: patient.identifier[0].value,
        identifier: patient.identifier[1]?.value || '',
        familyName: patient.name[0].family,
        givenName: patient.name[0].given,
        uuid: patient.id,
        cause: "",
        deathDate: "",
        deathPlace: "",
        secondaryCause: "",
        terciaryCause: "",
    });

    const deathSchema = Yup.object().shape({
        cause: Yup.string().required("Vous devriez fournir une cause pour la mort"),
        deathDate: Yup.date().required("Vous devriez fournir une date pour la mort"),
        secondaryCause: Yup.string(),
        terciaryCause: Yup.string(),
    })


    return (
        <Formik
            initialValues={initialV}
            validationSchema={deathSchema}
            onSubmit={(values, { resetForm }) => {
                console.log(values)
                killPatient(abortController, values.uuid, new Date(values.deathDate), values.cause).then(res =>
                    showToast({
                        title: t('successfullyAdded', 'Successfully added'),
                        kind: 'success',
                        description: 'Patient save succesfully',
                    })
                ).catch(error => showToast({ description: error.message }))
                resetForm();
            }}

        >
            {(formik) => {
                const {
                    values,
                    handleSubmit,
                    errors,
                    touched,
                    setFieldValue,
                    isValid,
                    dirty,
                } = formik;
                return (
                    <Form name="form" className={styles.cardForm} onSubmit={handleSubmit}>
                        <DeathDeclarationContext.Provider value={{ setFieldValue: setFieldValue }}>
                            <Grid fullWidth={true} className={styles.p0}>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        <label>{t("NumberPatient") + '  ' + values.codePatient}</label>
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
                                        <label>{t("IdentifierPatient") + '  ' + values.identifier}</label>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        <label>{t("FamilyName") + '  ' + values.familyName}</label>
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
                                        <label>{t("GivenName") + '  ' + values.givenName}</label>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldForm("deathPlace")}
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
                                        {FieldForm("deathDate")}
                                    </Column>
                                </Row>

                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldForm("deathCause")}
                                    </Column>
                                </Row>

                                <Row>
                                    <Column>
                                        {FieldForm("observation-2")}
                                    </Column>
                                    <Column>
                                        {FieldForm("observation-3")}
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <Row>
                                            <Column className={styles.marginTop} lg={12} >
                                                <div className={styles.flexEnd}>
                                                    <Button
                                                        className={styles.buttonStyle}
                                                        kind="danger--tertiary"
                                                        type="reset"
                                                        size="sm"
                                                        isSelected={true}
                                                    >

                                                        {t("cancelButton", "Annuler")}
                                                    </Button>
                                                    <Button
                                                        className={styles.buttonStyle1}
                                                        kind="tertiary"
                                                        type="submit"
                                                        size="sm"
                                                        isSelected={true}
                                                        disabled={!(dirty && isValid)}
                                                    >
                                                        {t("confirmButton", "Enregistrer")}
                                                    </Button>
                                                </div>
                                            </Column>
                                        </Row>
                                    </Column>
                                </Row>
                            </Grid>
                        </DeathDeclarationContext.Provider>
                    </Form>
                );
            }}
        </Formik >
    );
}

export default DeathFormRegistry;