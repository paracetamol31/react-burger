import { FC, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import orderDetailsStyles from "./order-details.module.css";
import { applayOrderId } from "../../services/actions/order";
import checkIcon from "../../images/check.svg"

const OrderDetails: FC = () => {
    const dispatch = useDispatch();
    const burgerConstructor = useSelector((state: any) => state.burgerConstructor);
    const { orderId, orderIdRequest, orderIdFailed } = useSelector((state: any) => state.order);

    useEffect(() => {
        if (burgerConstructor.constructorItems.length) {
            dispatch(applayOrderId([...burgerConstructor.constructorItems.map((item: any) => item.id), burgerConstructor.bun.id]) as any)
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