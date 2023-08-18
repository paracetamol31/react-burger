import PropTypes from "prop-types";

import IngredientsSection from "../ingredients-section/ingredients-section";
import TabsPanel from "../tabs-panel/tabs-panel";
import burgerIngredientsStyles from "./burger-ingredients.module.css";

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

const BurgerIngredients = ({ ingredientsData }) => {
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
                <IngredientsSection categoryName="Булки" type="bun" ingredientsData={ingredientsData} />
                <IngredientsSection categoryName="Соусы" type="sauce" ingredientsData={ingredientsData} />
                <IngredientsSection categoryName="Начинки" type="main" ingredientsData={ingredientsData} />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredientsData: PropTypes.array
}

export default BurgerIngredients;