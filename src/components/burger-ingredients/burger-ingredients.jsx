import { generateKey } from "../../utils/helper-system";
import IngredientsSection from "../ingredients-section/ingredients-section";
import TabsPanel from "../panel-tabs/tabs-panel";
import burgerIngredientsStyles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
    return (
        <section className={burgerIngredientsStyles.burgerIngredients}>
            <header className="mt-10 mb-5">
                <span className="text text_type_main-large">Соберите бургер</span>
            </header>
            <TabsPanel
                tabsInfo={[
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
                ]}
                currentId={0}
            />
            <div className={`${burgerIngredientsStyles.scrollBar} pr-4 pl-4`}>
                <IngredientsSection key={generateKey()} categoryName="Булки" type="bun" />
                <IngredientsSection key={generateKey()} categoryName="Соусы" type="sauce" />
                <IngredientsSection key={generateKey()} categoryName="Начинки" type="main" />
            </div>
        </section>
    )
}

export default BurgerIngredients;