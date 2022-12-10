import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { AppMain } from '../app-main/app-main';
import { apiConfig } from '../../constants/constants.js';
import { getIngredientsData } from '../../utils/api.js';

export const App = () => {

  const [ingredientsData, setIngredientsData] = useState({
    fillings: [],
    sauces: [],
    buns: []
  });

  useEffect(() => {
    getIngredientsData(apiConfig)
      .then(res => {
        /* сортируем данные по типу перед передачей в props */
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
      <AppMain ingredientsData={ingredientsData} />
    </div>
  )
}; 