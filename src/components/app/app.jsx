import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import { apiConfig } from '../../constants/constants';
import { getIngredientsData } from '../../utils/api';
import { IngredientsContext } from '../../context/ingredients-context';

const App = () => {

  // Cтейт для данных, полученныx с сервера
  const [ingredientsData, setIngredientsData] = useState({
    fillings: [],
    sauces: [],
    buns: []
  });

  useEffect(() => {
    getIngredientsData(apiConfig)
      .then(res => {
        /* сортируем данные с сервера*/
        let fillingsData = [];
        let saucesData = [];
        let bunsData = [];
        res.data.map((obj) => {
          if (obj.type === 'main') { fillingsData.push(obj) }
          else if (obj.type === 'sauce') { saucesData.push(obj) }
          else if (obj.type === 'bun') { bunsData.push(obj) }
        });
        setIngredientsData({
          fillings: fillingsData,
          sauces: saucesData,
          buns: bunsData
        });
      })
      .catch(err => { console.log(err) })
  }, []);

  return (
    <div className={appStyles.app}>

      <AppHeader />

      {(ingredientsData.fillings[0] && ingredientsData.sauces[0] && ingredientsData.buns[0])
        ? (<IngredientsContext.Provider value={{ ingredientsData }}>
          <AppMain />
        </IngredientsContext.Provider>)
        : null}

    </div>
  )
};

export default App;