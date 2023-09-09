import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import ingredientCharacteristicsStyles from "./ingredient-details.module.css";
import IngredientCharacteristics from "../ingredient-characteristics/ingredient characteristics";
import {applayIngredients} from "../../services/actions/ingredients";

const IngredientDetails = ({ currentIngredient }) => {
    const dispatch = useDispatch()
    const { ingredients } = useSelector(state => state.ingredients);

    useEffect(() => {
        !ingredients && dispatch(applayIngredients());
    }, [dispatch, ingredients])

    if (!ingredients || !currentIngredient) {
        return null;
    }

    const currentIngredientObject = ingredients.find(item => item._id === currentIngredient);

    if (!currentIngredientObject) {
        return null;
    }

    return (
        <section className={ingredientCharacteristicsStyles.wrapper}>
            <img src={currentIngredientObject.image_large} alt="Изображение ингредиента"></img>
            <span className="mt-4 mb-8 text text_type_main-medium">{currentIngredientObject.name}</span>
            <div className={ingredientCharacteristicsStyles.characteristicsPanel}>
                <IngredientCharacteristics characteristicsName="Калории,ккал" characteristicsValue={currentIngredientObject.calories} />
                <IngredientCharacteristics characteristicsName="Белки, г" characteristicsValue={currentIngredientObject.proteins} />
                <IngredientCharacteristics characteristicsName="Жир, г" characteristicsValue={currentIngredientObject.fat} />
                <IngredientCharacteristics characteristicsName="Углеводы, г" characteristicsValue={currentIngredientObject.carbohydrates} />
            </div>
        </section>
    );
}

IngredientDetails.propTypes = {
    currentIngredient: PropTypes.string
}

export default IngredientDetails;