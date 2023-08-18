import React from "react";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css";
import {
  RequestStatusEnum,
  makeRequestIngredients
} from "../../utils/api";
import { ingredientListCreator } from "../../utils/helper";
import { IngredientsDataContext } from "../../services/ingredients-data-context";

function App() {
  const [ingredientsData, setIngredientsData] = React.useState({ requestStatus: RequestStatusEnum.Loading })

  React.useEffect(() => {
    const makeRequest = async () => {
      try {
        setIngredientsData(await makeRequestIngredients());
      } catch (e) {
        console.error(e);
        setIngredientsData({ requestStatus: RequestStatusEnum.Failed });
      }
    }
    makeRequest();
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        {
          ingredientsData.requestStatus === RequestStatusEnum.Success
          &&
          <>
            <BurgerIngredients ingredientsData={ingredientsData.body.data} />
            {/* TODO: Использую randomGenerator для случайного создания списка ингредиентов в конструкторе бургера */}
            <IngredientsDataContext.Provider value={{ ingredientsData: ingredientListCreator(ingredientsData.body.data) }}>
              <BurgerConstructor />
            </IngredientsDataContext.Provider>
          </>
        }
        {
          ingredientsData.requestStatus === RequestStatusEnum.Loading
          &&
          <div className={appStyles.messageError}>
            <span className="text_type_main-default">{"Загрузка космических ингредиентов..."}</span>
          </div>

        }
        {
          ingredientsData.requestStatus === RequestStatusEnum.Failed
          && <div className={appStyles.messageError}>
            <span className="text_type_main-default">{"Ошибка загрузки космических ингредиентов :( "}</span>
          </div>
        }
      </main>
    </div>
  );
}

export default App;
