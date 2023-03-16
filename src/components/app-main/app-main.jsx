import appMainStyles from './app-main.module.css';

const AppMain = ({ children }) => {
  return (
    <main className={appMainStyles.main}>{children}</main>
  );
};

export default AppMain;