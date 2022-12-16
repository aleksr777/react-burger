import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import Modal from '../modal/modal';
import { AppHeader } from '../app-header/app-header';
import { AppMain } from '../app-main/app-main';
import { apiConfig } from '../../constants/constants.js';
import { getIngredientsData } from '../../utils/api.js';
import { IngredientsContext } from '../../context/ingredients-context.jsx';
import { PopupContext } from '../../context/popup-context.jsx';

const App = () => {

  const [popupContent, setPopupContent] = useState();

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

  const [isVisible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  }

  const handleCloseModal = () => {
    setVisible(false);
    setPopupContent(null);
  }

  return (
    <div className={appStyles.app}>

      <AppHeader />

      {(ingredientsData.fillings[0] && ingredientsData.sauces[0] && ingredientsData.buns[0]) ? (
      <IngredientsContext.Provider value={{ ingredientsData }}>
          <PopupContext.Provider value={{ handleOpenModal, setPopupContent }}>
          <AppMain/>
        </PopupContext.Provider>
      </IngredientsContext.Provider>
      ) : null}

      {isVisible ? (
        <Modal handleCloseModal={handleCloseModal}> {popupContent} </Modal>
      ) : null}

    </div>
  )
};

export default App;