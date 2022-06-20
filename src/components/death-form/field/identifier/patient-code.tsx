import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../input/basic-input/input/input.component';
import styles from '../field.scss';

interface CodeFieldProps {
  code: string;
}

export const CodeField: React.FC<CodeFieldProps> = ({ code }) => {
  if (code == undefined)
    code = "00000000000000000"
  return (
    <>
      <Input
        className={styles.margin_field}
        id="code"
        name="code"
        labelText={"code"}
        light={true}
        placeholder={"Code: " + code}
        hideLabel={true}
        disabled={true}
      />
    </>
  );
};
