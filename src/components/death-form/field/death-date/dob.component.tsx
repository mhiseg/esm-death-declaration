import React, { useContext, useState } from 'react';
import { Column,  DatePicker, DatePickerInput, NumberInput, Row } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import styles from '../../field/field.scss';
import { useField } from 'formik';



const today: Date = new Date();

export const DeathDateField: React.FC = () => {
  return (
    <Row className={styles.margin_field}>
      <Column>
        <DatePicker
          className=""
          maxDate={today}
          datePickerType="single"
          locale="fr"
          dateFormat="d/m/Y"
          light={true}
          // onChange={onDateChange}
          // value={dob.birthdate}
          
        >
          <DatePickerInput
            id="birthdate"
            labelText="Date Picker label"
            hideLabel={true}
            placeholder={"dd/mm/yyyy"+" *"}
            size="md"
            // invalid={!!(birthdateMeta.error)}
            // invalidText={t(birthdateMeta.error)}
          />
        </DatePicker>
      </Column>
    </Row>
  );
};

