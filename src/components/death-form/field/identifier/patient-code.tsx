import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeathDeclarationContext } from '../../death-declaration-context';
import { Input } from '../../input/basic-input/input/input.component';
import styles from '../field.scss';

interface CodeFieldProps {
  code: string;
}

export const CodeField: React.FC<CodeFieldProps> = ({ code }) => {
  const { formState } = useContext(DeathDeclarationContext);
  let state = true;
  formState.patientUuid == undefined ? state = false : state = true;
  if (code == undefined)
    code = "00000000000000000"


  return (
    <>
      <Input
        className={styles.margin_field}
        id="codePatient"
        name="codePatient"
        labelText={"code"}
        light={true}
        placeholder={"Code: " + code}
        hideLabel={true}
        disabled={state}
        type="codePatient"
      />
    </>
  );
};
