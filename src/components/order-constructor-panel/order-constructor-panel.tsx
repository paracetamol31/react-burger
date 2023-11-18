import {
    FC,
    useCallback,
    useEffect,
} from "react";
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import orderConstructorPanelStyles from "./order-constructor-panel.module.css";
import { countTotalPrice } from "../../services/actions/totalPrice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";

const OrderConstructorPanel: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { totalPrice } = useSelector(state => state.totalPrice);
    const burgerConstructor = useSelector(state => state.burgerConstructor);

    useEffect(() => {
        dispatch(countTotalPrice({ burgerConstructor }));
    }, [dispatch, burgerConstructor])

    const openModalOrderDetails = useCallback(() => {
        if (burgerConstructor.bun) {
            navigate("/order", { state: { background: location } });
        }
    }, [burgerConstructor, navigate, location]);

    return (
        <section className={`${orderConstructorPanelStyles.contentWrapper} mt-10 mb-10 mr-4`}>
            <div className={orderConstructorPanelStyles.content}>
                <span className="text text_type_main-large mr-2">{totalPrice}</span>
                <CurrencyIcon type="primary" />
                <Button test-data="create-order-button" htmlType="button" type="primary" size="medium" extraClass="ml-10"
                    onClick={openModalOrderDetails}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default OrderConstructorPanel;