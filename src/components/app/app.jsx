import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import Modal, { modalRootElement } from '../modal/modal';
import { AppHeader } from '../app-header/app-header';
import { AppMain } from '../app-main/app-main';
import { apiConfig } from '../../constants/constants.js';
import { getIngredientsData } from '../../utils/api.js';

const App = () => {

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

  /*   const [modal, setModal] = useState({
      modal1: false,
      modal2: false,
      modal3: false
    }); */

  const [isVisible, setVisible] = useState(false);

  function handleEsc(e) {
    if (e.key === 'Escape') {
      handleCloseModal()
    }
  }

  function handleOpenModal() {
    document.addEventListener('keydown', handleEsc);
    setVisible(true);
  }

  function handleCloseModal() {
    document.removeEventListener('keydown', handleEsc);
    setVisible(false);
  }

  return (
    <div className={appStyles.app}>

      <button onClick={handleOpenModal} type="button"> Открыть окно 1</button>

      <AppHeader />

      <AppMain ingredientsData={ingredientsData} />

      <Modal visible={isVisible} onClose={handleCloseModal} >
        <p>Первое окно</p>
      </Modal>

    </div>
  )
};

export default App;