import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeathDeclarationContext } from '../../death-declaration-context';
import { Input } from '../../input/basic-input/input/input.component';
import styles from '../field.scss';


export const DeathTimeField: React.FC = () => {
  const { t } = useTranslation();
  const { date } = useContext(DeathDeclarationContext);

  return (
    <>
      <Input
        className={styles.time}
        id="deathTime"
        name="deathTime"
        labelText={t('deathTimeLabelText', 'Heure du décès')}
        light={true}
        hideLabel={true}
        type="time"
      />
    </>
  );
};
