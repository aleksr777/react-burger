import appPageStyles from './app-page.module.css';

const AppPage = ({ children }) => {
  return (
    <div className={appPageStyles.page}>{children}</div>
  );
};

export default AppPage;