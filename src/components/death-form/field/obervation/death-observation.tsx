import { TextArea } from 'carbon-components-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../field.scss';


export const DeathObsField: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.margin_field}>
            <TextArea
                //placeholder="Observation "
                labelText="Observation "
                helperText="Some observations about the patient death"
                cols={50}
                rows={4}
                id="text-area-1"
            />
        </div>
    );
};
