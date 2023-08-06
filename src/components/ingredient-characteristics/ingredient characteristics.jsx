import PropTypes from "prop-types";

import ingredientCharacteristicsStyles from "./ingredient-characteristics.module.css";

const IngredientCharacteristics = ({ characteristicsName, characteristicsValue }) => {
    return (
        <section className={`${ingredientCharacteristicsStyles.wrapper} text text_color_inactive text_type_main-default`}>
            <span>{characteristicsName}</span>
            <span>{characteristicsValue}</span>
        </section>
    );
}

IngredientCharacteristics.propTypes = {
    characteristicsName: PropTypes.string,
    characteristicsValue: PropTypes.number
}

export default IngredientCharacteristics;

