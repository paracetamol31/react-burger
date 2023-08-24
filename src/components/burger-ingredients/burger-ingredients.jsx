import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useRef } from "react";

import IngredientsSection from "../ingredients-section/ingredients-section";
import TabsPanel from "../tabs-panel/tabs-panel";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { CLOSE_INGREDIENT_MODAL } from "../../services/actions/modal";
import { SET_CATEGORY_INGREDIENTS } from "../../services/actions/ingredients";

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

    const refCategoryBun = useRef();
    const refCategoryMain = useRef();
    const refCategorySauce = useRef();
    const refScrollBar = useRef();

    const onScroll = useCallback(() => {
        if (Math.abs(refScrollBar.current.scrollTop - refCategoryBun.current.offsetTop)
            < Math.abs(refScrollBar.current.scrollTop - refCategoryMain.current.offsetTop)) {
            dispatch({ type: SET_CATEGORY_INGREDIENTS, value: 0 })
        } else if (Math.abs(refScrollBar.current.scrollTop - refCategoryMain.current.offsetTop)
            < Math.abs(refScrollBar.current.scrollTop - refCategorySauce.current.offsetTop)) {
            dispatch({ type: SET_CATEGORY_INGREDIENTS, value: 1 })
        } else {
            dispatch({ type: SET_CATEGORY_INGREDIENTS, value: 2 })
        }
    }, [dispatch]);

    return (
        <section className={burgerIngredientsStyles.burgerIngredients}>
            <header className="mt-10 mb-5">
                <span className="text text_type_main-large">Соберите бургер</span>
            </header>
            <TabsPanel
                tabsInfo={tabsInfo}
            />
            {/* TODO: Принял во внимание замечания по функциональности scrollBar, реализую его в ветке sprint-2/step-2 */}
            <div ref={refScrollBar} onScroll={onScroll} className={`${burgerIngredientsStyles.scrollBar} pr-4 pl-4`}>
                <IngredientsSection sectionRef={refCategoryBun} categoryName="Булки" type="bun" />
                <IngredientsSection sectionRef={refCategoryMain} categoryName="Соусы" type="sauce" />
                <IngredientsSection sectionRef={refCategorySauce} categoryName="Начинки" type="main" />
            </div>
            {(currentIngredient && isShowIngredientModal)
                && <Modal closeModal={closeModal} label={"Детали ингредиента"}>
                    <IngredientDetails />
                </Modal>}
        </section>
    )
}

export default BurgerIngredients;