import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import styles from '../field.scss';




export const DeathCauseField: React.FC = () => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState("");


  return (
    <>
      <SelectInput
        className={styles.margin_field}
        options={["projectile", "crise cardiaque", "Covid"]}
        label={t('Select') + ' ' + question}
        name="cause"
      />
    </>
  );

};