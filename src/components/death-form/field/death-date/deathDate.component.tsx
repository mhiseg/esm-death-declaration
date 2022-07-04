import React, { useContext, useState } from 'react';
import { Column, DatePicker, DatePickerInput, NumberInput, Row } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import styles from '../../field/field.scss';
import { useField } from 'formik';
import { DeathDeclarationContext } from '../../death-declaration-context';

export interface DeathDateProps {
  minDate: string;
}

export const DeathDateField: React.FC<DeathDateProps> = (props) => {
  const today: Date = new Date();
  const [field, meta, helpers] = useField("deathDate");
  const { t } = useTranslation();
  const { setFieldValue, time, date } = useContext(DeathDeclarationContext);
  const { setValue } = helpers;
  const hours= time.split(":")[0];
  const minutes=time.split(":")[1];

  const handleChange = (date) => {
    setFieldValue("deathDate",date);
    if (!(date == 'Invalid Date') && date!="" && time) {
      console.log(date);
      const dateValue = new Date(date);
        dateValue?.setHours(parseInt(hours));
        dateValue?.setMinutes(parseInt(minutes));
      setFieldValue("deathDate",dateValue)
    }
    if(date!="" && !time)
    setFieldValue("deathDate",date);
  }


  return (
    <>
      <DatePicker
        className={styles.margin_field}
        maxDate={today}
        minDate={props.minDate}
        datePickerType="single"
        locale="fr"
        dateFormat="d/m/Y"
        light={true}
        value={field.value || ""}
        onChange={date => {
          handleChange(date)
        }}
      >
        <DatePickerInput
          id="date-picker-simple"
          labelText="Date Picker label"
          hideLabel={true}
          placeholder="dd/mm/yyyy *"
          size="md"
          invalid={!!(meta.error)}
          invalidText={t("messageErrorDeathDate", meta.error)}
        />
      </DatePicker>
    </>
  );
};

