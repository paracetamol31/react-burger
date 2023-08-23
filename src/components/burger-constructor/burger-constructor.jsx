import { useDrop } from "react-dnd";
import {
    useSelector,
    useDispatch
} from 'react-redux';

import burgerConstructorStyles from "./burger-constructor.module.css";
import BurgerConstructorItem from "../burger-сonstructor-item/burger-сonstructor-item";
import OrderConstructorpPanel from "../order-constructor-panel/order-constructor-panel";
import { ADD_CONSTRUCTOR_ITEM } from "../../services/actions/burgerConstructor";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { constructorItems, bun } = useSelector(state => state.burgerConstructor);

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch({
                type: ADD_CONSTRUCTOR_ITEM,
                image: item.image,
                price: item.price,
                id: item.id,
                name: item.name,
                itemType: item.type
            });
        }
    });

    return (
        <section ref={dropTarget} className={`${burgerConstructorStyles.burgerConstructor} mt-25`}>
            {bun && <BurgerConstructorItem
                type="top"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
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
                    />
                })}
            </div>

            {bun && <BurgerConstructorItem
                type="bottom"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
            />}

            <OrderConstructorpPanel />
        </section>
    )
}

export default BurgerConstructor;