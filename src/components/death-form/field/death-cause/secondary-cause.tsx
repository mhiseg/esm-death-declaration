import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextAreaInput } from '../../input/basic-input/obervation/death-observation';
import styles from '../field.scss';


export const SecondaryCauseField: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.margin_field}>
            <TextAreaInput
                id="secondaryCause"
                name= "secondaryCause"
                labelText={t("secondaryCauseLabelText","Secondary cause")}
            />
        </div>
    );
};
