import { useDrop } from "react-dnd";
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

    return (
        <section onDragOver={(e) => {
            if (isDragStart) {
                let result = Math.floor(Math.abs(e.clientY - yPoint) / heightChildItemBurgerConstructor);
                result = e.clientY > yPoint ? result * 1 : result * -1;
                dispatch({
                    type: SET_EMPTY_ITEM,
                    index: indexEmptyItem + result,
                    yPoint: e.clientY
                })
            }
        }} ref={dropTarget} className={`${burgerConstructorStyles.burgerConstructor} mt-25`}>
            {bun && <BurgerConstructorItem
                type="top"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
                itemType="bun"
            />}

            <div className={burgerConstructorStyles.scrollBar}>
                {constructorItems.map((item, index) => {
                    return <BurgerConstructorItem
                        key={Math.round(Math.random() * 1000000)}
                        extraClass="ml-2"
                        text={item.name}
                        price={item.price}
                        index={index}
                        thumbnail={item.image}
                        itemType={item.itemType}
                    />
                })}
            </div>

            {bun && <BurgerConstructorItem
                type="bottom"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
                itemType="bun"
            />}

            <OrderConstructorpPanel />
        </section>
    )
}

export default BurgerConstructor;