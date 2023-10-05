import { FC } from "react";
import { useSelector } from 'react-redux';

import IngredientСard from "../ingredient-сard/ingredient-сard";
import ingredientsSectionStyles from "./ingredients-section.module.css";

interface IPropsIngredientsSection {
    type: string,
    categoryName: string,
    sectionRef: React.MutableRefObject<HTMLDivElement | null>
}

const IngredientsSection: FC<IPropsIngredientsSection> = ({ sectionRef, type, categoryName }) => {
    const { ingredients } = useSelector((state: any) => state.ingredients)
    if (!ingredients) {
        return null;
    }
    return (
        <section ref={sectionRef} className={ingredientsSectionStyles.section}>
            <span className="mt-6 mb-10 text text_type_main-medium">{categoryName}</span>
            <div className={`${ingredientsSectionStyles.wrapper} pr-4 pl-4`}>
                {ingredients.map((item: any) => type === item.type && <IngredientСard key={item._id} id={item._id} />)}
            </div>
        </section>
    )
}

export default IngredientsSection;