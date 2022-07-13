import React, { useState } from "react";
import styles from "./form.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import FieldForm from "./field/field-component";
import { DeathDeclarationContext } from "./death-declaration-context";
import { Person, showToast } from "@openmrs/esm-framework";
import { formatPatient, killPatient } from "../patient-ressources";
import { originCauseUuid, secondaryCauseUuid } from "../constants";
import { useParams } from "react-router-dom";

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
    const param: { patientUuid?: string } = useParams();
    const { t } = useTranslation();

    const abortController = new AbortController();
    const [initialV, setInitialValue] = useState(formatPatient(patient));

    const deathSchema = Yup.object().shape({
        codePatient: Yup.string(),
        identifier: Yup.string(),
        familyName: Yup.string(),
        givenName: Yup.string(),
        cause: Yup.string().required("Vous devriez fournir une cause pour la mort"),
        deathDate: Yup.date().required("messageErrorDeathDate"),
        secondaryCause: Yup.string(),
        terciaryCause: Yup.string(),
        deathTime: Yup.string(),
    }).test("valide deathTime ", (value, { createError }) => {
        if (!value.deathDate && value.deathTime) {
            return createError({
                path: 'deathDate',
                message: ("messageErrorDeathDate"),
            });
        }
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
            enableReinitialize
            initialValues={initialV}
            validationSchema={deathSchema}
            onSubmit={(values, { resetForm }) => {
                console.log(values)
                // declareDeath(values)
                resetForm();
            }}
        >
            {(formik) => {
                const {
                    values,
                    handleSubmit,
                    setFieldValue,
                    isValid,
                    dirty,
                } = formik;
                return (
                    <Form name="form" className={styles.cardForm} onSubmit={handleSubmit}>
                        <DeathDeclarationContext.Provider value={{
                            setFieldValue: setFieldValue,
                            date: new Date(values.deathDate), time: values.deathTime, setInitialV: setInitialValue, formState: param
                        }}>
                            <Grid fullWidth={true} className={styles.p0}>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldForm("givenName")}
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
                                        {FieldForm("familyName")}
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldForm("code",values.codePatient)}
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
                                        {FieldForm("nif")}
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldForm("deathDate")}
                                    </Column>
                                    <Column className={styles.secondColSyle} lg={6}>
                                        {FieldForm("deathTime")}
                                    </Column>
                                </Row>

                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldForm("deathPlace")}
                                    </Column>
                                    <Column className={styles.secondColSyle} lg={6}>
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