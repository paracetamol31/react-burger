import {
    useCallback,
    useEffect,
    useReducer
} from "react";
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';

import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import orderConstructorpPanelStyles from "./order-constructor-panel.module.css";
import {
    applayOrderId,
    SHOW_ORDER_MODAL,
    CLOSE_ORDER_MODAL
} from "../../services/actions/index";

const reducerTotalPrice = (state, action) => {
    switch (action.type) {
        case "bun":
            return state + action.price * 2
        case "clear":
            return 0
        default:
            return state + action.price
    }
}

const OrderConstructorpPanel = () => {
    const [totalPrice, dispatchChangeTotalPrice] = useReducer(reducerTotalPrice, 0);
    const dispatch = useDispatch();
    const { orderId, isShowOrderModal, constructorIngredients } = useSelector(state => state);

    useEffect(() => {
        dispatchChangeTotalPrice({ type: "clear" })
        constructorIngredients.forEach(item => dispatchChangeTotalPrice({ type: item.type, price: item.price }))
    }, [constructorIngredients])

    const openModalOrderDetails = useCallback(() => {
        dispatch(applayOrderId(constructorIngredients))
        dispatch({ type: SHOW_ORDER_MODAL })
    }, [dispatch, constructorIngredients]);

    const closeModal = useCallback(() => {
        dispatch({type: CLOSE_ORDER_MODAL})
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