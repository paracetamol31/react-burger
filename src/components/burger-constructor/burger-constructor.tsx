import { useDrop } from "react-dnd";
import { DragEventHandler, FC, useCallback } from "react";
import {
    useSelector,
    useDispatch
} from 'react-redux';

import burgerConstructorStyles from "./burger-constructor.module.css";
import BurgerConstructorItem from "../burger-сonstructor-item/burger-сonstructor-item";
import OrderConstructorpPanel from "../order-constructor-panel/order-constructor-panel";
import {
    addConstructorItem,
    setDrag,
    setEmptyItem,
    clearStartDragPosition,
    clearIndexEmptyItem
} from "../../services/actions/burgerConstructor";

const heightChildItemBurgerConstructor: number = 96;

const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const { constructorItems, bun, isDragStart, yPoint, indexEmptyItem } = useSelector((state: any) => state.burgerConstructor);

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: any) {
            dispatch(addConstructorItem({
                image: item.image,
                price: item.price,
                id: item.id,
                name: item.name,
                itemType: item.itemType,
                index: indexEmptyItem
            }));
            dispatch(clearIndexEmptyItem());
            dispatch(clearStartDragPosition());
            dispatch(setDrag({
                isDrag: false
            }));
        }
    });

    const onDragOver = useCallback<DragEventHandler<HTMLElement>>((event: React.DragEvent<HTMLElement>) => {
        if (isDragStart) {
            event.preventDefault();
            let result = Math.floor(Math.abs(event.clientY - yPoint) / heightChildItemBurgerConstructor);
            result = event.clientY > yPoint ? result * 1 : result * -1;
            dispatch(setEmptyItem({
                index: indexEmptyItem + result,
                yPoint: event.clientY
            }))
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
                {constructorItems.map((item: any, index: any) => {
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