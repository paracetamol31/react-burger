import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import constructorPageStyles from "./construcror-page.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import {
    setCurrentMenuHeader,
    burgerConstructor
} from "../../services/actions/header";
import { applayIngredients } from "../../services/actions/ingredients";

export const ConstructorPage = () => {
    const dispatch = useDispatch();
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);
    
    useEffect(() => {
        dispatch(setCurrentMenuHeader(burgerConstructor));
        !ingredients && dispatch(applayIngredients());
    }, [dispatch, ingredients])

    return (
        <>
            {
                (!ingredientsRequest && !ingredientsFailed && ingredients)
                &&
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>

            }
            {
                ingredientsRequest
                &&
                <div className={constructorPageStyles.messageError}>
                    <span className="text_type_main-default">{"Загрузка космических ингредиентов..."}</span>
                </div>

            }
            {
                ingredientsFailed
                && <div className={constructorPageStyles.messageError}>
                    <span className="text_type_main-default">{"Ошибка загрузки космических ингредиентов :( "}</span>
                </div>
            }
        </>
    );
}