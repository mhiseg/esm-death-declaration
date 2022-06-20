import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import styles from '../field.scss';




export const DeathCauseField: React.FC = () => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState("");


  return (
    <>
      <SelectCustom
        options={["projectile", "crise cardiaque", "Covid"]}
        label={t('Select') + ' ' + question}
        name="deathCause"
      />
    </>
  );

};