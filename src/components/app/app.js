import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';

class App extends React.Component {
  render() {
    return (
      <div className={appStyles.app}>
        <AppHeader></AppHeader>
        <AppMain></AppMain>
      </div>
    )
  }
}

export default App; 