import { useContext } from "react";

import burgerConstructorStyles from "./burger-constructor.module.css";
import BurgerConstructorItem from "../burger-сonstructor-item/burger-сonstructor-item";
import { IngredientsDataContext } from "../../services/ingredients-data-context";
import OrderConstructorpPanel from "../order-constructor-panel/order-constructor-panel";

const BurgerConstructor = () => {
    const { ingredientsData } = useContext(IngredientsDataContext);
    const bun = ingredientsData.find(item => item.type === "bun");

    return (
        <section className={`${burgerConstructorStyles.burgerConstructor} mt-25`}>
            <BurgerConstructorItem
                type="top"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
            />
            <div className={burgerConstructorStyles.scrollBar}>
                {ingredientsData.map((item) => {
                    return (
                        item.type !== "bun"
                        &&
                        <BurgerConstructorItem
                            key={item._id}
                            extraClass="ml-2"
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                    )
                })}
            </div>
            <BurgerConstructorItem
                type="bottom"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
            />
            <OrderConstructorpPanel />
        </section>
    )
}

export default BurgerConstructor;