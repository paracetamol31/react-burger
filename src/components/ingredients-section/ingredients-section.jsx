import data from "../../utils/data";
import IngredientСard from "../ingredient-сard/ingredient-сard";
import ingredientsSectionStyles from "./ingredients-section.module.css";

const IngredientsSection = (props) => {
    return (
        <section className={ingredientsSectionStyles.section}>
            <span className="mt-6 mb-10 text text_type_main-medium">{props.categoryName}</span>
            <div className={`${ingredientsSectionStyles.wrapper} pr-4 pl-4`}>
                {data.map((item) => props.type === item.type && <IngredientСard {...item} />)}
            </div>
        </section>
    )
}

export default IngredientsSection;