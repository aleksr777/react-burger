import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import Modal from '../modal/modal';
import { AppHeader } from '../app-header/app-header';
import { AppMain } from '../app-main/app-main';
import { apiConfig } from '../../constants/constants';
import { getIngredientsData } from '../../utils/api';
import { IngredientsContext } from '../../context/ingredients-context';
import { PopupContext } from '../../context/popup-context';
import transparentPicturePath from '../../images/transparent-picture.png';

const App = () => {

  // Контент для вставки в модальное окно
  const [popupContent, setPopupContent] = useState();

  // Cтейт для данных, полученныx с сервера
  const [ingredientsData, setIngredientsData] = useState({
    fillings: [],
    sauces: [],
    buns: []
  });

  // Cтейты для выбранных ингредиентов и булки из данных с сервера
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedBun, setSelectedBun] = useState({
    image: transparentPicturePath,
    name: '',
    price: 0,
    _id: null,
    type: 'bun'
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
        <IngredientsContext.Provider value={{ ingredientsData, selectedIngredients, setSelectedIngredients, selectedBun, setSelectedBun }}>
          <PopupContext.Provider value={{ handleOpenModal, setPopupContent }}>
            <AppMain />
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