import React, { useContext, useState } from 'react';
import { Column, DatePicker, DatePickerInput, NumberInput, Row } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import styles from '../../field/field.scss';
import { useField } from 'formik';
import { DeathDeclarationContext } from '../../death-declaration-context';

export interface DeathDateProps{
  minDate: string;
}

export const DeathDateField: React.FC<DeathDateProps> = (props) => {
  const today: Date = new Date();
  const [field, meta] = useField("deathDate");
  const { t } = useTranslation();
  const { setFieldValue } = useContext(DeathDeclarationContext);


  return (
    <Row className={styles.margin_field}>
      <Column>
        <DatePicker
          className=""
          maxDate={today}
          minDate={props.minDate}
          datePickerType="single"
          locale="fr"
          dateFormat="d/m/Y"
          light={true}
          value={field.value || ""}
          onChange={date => setFieldValue('deathDate', date)}
        >
          <DatePickerInput
            id="date-picker-simple"
            labelText="Date Picker label"
            hideLabel={true}
            placeholder="dd/mm/yyyy *"
            size="md"
            invalid= {!!(meta.error)}
            invalidText= {t("messageErrorDeathDate",meta.error)}
          />
        </DatePicker>
      </Column>
    </Row>
  );
};

