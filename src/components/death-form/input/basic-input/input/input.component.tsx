import React, { useContext, useEffect, useState } from 'react';
import TextInput from 'carbon-components-react/es/components/TextInput';
import { useField } from 'formik';
import styles from "../../../input/input.scss";
import { useTranslation } from 'react-i18next';
import { DeathDeclarationContext } from '../../../death-declaration-context';
import { formatPatient, getPatient } from '../../../../patient-ressources';

interface InputProps {
  id: string;
  name: string;
  labelText: string;
  light: boolean;
  disabled?: boolean;
  placeholder?: string;
  hideLabel?: boolean;
  className?: string;
  type?: string;
}


export const Input: React.FC<InputProps> = props => {
  const [field, meta, helpers] = useField(props.name);
  const { setValue } = helpers;
  const { t } = useTranslation();
  const { setFieldValue, date, setInitialV } = useContext(DeathDeclarationContext);

  const handleBlur = (e, type, dateValue) => {
    if (e.target.value && type == 'time' && !(dateValue == 'Invalid Date')) {
      const newDate = (dateValue?.toISOString()).split("T")[0] + ' ' + e.target.value;
      setFieldValue('deathDate', new Date(newDate));
    }


    if (e.target.value && type == 'codePatient') {
      getPatient(e.target.value).then((res) => {
        setInitialV(formatPatient(res));
        setValue(meta.initialValue);
      });
    }
  }


  return (
    <div>
      <TextInput
        type={props.type}
        {...props}
        {...field}
        invalid={!!(meta.error)}
        invalidText={t(meta.error)}
        size="lg"
        onBlur={e => handleBlur(e, props.type, date)}
      />
    </div>
  );
};
