import { FC } from "react";

import ingredientCharacteristicsStyles from "./ingredient-characteristics.module.css";

interface IPropsIngredientCharacteristics {
    characteristicsName: string,
    characteristicsValue: number
}

const IngredientCharacteristics: FC<IPropsIngredientCharacteristics> = ({ characteristicsName, characteristicsValue }) => {
    return (
        <section className={`${ingredientCharacteristicsStyles.wrapper} text text_color_inactive text_type_main-default`}>
            <span>{characteristicsName}</span>
            <span>{characteristicsValue}</span>
        </section>
    );
}

export default IngredientCharacteristics;

