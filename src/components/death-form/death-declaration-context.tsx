import { createContext} from 'react';


export interface DeathDeclarationContext {
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  date: Date;
  time: string;
  setInitialV:any;
  formState: any;
}

export const DeathDeclarationContext = createContext<DeathDeclarationContext | undefined>(undefined);