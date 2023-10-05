import { FC } from "react";

import ingredientsPageStyles from "./ingredients-page.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

export const IngredientsPage: FC = () => {
    return (
        <section className={ingredientsPageStyles.ingredientsPageWrapper}>
            <span className={`${ingredientsPageStyles.label} text text text_type_main-large mb-7`}>Детали ингредиента</span>
            <IngredientDetails />
        </section>
    )
}