import React, { useState } from "react";
import styles from "./form.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import FieldForm from "./field/field-component";



const DeathFormRegistry = () => {
    const { t } = useTranslation();



    const [initialV, setInitiatV] = useState({
        confirmation: "",
        cause: "",
        deathDate: "",
        deathPlace: "",
        infoSource: "",
        observation: "",
    });

    const deathSchema = Yup.object().shape({
        confirmation: Yup.string(),
        cause: Yup.string(),
        deathDate: Yup.string(),
        infoSource: Yup.string(),
        observation: Yup.object(),
    })


    return (
        <Formik
            initialValues={initialV}
            validationSchema={deathSchema}
            onSubmit={()=>{""}}

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
                        <Grid fullWidth={true} className={styles.p0}>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldForm("deathPlace")}
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
                                        {FieldForm("deathCause")}
                                    </Column>
                                </Row>
                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldForm("deathDate")}
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
                                        {FieldForm("source")}
                                    </Column>
                                </Row>

                                <Row>
                                    <Column className={styles.firstColSyle} lg={6}>
                                        {FieldForm("confirmation")}
                                    </Column>
                                </Row>

                                <Row>
                                    <Column>
                                    {FieldForm("observation")}
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
                                                        Annuler
                                                    </Button>
                                                    <Button
                                                        className={styles.buttonStyle1}
                                                        kind="tertiary"
                                                        type="submit"
                                                        size="sm"
                                                        isSelected={true}
                                                        disabled={!(dirty && isValid)}
                                                    >
                                                        Enregistrer
                                                    </Button>
                                                </div>
                                            </Column>
                                        </Row>
                                    </Column>
                                </Row>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default DeathFormRegistry;