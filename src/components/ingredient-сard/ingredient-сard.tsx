import React, { FC } from "react";
import { useDispatch } from 'react-redux';
import {
    CurrencyIcon,
    Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";

import ingredientСardStyles from "./ingredient-сard.module.css";
import {
    setCurrentIngredient,
    increaseCounter,
    clearBunsCounter
} from "../../services/actions/ingredients";
import { useLocation, useNavigate } from "react-router-dom";
import { IAddConstructorItemPayload } from "../../services/actions/burgerConstructor";
import { useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";
import { IIngredientItem } from "../../services/reducers/ingredients";

interface IPropsIngredientСard {
    id: string
}

const IngredientСard: FC<IPropsIngredientСard> = ({ id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { ingredients } = useSelector((state: RootState) => state.ingredients);
    const ingredientObject: IIngredientItem | null = ingredients?.find((ingredient: IIngredientItem) => ingredient._id === id) || null;

    const openModal = React.useCallback(() => {
        if (ingredientObject) {
            dispatch(setCurrentIngredient({ id: ingredientObject._id }));
            navigate(`/ingredients/${ingredientObject._id}`, { state: { background: location } });
        }
    }, [dispatch, ingredientObject, navigate, location]);

    const [, dragRef] = useDrag<IAddConstructorItemPayload>({
        type: "ingredient",
        item: ingredientObject
            ? {
                image: ingredientObject.image,
                price: ingredientObject.price,
                id: ingredientObject._id,
                name: ingredientObject.name,
                itemType: ingredientObject.type,
                index: null
            }
            : undefined,
        end: (item, monitor) => {
            if (monitor.didDrop() && item.id) {
                dispatch(increaseCounter({
                    id: item.id
                }))

                if (item.itemType === "bun") {
                    dispatch(clearBunsCounter({
                        id: item.id
                    }))
                }
            }
        }
    });

    return (
        ingredientObject
            ? <div ref={dragRef} onClick={openModal} className={`${ingredientСardStyles.card} pl-4 pr-4`}>
                {!!ingredientObject.count && <Counter count={ingredientObject.count} size="default" extraClass="m-1" />}
                <img src={ingredientObject.image} alt="Картина ингредиента" />
                <div className={`${ingredientСardStyles.priceFrame} mt-1 mb-1`}>
                    <span className="mr-2 text text_type_main-medium">{ingredientObject.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className={`${ingredientСardStyles.ingredientName} text text_type_main-default`}>{ingredientObject.name}</span>
            </div>
            : null
    )
}

export default IngredientСard;