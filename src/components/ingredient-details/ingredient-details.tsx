import { FC } from "react";
import { Params, useParams } from "react-router-dom";

import ingredientCharacteristicsStyles from "./ingredient-details.module.css";
import IngredientCharacteristics from "../ingredient-characteristics/ingredient-characteristics";
import { useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";

const IngredientDetails: FC = () => {
    const { id }: Readonly<Params<string>> = useParams();
    const { ingredients } = useSelector((state: RootState) => state.ingredients);

    if (!ingredients || !id) {
        return null;
    }

    const currentIngredientObject = ingredients.get(id)

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