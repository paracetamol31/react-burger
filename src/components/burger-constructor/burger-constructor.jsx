import { useDrop } from "react-dnd";
import { useCallback } from "react";
import {
    useSelector,
    useDispatch
} from 'react-redux';

import burgerConstructorStyles from "./burger-constructor.module.css";
import BurgerConstructorItem from "../burger-сonstructor-item/burger-сonstructor-item";
import OrderConstructorpPanel from "../order-constructor-panel/order-constructor-panel";
import {
    ADD_CONSTRUCTOR_ITEM,
    SET_DRAG,
    SET_EMPTY_ITEM,
    CLEAR_START_DRAG_POSITION,
    CLEAR_INDEX_EMPTY_ITEM
} from "../../services/actions/burgerConstructor";

const heightChildItemBurgerConstructor = 96;

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { constructorItems, bun, isDragStart, yPoint, indexEmptyItem } = useSelector(state => state.burgerConstructor);

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch({
                type: ADD_CONSTRUCTOR_ITEM,
                image: item.image,
                price: item.price,
                id: item.id,
                name: item.name,
                itemType: item.type,
                index: indexEmptyItem
            });
            dispatch({
                type: CLEAR_INDEX_EMPTY_ITEM
            })
            dispatch({
                type: CLEAR_START_DRAG_POSITION
            })
            dispatch({
                type: SET_DRAG,
                isDrag: false
            })
        }
    });

    const onDragOver = useCallback((e) => {
        if (isDragStart) {
            e.preventDefault();
            let result = Math.floor(Math.abs(e.clientY - yPoint) / heightChildItemBurgerConstructor);
            result = e.clientY > yPoint ? result * 1 : result * -1;
            dispatch({
                type: SET_EMPTY_ITEM,
                index: indexEmptyItem + result,
                yPoint: e.clientY
            })
        }
    }, [yPoint, indexEmptyItem, isDragStart, dispatch]);

    return (
        // TODO: Пришлось использовать в этом месте onDragOver, так как не смог найти в библиотеке
        // react dnd функционал с отслеживанием позиции курсора в момет событя drag.
        <section onDragOver={onDragOver}
            ref={dropTarget} className={`${burgerConstructorStyles.burgerConstructor} mt-25`}>
            {bun && <BurgerConstructorItem
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
                itemType="bun"
                id={bun.id}
            />}

            <div className={burgerConstructorStyles.scrollBar}>
                {constructorItems.map((item, index) => {
                    return <BurgerConstructorItem
                        key={item.uuid}
                        extraClass="ml-2"
                        text={item.name}
                        price={item.price}
                        index={index}
                        thumbnail={item.image}
                        itemType={item.itemType}
                        id={item.id}
                    />
                })}
            </div>

            {bun && <BurgerConstructorItem
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
                itemType="bun"
                id={bun.id}
            />}

            <OrderConstructorpPanel />
        </section>
    )
}

export default BurgerConstructor;