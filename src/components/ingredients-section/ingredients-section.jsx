import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

import IngredientСard from "../ingredient-сard/ingredient-сard";
import ingredientsSectionStyles from "./ingredients-section.module.css";

const IngredientsSection = (props) => {
    const { ingredients } = useSelector(state => state.ingredients)
    if (!ingredients) {
        return null;
    }
    return (
        <section ref={props.sectionRef} className={ingredientsSectionStyles.section}>
            <span className="mt-6 mb-10 text text_type_main-medium">{props.categoryName}</span>
            <div className={`${ingredientsSectionStyles.wrapper} pr-4 pl-4`}>
                {ingredients.map((item) => props.type === item.type && <IngredientСard key={item._id} id={item._id} />)}
            </div>
        </section>
    )
}

IngredientsSection.propTypes = {
    type: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    sectionRef: PropTypes.object.isRequired
}

export default IngredientsSection;