import {
    useCallback,
    useEffect,
} from "react";
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';

import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import orderConstructorpPanelStyles from "./order-constructor-panel.module.css";
import { applayOrderId } from "../../services/actions/order";
import {
    SHOW_ORDER_MODAL,
    CLOSE_ORDER_MODAL
} from "../../services/actions/modal";
import { COUNT_TOTAL_PRICE } from "../../services/actions/totalPrice";

const OrderConstructorpPanel = () => {
    const dispatch = useDispatch();
    const { isShowOrderModal } = useSelector(state => state.modal);
    const { totalPrice } = useSelector(state => state.totalPrice);
    const { orderId } = useSelector(state => state.order);
    const burgerConstructor = useSelector(state => state.burgerConstructor);

    useEffect(() => {
        dispatch({ type: COUNT_TOTAL_PRICE, burgerConstructor })
    }, [dispatch, burgerConstructor])

    const openModalOrderDetails = useCallback(() => {
        dispatch(applayOrderId([...burgerConstructor.constructorItems.map(item => item.id), burgerConstructor.bun.id]))
        dispatch({ type: SHOW_ORDER_MODAL })
    }, [dispatch, burgerConstructor]);

    const closeModal = useCallback(() => {
        dispatch({ type: CLOSE_ORDER_MODAL })
    }, [dispatch]);

    return (
        <section className={`${orderConstructorpPanelStyles.contentWraper} mt-10 mb-10 mr-4`}>
            <div className={orderConstructorpPanelStyles.content}>
                <span className="text text_type_main-large mr-2">{totalPrice}</span>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="medium" extraClass="ml-10"
                    onClick={openModalOrderDetails}>
                    Оформить заказ
                </Button>
            </div>
            {(orderId && isShowOrderModal)
                && <Modal closeModal={closeModal}>
                    < OrderDetails />
                </Modal>}
        </section>
    )
}

export default OrderConstructorpPanel;