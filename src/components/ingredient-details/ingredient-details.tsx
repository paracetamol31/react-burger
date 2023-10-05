import { FC } from "react";
import { useSelector } from "react-redux";
import { Params, useParams } from "react-router-dom";

import ingredientCharacteristicsStyles from "./ingredient-details.module.css";
import IngredientCharacteristics from "../ingredient-characteristics/ingredient-characteristics";

const IngredientDetails: FC = () => {
    const { id }: Readonly<Params<string>> = useParams();
    const { ingredients } = useSelector((state: any) => state.ingredients);

    if (!ingredients) {
        return null;
    }

    const currentIngredientObject = ingredients.find((item: any) => item._id === id);

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