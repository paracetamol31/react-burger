import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css";
import { applayIngredients } from "../../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);

  React.useEffect(() => {
    dispatch(applayIngredients());
  }, [dispatch]);

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
                <BurgerConstructor />
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
