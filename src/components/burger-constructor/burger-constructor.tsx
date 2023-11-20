import { useDrop } from "react-dnd";
import { DragEventHandler, FC, useCallback } from "react";

import burgerConstructorStyles from "./burger-constructor.module.css";
import BurgerConstructorItem from "../burger-сonstructor-item/burger-сonstructor-item";
import OrderConstructorPanel from "../order-constructor-panel/order-constructor-panel";
import {
    insertConstructorItem,
    setDrag,
    replaceEmptyItem,
    clearIndexEmptyItem,
    IInsertConstructorItemPayload,
    IConstructorItemStateParams
} from "../../services/actions/burgerConstructor";
import { useDispatch, useSelector } from "../../services/hooks";

const heightChildItemBurgerConstructor: number = 96;

const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const { constructorItems, bun, isDragStart, startYPointEmptyItem: yPoint, indexEmptyItem } = useSelector(state => state.burgerConstructor);

    const [, dropTarget] = useDrop<IInsertConstructorItemPayload>({
        accept: "ingredient",
        drop(item: IInsertConstructorItemPayload) {
            dispatch(insertConstructorItem({
                image: item.image,
                price: item.price,
                id: item.id,
                name: item.name,
                itemType: item.itemType,
                index: indexEmptyItem
            }));
            dispatch(clearIndexEmptyItem());
            dispatch(setDrag({
                isDrag: false
            }));
        }
    });

    const onDragOver = useCallback<DragEventHandler<HTMLElement>>((event: React.DragEvent<HTMLElement>) => {
        if (isDragStart && yPoint !== null && indexEmptyItem !== null) {
            event.preventDefault();
            let result = Math.floor(Math.abs(event.clientY - yPoint) / heightChildItemBurgerConstructor);
            result = event.clientY > yPoint ? result * 1 : result * -1;
            dispatch(replaceEmptyItem({
                index: indexEmptyItem + result,
                yPoint: event.clientY
            }))
        }
    }, [yPoint, indexEmptyItem, isDragStart, dispatch]);

    return (
        // TODO: Пришлось использовать в этом месте onDragOver, так как не смог найти в библиотеке
        // react dnd функционал с отслеживанием позиции курсора в момет событя drag.
        <section
            onDragOver={onDragOver}
            ref={dropTarget}
            className={`${burgerConstructorStyles.burgerConstructor} mt-25`}
            data-test="burger-constructor"
        >
            {bun || constructorItems.length
                ? <>
                    {bun && <BurgerConstructorItem
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                        itemType="bun"
                        id={bun.id}
                        extraClass="mr-3"
                    />}

                    <div className={burgerConstructorStyles.scrollBar}>
                        {constructorItems.map((item: IConstructorItemStateParams, index: number) => {
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
                        extraClass="mr-3"
                    />
                    }
                </>
                : <div className={burgerConstructorStyles.emptySpace}>
                    <span className="text_type_main-default text_color_inactive">Переместите ингредиенты в эту область</span>
                </div>
            }
            <OrderConstructorPanel />
        </section>
    )
}

export default BurgerConstructor;