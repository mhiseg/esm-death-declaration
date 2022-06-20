import { createContext, SetStateAction, useContext } from 'react';


export interface DeathDeclarationContext {
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
}

export const DeathDeclarationContext = createContext<DeathDeclarationContext | undefined>(undefined);