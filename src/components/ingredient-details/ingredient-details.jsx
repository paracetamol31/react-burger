import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ingredientCharacteristicsStyles from "./ingredient-details.module.css";
import IngredientCharacteristics from "../ingredient-characteristics/ingredient characteristics";
import { applayIngredients } from "../../services/actions/ingredients";

const IngredientDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const { ingredients } = useSelector(state => state.ingredients);

    useEffect(() => {
        !ingredients && dispatch(applayIngredients());
    }, [dispatch, ingredients])

    if (!ingredients) {
        return null;
    }

    const currentIngredientObject = ingredients.find(item => item._id === id);

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

export default IngredientDetails;