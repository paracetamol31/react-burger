import {
    FC,
    useCallback,
    useEffect,
} from "react";
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';

import orderConstructorpPanelStyles from "./order-constructor-panel.module.css";
import { countTotalPrice } from "../../services/actions/totalPrice";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConstructorpPanel: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { totalPrice } = useSelector((state: any) => state.totalPrice);
    const burgerConstructor = useSelector((state: any) => state.burgerConstructor);

    useEffect(() => {
        dispatch(countTotalPrice({ burgerConstructor }));
    }, [dispatch, burgerConstructor])

    const openModalOrderDetails = useCallback(() => {
        if (burgerConstructor.bun) {
            navigate("/order", { state: { background: location } });
        }
    }, [burgerConstructor, navigate, location]);

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
        </section>
    )
}

export default OrderConstructorpPanel;