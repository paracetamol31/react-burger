import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import ingredientsPageStyles from "./ingredients-page.module.css";

export const IngredientsPage = () => {
    const {id} = useParams();
    return (
        <section className={ingredientsPageStyles.ingredientsPageWraper}>
            <span className={`${ingredientsPageStyles.label} text text text_type_main-large mb-7`}>Детали ингредиента</span>
            <IngredientDetails currentIngredient={id}/>
        </section>
    )
}