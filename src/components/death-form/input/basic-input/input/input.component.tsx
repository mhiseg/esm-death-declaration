import React, { useContext } from 'react';
import TextInput from 'carbon-components-react/es/components/TextInput';
import { useField } from 'formik';
import styles from "../../../input/input.scss";
import { useTranslation } from 'react-i18next';
import { DeathDeclarationContext } from '../../../death-declaration-context';

interface InputProps {
  id: string;
  name: string;
  labelText: string;
  light: boolean;
  disabled?: boolean;
  placeholder?: string;
  hideLabel?: boolean;
  className?: string;
  type?: string;
}


export const Input: React.FC<InputProps> = props => {
  const [field, meta] = useField(props.name);
  const { t } = useTranslation();
  const { setFieldValue,date} = useContext(DeathDeclarationContext);

  const handleBlur= (e,type,dateValue)=>{
    if(e.target.value && type=='time' && !(dateValue=='Invalid Date')){
      const newDate = (dateValue?.toISOString()).split("T")[0]+' '+ e.target.value;
      setFieldValue('deathDate',new Date(newDate));
    }
  }

  return (
    <div>
      <TextInput
      type={props.type}
        {...props}
        {...field}
        invalid={!!(meta.error)}
        invalidText={t(meta.error)}
        value={field.value || ''}
        size="lg"
        onBlur= {e=>handleBlur(e,props.type,date)}
      />
    </div>
  );
};
