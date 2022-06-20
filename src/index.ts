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
 
   defineConfigSchema(moduleName, configSchema);
 
   return {
     pages: [
       {
         load: getAsyncLifecycle(() => import("./death-declaration-component"), options),
         route: "death/declaration",
       },
     ]
   };
 }
 
 export {importTranslation, setupOpenMRS };
 