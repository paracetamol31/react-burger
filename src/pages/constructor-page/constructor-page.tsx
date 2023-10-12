import { FC, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import constructorPageStyles from "./constructor-page.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import {
    setCurrentMenuHeader,
    burgerConstructor
} from "../../services/actions/header";
import { useDispatch, useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";

export const ConstructorPage: FC = () => {
    const dispatch = useDispatch();
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector((state: RootState) => state.ingredients);

    useEffect(() => {
        dispatch(setCurrentMenuHeader({ currentMenuItem: burgerConstructor }));
    }, [dispatch])

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