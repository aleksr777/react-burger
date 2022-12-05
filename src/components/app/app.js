import React from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { AppMain } from '../app-main/app-main';

export const App = () => {
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <AppMain />
    </div>
  )
}; 