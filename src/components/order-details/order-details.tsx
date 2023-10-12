import { FC, useEffect } from "react";

import orderDetailsStyles from "./order-details.module.css";
import { applyOrderId } from "../../services/actions/order";
import checkIcon from "../../images/check.svg"
import { IConstructorItemStateParams } from "../../services/actions/burgerConstructor";
import { useDispatch, useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";
import { IBurgerConstructorReducerState } from "../../services/reducers/burgerConstructor";

const OrderDetails: FC = () => {
    const dispatch = useDispatch();
    const burgerConstructor: IBurgerConstructorReducerState = useSelector((state: RootState) => state.burgerConstructor);
    const { orderId, orderIdRequest, orderIdFailed } = useSelector((state: RootState) => state.order);

    useEffect(() => {
        if (burgerConstructor.constructorItems.length && burgerConstructor.bun) {
            dispatch(applyOrderId([...burgerConstructor.constructorItems.map((item: IConstructorItemStateParams) => item.id), burgerConstructor.bun.id]))
        }
    }, [dispatch, burgerConstructor])

    return (
        <>
            {
                (!orderIdRequest && !orderIdFailed)
                &&
                <section className={orderDetailsStyles.wrapper}>
                    <span className={`${orderDetailsStyles.orderId} text text_type_digits-large mb-8 mt-9`}>{orderId}</span>
                    <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
                    <img className="mb-15" src={checkIcon.toString()} alt="Картинка недоступная человеческому восприятию" />
                    <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
                    <span className="text text_type_main-default text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</span>
                </section >

            }
            {
                orderIdRequest
                &&
                <div className={orderDetailsStyles.messageError}>
                    <span className="text_type_main-large">{"Оформление заказа..."}</span>
                </div>

            }
            {
                orderIdFailed
                && <div className={orderDetailsStyles.messageError}>
                    <span className="text_type_main-large">{"Ошибка оформления заказа :( "}</span>
                </div>
            }
        </>
    );
}

export default OrderDetails;