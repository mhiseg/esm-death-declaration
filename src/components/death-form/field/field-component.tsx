import React from 'react';
import { Unknow } from '../input/custom-input/unknow-format-component';
import { DeathConfirmationField } from './confirmation-cause/death-confirmation';
import { DeathCauseField } from './death-cause/death-cause';
import { DeathDateField } from './death-date/dob.component';
import { DeathPlaceField } from './death-place/address-field.component';
import styles from './field/field.scss';
import { InformationSourceField } from './info-source/information-source';
import { DeathObsField } from './obervation/death-observation';




const FieldForm = (name: string, value?) => {
  switch (name) {  
    case 'deathPlace':
      return <DeathPlaceField />;
    case 'deathCause':
      return <DeathCauseField/>;
    case 'deathDate':
      return <DeathDateField />;
    case 'source':
      return <InformationSourceField/>;
    case 'observation':
      return <DeathObsField/>;
    case 'confirmation':
      return <DeathConfirmationField/>;
     default:
      return <Unknow />;
  }
}

export default FieldForm;
