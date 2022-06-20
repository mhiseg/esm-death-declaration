import React from 'react';
import { Unknow } from '../input/custom-input/unknow-format-component';
import { DeathCauseField } from './death-cause/death-cause';
import { DeathDateField } from './death-date/deathDate.component';
import { DeathPlaceField } from './death-place/address-field.component';
import { CodeField } from './identifier/patient-code';
import { NIFfield } from './identifier/patient-nif';
import { FamilyNameField } from './name/familyname-field.component';
import { GivenNameField } from './name/givenname-field.component';
import { SecondaryCauseField } from './death-cause/secondary-cause';
import { TerciaryCauseField } from './death-cause/terciary-cause';




const FieldForm = (name: string, value?, methode?) => {
  switch (name) {
    case 'nif':
      return <NIFfield nif={value}/>;
    case 'code':
      return <CodeField code={value}/>;
    case 'givenName':
      return <GivenNameField  name={name}/>;
    case 'familyName':
      return <FamilyNameField name={name}/>; 
    case 'deathPlace':
      return <DeathPlaceField />;
    case 'deathCause':
      return <DeathCauseField/>;
    case 'deathDate':
      return <DeathDateField minDate = {value} />
    case 'observation-2':
      return <SecondaryCauseField />;
    case 'observation-3':
      return <TerciaryCauseField />;
     default:
      return <Unknow />;
  }
}

export default FieldForm;
