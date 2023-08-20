import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import {
    CurrencyIcon,
    Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';

import ingredientСardStyles from "./ingredient-сard.module.css";
import { SET_CURRENT_INGREDIENT, SHOW_INGREDIENT_MODAL } from "../../services/actions/index";

const IngredientСard = ({ id }) => {
    const dispatch = useDispatch();
    const { ingredients } = useSelector(state => state);
    const ingredientObject = ingredients.find(ingredient => ingredient._id === id);

    const openModal = React.useCallback(() => {
        dispatch({ type: SET_CURRENT_INGREDIENT, id: ingredientObject._id });
        dispatch({ type: SHOW_INGREDIENT_MODAL });
    }, [dispatch, ingredientObject._id]);

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: { id: ingredientObject._id }
    });

    return (
        <div ref={dragRef} onClick={openModal} className={`${ingredientСardStyles.card} pl-4 pr-4`}>
            {/* TODO: Значение count временно захардкожено*/}
            {!!ingredientObject.count && <Counter count={ingredientObject.count} size="default" extraClass="m-1" />}
            <img src={ingredientObject.image} alt="Картина ингредиента" />
            <div className={`${ingredientСardStyles.priceFrame} mt-1 mb-1`}>
                <span className="mr-2 text text_type_main-medium">{ingredientObject.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className={`${ingredientСardStyles.ingredientName} text text_type_main-default`}>{ingredientObject.name}</span>
        </div>
    )
}

IngredientСard.propTypes = {
    id: PropTypes.string
}

export default IngredientСard;