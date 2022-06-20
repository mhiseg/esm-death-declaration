import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { causeOfDeathConcept } from "../../../constants";
import { fetchConceptByUuid, getConceptAnswer, getSynchronizedCurrentUser } from "../../../patient-ressources";
import { SelectInput } from "../../input/basic-input/select/select-input.component";
import { SelectCustom } from "../../input/custom-input/custom-select/custom-selected-component";
import styles from '../field.scss';




export const DeathCauseField: React.FC = () => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState("");
  
  useEffect(() => {
    const currentUserSub = getSynchronizedCurrentUser({ includeAuthStatus: true }).subscribe(async user => {
      await fetchConceptByUuid(causeOfDeathConcept, localStorage.getItem("i18nextLng")).then(res => {
        setAnswers(getConceptAnswer(res.data,setQuestion))
      })
    });

    return () => {
      currentUserSub;
    };
  }, []);
  return (
    <>
      <SelectCustom
        className={styles.margin_field}
        options={[...answers]}
        label={t('Select') + ' ' + question}
        name="cause"
      />
    </>
  );
};