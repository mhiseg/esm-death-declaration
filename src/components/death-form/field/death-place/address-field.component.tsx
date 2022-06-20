import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../input/basic-input/input/input.component';
import styles from '../field.scss';


export const DeathPlaceField: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        id="deathPlace"
        name="deathPlace"
        labelText={t('deathPlaceLabelText', 'Le lieu du décès')}
        light={true}
        placeholder={t('deathPlaceLabelText', 'Le lieu du décès')}
        hideLabel={true}
      />
    </>
  );
};
