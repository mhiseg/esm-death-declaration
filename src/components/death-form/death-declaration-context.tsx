import { TimePicker } from 'carbon-components-react';
import { createContext, SetStateAction, useContext } from 'react';


export interface DeathDeclarationContext {
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  date: Date;
  time: string;
}

export const DeathDeclarationContext = createContext<DeathDeclarationContext | undefined>(undefined);