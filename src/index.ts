 import { getAsyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";
 import { configSchema } from "./config-schema";

 const importTranslation = require.context(
   "../translations",
   false,
   /.json$/,
   "lazy"
 );

 function setupOpenMRS() {
   const moduleName = "@mhiseg/esm-death-declaration-app";
 
   const options = {
     featureName: "declaration",
     moduleName,
   };
 
 
   return {
     pages: [
       {
         load: getAsyncLifecycle(() => import("./root.component"), options),
         route: "death/declare/patient",
       },
     ]
   };
 }
 
 export {importTranslation, setupOpenMRS };
 