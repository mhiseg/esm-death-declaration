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
import { deathValidated, originCauseUuid, secondaryCauseUuid } from "../constants";

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

    console.log(patient.identifiers[0], '====================')


    const [initialV, setInitiatV] = useState({
        codePatient: patient.identifiers[0].identifier,
        identifier: patient.identifiers[1]?.display || '',
        familyName: patient.person.preferredName.familyName,
        givenName: patient.person.preferredName.givenName,
        uuid: patient.uuid,
        cause: "",
        deathDate: "",
        deathPlace: "",
        secondaryCause: "",
        origin: "",
    });

    const deathSchema = Yup.object().shape({
        cause: Yup.string().required("Vous devriez fournir une cause pour la mort"),
        deathDate: Yup.date().required("Vous devriez fournir une date pour la mort"),
        secondaryCause: Yup.string(),
        terciaryCause: Yup.string(),
    })

    const declareDeath = (values) => {
        let person = {
            dead: true,
            deathDate: new Date(values.deathDate).toISOString(),
            causeOfDeath: values.cause,
            attributes: []
        }
        if (values.originCause) {
            person.attributes.push({ attributeType: originCauseUuid, value: values.originCause })
        }
        if (!values.originCause && values.secondaryCause) {
            person.attributes.push({ attributeType: originCauseUuid, value: values.originCause })

        } else if (values.originCause && values.secondaryCause) {
            person.attributes.push({ attributeType: secondaryCauseUuid, value: values.secondaryCause })
        }
        killPatient(abortController, values.uuid, person).then(res =>
            showToast({
                title: t('successfullyKill', 'Successfully kill'),
                kind: 'success',
                description: 'Patient kill succesfully',
            })
        ).catch(error => showToast({ description: error.message }))
    }

    return (
        <Formik
            initialValues={initialV}
            validationSchema={deathSchema}
            onSubmit={(values, { resetForm }) => {
                console.log(values)
                declareDeath(values)
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
                                        <p>{t("codePatient") + ' : ' + values.codePatient}</p>
                                    </Column>
                                    {
                                        values.identifier &&
                                        <Column className={styles.secondColStyle} lg={6}>
                                            <p className={`${styles.ml},${styles.ml}`}>{t("identifier") + ' : ' + values.identifier}</p>
                                        </Column>
                                    }
                                </Row>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        <p className={styles.mt}>{t("givenNameLabelText") + ' : ' + values.givenName}</p>
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
                                        <p className={styles.mt}>{t("familyNameLabelText") + ' : ' + values.familyName}</p>
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
                                    <Column className={styles.firstColSyle}>
                                        {FieldForm("observation-1")}
                                    </Column>
                                    <Column className={styles.secondColStyle}>
                                        {FieldForm("observation-2")}
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