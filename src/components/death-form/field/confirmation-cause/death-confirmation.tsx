import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import styles from '../field.scss';




export const DeathConfirmationField: React.FC = () => {
    const { t } = useTranslation();
    const [answers, setAnswers] = useState([])
    const [question, setQuestion] = useState("");
  
  
    return (
      <>
        <SelectCustom
          className={styles.margin_field}
          options={["Clinique","Examen par clinique","Chirurgie","Autopsie"]}
          label={t('Select') + ' ' + question}
          name="deathConfirmation"
        />
      </>
    );
  
  };