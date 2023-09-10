import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';

import orderDetailsStyles from "./order-details.module.css";
import { applayOrderId } from "../../services/actions/order";
import checkIcon from "../../images/check.svg"

const OrderDetails = () => {
    const dispatch = useDispatch();
    const burgerConstructor = useSelector(state => state.burgerConstructor);
    const { orderId, orderIdRequest, orderIdFailed } = useSelector(state => state.order);

    useEffect(() => {
        if (burgerConstructor.constructorItems.length) {
            dispatch(applayOrderId([...burgerConstructor.constructorItems.map(item => item.id), burgerConstructor.bun.id]))
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
                    <img className="mb-15" src={checkIcon} alt="Картинка недоступная человеческому восприятию" />
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


OrderDetails.propTypes = {
    orderId: PropTypes.string
}

export default OrderDetails;