import React from "react";
import ingredientСardStyles from "./ingredient-сard.module.css";
import {
    CurrencyIcon,
    Counter
} from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientСard = (props) => {
    const [counter, setCounter] = React.useState(1);

    return <div className={`${ingredientСardStyles.card} pl-4 pr-4`}>
        <Counter count={counter} size="default" extraClass="m-1" />
        <img src={props.image} alt="Картина ингредиента" />
        <div className={`${ingredientСardStyles.priceFrame} mt-1 mb-1`}>
            <span className="mr-2 text text_type_main-medium">{props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
        <span className={`${ingredientСardStyles.ingredientName} text text_type_main-default`}>{props.name}</span>
    </div>
}

export default IngredientСard;