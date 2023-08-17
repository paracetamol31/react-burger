import PropTypes from "prop-types";

import IngredientСard from "../ingredient-сard/ingredient-сard";
import ingredientsSectionStyles from "./ingredients-section.module.css";

const IngredientsSection = (props) => {
    return (
        <section className={ingredientsSectionStyles.section}>
            <span className="mt-6 mb-10 text text_type_main-medium">{props.categoryName}</span>
            <div className={`${ingredientsSectionStyles.wrapper} pr-4 pl-4`}>
                {props.ingredientsData.map((item) => props.type === item.type && <IngredientСard key={item._id} {...item} />)}
            </div>
        </section>
    )
}

IngredientsSection.propTypes = {
    type: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    ingredientsData: PropTypes.array.isRequired
}

export default IngredientsSection;