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
import { applayOrderId } from "../../services/actions/order";
import {
    SHOW_ORDER_MODAL,
    CLOSE_ORDER_MODAL
} from "../../services/actions/modal";



const reducerTotalPrice = (state, action) => {
    debugger
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
    const { isShowOrderModal } = useSelector(state => state.modal);
    const { orderId } = useSelector(state => state.order);
    const { constructorItems, bun } = useSelector(state => state.burgerConstructor);

    useEffect(() => {
        dispatchChangeTotalPrice({ type: "clear" })
        constructorItems.forEach(item => dispatchChangeTotalPrice({ type: item.type, price: item.price }))
        bun && dispatchChangeTotalPrice({type: bun.itemType, price: bun.price})
    }, [constructorItems, bun])

    const openModalOrderDetails = useCallback(() => {
        dispatch(applayOrderId(constructorItems))
        dispatch({ type: SHOW_ORDER_MODAL })
    }, [dispatch, constructorItems]);

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