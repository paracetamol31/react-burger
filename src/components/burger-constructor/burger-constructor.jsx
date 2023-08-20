import { useContext } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from 'react-redux';

import burgerConstructorStyles from "./burger-constructor.module.css";
import BurgerConstructorItem from "../burger-сonstructor-item/burger-сonstructor-item";
import { IngredientsDataContext } from "../../services/ingredients-data-context";
import OrderConstructorpPanel from "../order-constructor-panel/order-constructor-panel";

const BurgerConstructor = () => {
    const { ingredientsData } = useContext(IngredientsDataContext);
    const bun = ingredientsData.find(item => item.type === "bun");
    const { constructorIngredients, ingredients } = useSelector(state => state);



    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            //onDropHandler(itemId);
        }
    });



    return (
        <section className={`${burgerConstructorStyles.burgerConstructor} mt-25`}>
            {constructorIngredients.map((item, index) => {
                const ingredient = ingredients.find(idItem => item._id === idItem);
                if (!ingredient) {
                    return null;
                }
                if (ingredient.type === "bun") {
                    if (index === 0) {
                        <BurgerConstructorItem
                            type="top"
                            isLocked={true}
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                        />
                    } else if (index === constructorIngredients.length - 1) {
                        <BurgerConstructorItem
                            type="bottom"
                            isLocked={true}
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                        />
                    } else {
                        return null;
                    }
                } else {
                    <BurgerConstructorItem
                        key={item._id}
                        extraClass="ml-2"
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    />
                }
            })}
            <OrderConstructorpPanel />
        </section>
    )
}

export default BurgerConstructor;