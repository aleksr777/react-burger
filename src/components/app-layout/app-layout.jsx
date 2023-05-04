import stylesAppLayout from './app-layout.module.css';
import { Outlet } from 'react-router-dom';
import AppHeader from '../app-header/app-header';

const AppLayout = () => {
  return (
    <div className={stylesAppLayout.wrapper}>
      <AppHeader />
      <main className={stylesAppLayout.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;