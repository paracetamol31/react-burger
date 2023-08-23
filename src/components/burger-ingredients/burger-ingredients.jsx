import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from "react";

import IngredientsSection from "../ingredients-section/ingredients-section";
import TabsPanel from "../tabs-panel/tabs-panel";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { CLOSE_INGREDIENT_MODAL } from "../../services/actions/modal";

const tabsInfo = [
    {
        label: "Булки",
        id: 0
    },
    {
        label: "Соусы",
        id: 1
    },
    {
        label: "Начинки",
        id: 2
    }
];

const BurgerIngredients = () => {
    const { isShowIngredientModal } = useSelector(state => state.modal);
    const { currentIngredient } = useSelector(state => state.ingredients);
    const dispatch = useDispatch()
    const closeModal = useCallback(() => {
        dispatch({ type: CLOSE_INGREDIENT_MODAL })
    }, [dispatch]);

    return (
        <section className={burgerIngredientsStyles.burgerIngredients}>
            <header className="mt-10 mb-5">
                <span className="text text_type_main-large">Соберите бургер</span>
            </header>
            <TabsPanel
                tabsInfo={tabsInfo}
                currentId={0}
            />
            {/* TODO: Принял во внимание замечания по функциональности scrollBar, реализую его в ветке sprint-2/step-2 */}
            <div className={`${burgerIngredientsStyles.scrollBar} pr-4 pl-4`}>
                <IngredientsSection categoryName="Булки" type="bun" />
                <IngredientsSection categoryName="Соусы" type="sauce" />
                <IngredientsSection categoryName="Начинки" type="main" />
            </div>
            {(currentIngredient && isShowIngredientModal)
                && <Modal closeModal={closeModal} label={"Детали ингредиента"}>
                    <IngredientDetails />
                </Modal>}
        </section>
    )
}

export default BurgerIngredients;