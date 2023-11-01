import { FC } from "react";

import IngredientСard from "../ingredient-сard/ingredient-сard";
import ingredientsSectionStyles from "./ingredients-section.module.css";
import { useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";
import { IIngredientItem } from "../../services/reducers/ingredients";

interface IPropsIngredientsSection {
    type: string,
    categoryName: string,
    sectionRef: React.MutableRefObject<HTMLDivElement | null>
}

const IngredientsSection: FC<IPropsIngredientsSection> = ({ sectionRef, type, categoryName }) => {
    const { ingredients } = useSelector((state: RootState) => state.ingredients)
    if (!ingredients) {
        return null;
    }
    return (
        <section ref={sectionRef} className={ingredientsSectionStyles.section}>
            <span className="mt-6 mb-10 text text_type_main-medium">{categoryName}</span>
            <div className={`${ingredientsSectionStyles.wrapper} pr-4 pl-4`}>
                {Array.from(ingredients).map((item: [string, IIngredientItem]) => type === item[1].type && <IngredientСard key={item[0]} id={item[0]} />)}
            </div>
        </section>
    )
}

export default IngredientsSection;