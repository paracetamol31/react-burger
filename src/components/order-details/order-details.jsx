import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

import orderDetailsStyles from "./order-details.module.css";
import checkIcon from "../../images/check.svg"

const OrderDetails = () => {
    const { orderId, orderIdRequest, orderIdFailed } = useSelector(state => state.order);

    let title = "Загрузка...";
    let titleStyle = "text text_type_main-medium mb-15";
    if (orderId) {
        title = orderId;
        titleStyle = "text text_type_digits-large mb-8 mt-9";
    } else if (orderIdFailed) {
        title = "Ошибка оформления заказа!"
    }
    
    return (
        <section className={orderDetailsStyles.wrapper}>
            <span className={`${orderDetailsStyles.orderId} ${titleStyle}`}>{title}</span>
            {(!orderIdRequest && !orderIdFailed)
                &&
                <>
                    <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
                    <img className="mb-15" src={checkIcon} alt="Картинка недоступная человеческому восприятию" />
                    <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
                    <span className="text text_type_main-default text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</span>
                </>
            }
        </section >
    );
}


OrderDetails.propTypes = {
    orderId: PropTypes.string
}

export default OrderDetails;