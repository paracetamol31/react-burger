import IngredientsSection from "../ingredients-section/ingredients-section";
import TabsPanel from "../tabs-panel/tabs-panel";
import burgerIngredientsStyles from "./burger-ingredients.module.css";

const tabsInfo = [
    {
        text: "Булки",
        id: 0
    },
    {
        text: "Соусы",
        id: 1
    },
    {
        text: "Начинки",
        id: 2
    }
];

const BurgerIngredients = () => {
    return (
        <section className={burgerIngredientsStyles.burgerIngredients}>
            <header className="mt-10 mb-5">
                <span className="text text_type_main-large">Соберите бургер</span>
            </header>
            <TabsPanel
                tabsInfo={tabsInfo}
                currentId={0}
            />
            <div className={`${burgerIngredientsStyles.scrollBar} pr-4 pl-4`}>
                <IngredientsSection categoryName="Булки" type="bun" />
                <IngredientsSection categoryName="Соусы" type="sauce" />
                <IngredientsSection categoryName="Начинки" type="main" />
            </div>
        </section>
    )
}

export default BurgerIngredients;