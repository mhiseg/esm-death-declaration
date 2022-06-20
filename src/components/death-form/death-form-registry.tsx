import React, { useState } from "react";
import styles from "./form.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import FieldForm from "./field/field-component";
import { DeathDeclarationContext } from "./death-declaration-context";



const DeathFormRegistry = () => {
    const { t } = useTranslation();



    const [initialV, setInitiatV] = useState({
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
            onSubmit={(values,{resetForm}) => {
                console.log(values)
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
                                        {FieldForm("nif")}
                                    </Column>
                                    <Column className={styles.secondColStyle} lg={6}>
                                        {FieldForm("code")}
                                    </Column>
                                </Row>
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