import data from "../../utils/data";
import IngredientСard from "../ingredient-сard/ingredient-сard";
import ingredientsSectionStyles from "./ingredients-section.module.css";
import PropTypes from "prop-types";

const IngredientsSection = (props) => {
    return (
        <section className={ingredientsSectionStyles.section}>
            <span className="mt-6 mb-10 text text_type_main-medium">{props.categoryName}</span>
            <div className={`${ingredientsSectionStyles.wrapper} pr-4 pl-4`}>
                {data.map((item) => props.type === item.type && <IngredientСard key={item._id} {...item} />)}
            </div>
        </section>
    )
}

IngredientСard.propTypes = {
    type: PropTypes.string,
    categoryName: PropTypes.string
}

export default IngredientsSection;