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
    showOrderMoal,
    closeOrderModal
} from "../../services/actions/modal";
import { countTotalPrice } from "../../services/actions/totalPrice";
import { useNavigate } from "react-router-dom";

const OrderConstructorpPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isShowOrderModal } = useSelector(state => state.modal);
    const { totalPrice } = useSelector(state => state.totalPrice);
    const { userInfo } = useSelector(state => state.user);
    const { orderIdRequest } = useSelector(state => state.order);

    const burgerConstructor = useSelector(state => state.burgerConstructor);

    useEffect(() => {
        dispatch(countTotalPrice({ burgerConstructor }));
    }, [dispatch, burgerConstructor])

    const openModalOrderDetails = useCallback(() => {
        if (!userInfo) {
            navigate("/login");
            return;
        }
        if (burgerConstructor.bun) {
            dispatch(applayOrderId([...burgerConstructor.constructorItems.map(item => item.id), burgerConstructor.bun.id]))
            dispatch(showOrderMoal())
        }
    }, [dispatch, burgerConstructor, navigate, userInfo]);

    const closeModal = useCallback(() => {
        if (!orderIdRequest) {
            dispatch(closeOrderModal())
        }
    }, [dispatch, orderIdRequest]);

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
            {isShowOrderModal
                && <Modal closeModal={closeModal}>
                    < OrderDetails />
                </Modal>}
        </section>
    )
}

export default OrderConstructorpPanel;