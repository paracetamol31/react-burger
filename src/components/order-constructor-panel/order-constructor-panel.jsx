import {
    useState,
    useCallback,
    useEffect,
    useContext,
    useReducer
} from "react";
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import orderConstructorpPanelStyles from "./order-constructor-panel.module.css";
import { IngredientsDataContext } from "../../services/ingredients-data-context";
import { makeOrderRequest } from "../../utils/api";

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
    const { ingredientsData } = useContext(IngredientsDataContext);
    const [totalPrice, dispatchChangeTotalPrice] = useReducer(reducerTotalPrice, 0);
    const [isOpenModalOrderDetails, setOpenModalOrderDetails] = useState(false);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        dispatchChangeTotalPrice({ type: "clear" })
        ingredientsData.forEach(item => dispatchChangeTotalPrice({ type: item.type, price: item.price }))
    }, [ingredientsData])

    const makeRequest = useCallback(async () => {
        try {
            const response = await makeOrderRequest(ingredientsData);
            setOrderId(`${response.body.order.number}`);
        } catch (e) {
            console.error(e);
            setOrderId("####");
        }
    }, [ingredientsData]);

    const openModalOrderDetails = useCallback(() => {
        makeRequest();
        setOpenModalOrderDetails(true)
    }, [setOpenModalOrderDetails, makeRequest]);
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
            {isOpenModalOrderDetails
                && <Modal setVisibleModalWindow={setOpenModalOrderDetails} >
                    < OrderDetails orderId={orderId} />
                </Modal>}
        </section>
    )
}

export default OrderConstructorpPanel;