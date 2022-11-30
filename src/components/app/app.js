import React from 'react';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppHeader></AppHeader>
        <AppMain />
      </div>
    )
  }
}

export default App; 