import { useDispatch } from 'react-redux';
import { useCallback, useRef } from "react";

import IngredientsSection from "../ingredients-section/ingredients-section";
import TabsPanel from "../tabs-panel/tabs-panel";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { setCategoryIngredients } from "../../services/actions/ingredients";

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
    const dispatch = useDispatch()

    const refCategoryBun = useRef();
    const refCategoryMain = useRef();
    const refCategorySauce = useRef();
    const refScrollBar = useRef();

    const onScroll = useCallback(() => {
        if (Math.abs(refScrollBar.current.scrollTop - refCategoryBun.current.offsetTop)
            < Math.abs(refScrollBar.current.scrollTop - refCategoryMain.current.offsetTop)) {
            dispatch(setCategoryIngredients({ value: 0 }))
        } else if (Math.abs(refScrollBar.current.scrollTop - refCategoryMain.current.offsetTop)
            < Math.abs(refScrollBar.current.scrollTop - refCategorySauce.current.offsetTop)) {
            dispatch(setCategoryIngredients({ value: 1 }))
        } else {
            dispatch(setCategoryIngredients({ value: 2 }))
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
            <div ref={refScrollBar} onScroll={onScroll} className={`${burgerIngredientsStyles.scrollBar} pr-4 pl-4`}>
                <IngredientsSection sectionRef={refCategoryBun} categoryName="Булки" type="bun" />
                <IngredientsSection sectionRef={refCategoryMain} categoryName="Соусы" type="sauce" />
                <IngredientsSection sectionRef={refCategorySauce} categoryName="Начинки" type="main" />
            </div>
        </section>
    )
}

export default BurgerIngredients;