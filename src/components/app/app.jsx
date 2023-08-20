import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css";
import { ingredientListCreator } from "../../utils/helper";
import { IngredientsDataContext } from "../../services/ingredients-data-context";
import {
  applayIngredients,
  ADD_CONSTRUCTOR_ITEM
} from "../../services/actions/index.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed, constructorIngredients } = useSelector(state => state);

  React.useEffect(() => {
    dispatch(applayIngredients());
  }, [dispatch]);

  React.useEffect(() => {
    if (constructorIngredients) {
      constructorIngredients.map(item => {
        dispatch({
          type: ADD_CONSTRUCTOR_ITEM,
          typeItem: item.type,
          idType: item._id
        })
      })
    }
  }, [constructorIngredients, dispatch])

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        {
          !ingredientsRequest && !ingredientsFailed && ingredients
          &&
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              {/* TODO: Использую randomGenerator для случайного создания списка ингредиентов в конструкторе бургера */}
              <IngredientsDataContext.Provider value={{ ingredientsData: ingredientListCreator(ingredients) }}>
                <BurgerConstructor />
              </IngredientsDataContext.Provider>
            </DndProvider>
          </>
        }
        {
          ingredientsRequest
          &&
          <div className={appStyles.messageError}>
            <span className="text_type_main-default">{"Загрузка космических ингредиентов..."}</span>
          </div>

        }
        {
          ingredientsFailed
          && <div className={appStyles.messageError}>
            <span className="text_type_main-default">{"Ошибка загрузки космических ингредиентов :( "}</span>
          </div>
        }
      </main>
    </div>
  );
}

export default App;
