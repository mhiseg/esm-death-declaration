import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import styles from '../field.scss';




export const InformationSourceField: React.FC = () => {
    const { t } = useTranslation();
    const [answers, setAnswers] = useState([])
    const [question, setQuestion] = useState("");
  
  
    return (
      <>
        <SelectCustom
          className={styles.margin_field}
          options={["Famille","Pompw funebre","Police","Autre"]}
          label={t('Select') + ' ' + question}
          name="informationSource"
        />
      </>
    );
  
  };