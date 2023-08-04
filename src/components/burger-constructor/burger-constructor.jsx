import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import data from "../../utils/data";

const BurgerConstructor = () => {
    return (
        <section className={`${burgerConstructorStyles.burgerConstructor} mt-25`}>
            <div className={burgerConstructorStyles.wrapperConstructorElement}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={data[0].image}
                />
            </div>
            <div className={burgerConstructorStyles.scrollBar}>
                {data.map((item) => {
                    return (
                        <div className={burgerConstructorStyles.wrapperConstructorElement}>
                            <DragIcon />
                            < ConstructorElement
                                extraClass="ml-2"
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    )
                })}
            </div>
            <div className={burgerConstructorStyles.wrapperConstructorElement}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={data[0].image}
                />
            </div>
            <footer className={`${burgerConstructorStyles.footer} mt-10 mb-10 mr-4`}>
                <div className={burgerConstructorStyles.footerContentWraper}>
                    <span className="text text_type_main-large mr-2">999</span>
                    <CurrencyIcon type="primary"/>
                    <Button htmlType="button" type="primary" size="medium" extraClass="ml-10">
                        Оформить заказ
                    </Button>
                </div>
            </footer>
        </section>
    )
}

export default BurgerConstructor;