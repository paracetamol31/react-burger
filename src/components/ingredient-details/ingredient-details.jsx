import PropTypes from "prop-types";

import ingredientCharacteristicsStyles from "./ingredient-details.module.css";
import IngredientCharacteristics from "../ingredient-characteristics/ingredient characteristics";

const IngredientDetails = (props) => {
    debugger
    return (
        <section className={ingredientCharacteristicsStyles.wrapper}>
            <img src={props.image_large} alt="Изображение ингредиента"></img>
            <span className="mt-4 mb-8 text text_type_main-medium">{props.name}</span>
            <div className={ingredientCharacteristicsStyles.characteristicsPanel}>
                <IngredientCharacteristics characteristicsName="Калории,ккал" characteristicsValue={props.calories}/>
                <IngredientCharacteristics characteristicsName="Белки, г" characteristicsValue={props.proteins}/>
                <IngredientCharacteristics characteristicsName="Жир, г" characteristicsValue={props.fat}/>
                <IngredientCharacteristics characteristicsName="Углеводы, г" characteristicsValue={props.carbohydrates}/>
            </div>
        </section>
    );
}

IngredientDetails.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    image_large: PropTypes.string
}

export default IngredientDetails;