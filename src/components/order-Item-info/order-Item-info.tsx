import { FC } from "react";

import orderItemInfoStyles from "./order-Item-info.module.css";
import { IOrderParams } from "../../services/reducers/orderHistory";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getTotalCaunt } from "../../utils/totalCaunt";
import { useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";

//TODO: ЗАБИРАТЬ СОСТОЯНИЕ ИЗ СТЕЙТА
export const OrderItemInfo: FC<IOrderParams> = (props) => {
    const { ingredients } = useSelector((state: RootState) => state.ingredients);

    if (!ingredients) {
        return null;
    }

    return (
        <section className={orderItemInfoStyles.wrapper}>
            <span className="text text_type_digits-default mb-10">#{props.number}</span>
            <span className="text text_type_main-medium mb-3">{props.name}</span>
            <span className="text text_type_main-small mb-15">{props.status}</span>
            <span className="text text_type_main-medium mb-6">Состав:</span>
            <div className={`${orderItemInfoStyles.descriptionBlock} mb-10`}>

            </div>
            <div className={`${orderItemInfoStyles.footer}`}>
                <span className="text text_color_inactive text_type_main-default">
                    <FormattedDate date={new Date(props.updatedAt)} />
                </span>
                <div className={`${orderItemInfoStyles.totalCount} text text_type_digits-default`}>
                    {getTotalCaunt(props.ingredients, ingredients)}
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    )
}