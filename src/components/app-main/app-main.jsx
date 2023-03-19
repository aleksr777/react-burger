import appMainStyles from './app-main.module.css';

const AppMainBlock = ({ children }) => {
  return (
    <main className={appMainStyles.main}>{children}</main>
  );
};

export default AppMainBlock;