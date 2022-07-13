import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../input/basic-input/input/input.component';
import styles from '../field.scss';

interface CodeFieldProps {
  nif: string;
}

export const NIFfield: React.FC<CodeFieldProps> = ({ nif }) => {
  if (nif == undefined)
    nif = "0000000000"
  return (
    <>
      <Input
        className={styles.margin_field}
        id="identifier"
        name="identifier"
        labelText={"code"}
        light={true}
        placeholder={"NIF: " + nif}
        hideLabel={true}
        disabled={true}
      />
    </>
  );
};
