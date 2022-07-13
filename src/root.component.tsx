import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DeathDeclation from './death-declaration-component';


const RootComponent: React.FC = () => {
  return (
    <BrowserRouter basename={`${window.spaBase}/death/declare/patient`}>
      <Route exact path="/:patientUuid">
        <DeathDeclation />
      </Route>
      <Route exact path="/">
        <DeathDeclation />
      </Route>
    </BrowserRouter>
  );
};

export default RootComponent;
