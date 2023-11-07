import { FC, useCallback } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useNavigate } from "react-router-dom";

import orderFeedCardStyles from "./order-feed-card.module.css";
import { ImagesRow } from "../images-row/images-row";
import { useSelector } from "../../services/hocks";
import { RootState } from "../../services/types";
import { getTotalCaunt } from "../../utils/totalCaunt";
import { IOrderParams } from "../../services/reducers/orderHistory";

export interface OrderFeedCardProps {
    orderInfo: IOrderParams
    needShowStatus?: boolean
}

export const OrderFeedCard: FC<OrderFeedCardProps> = (props) => {
    const { ingredients } = useSelector((state: RootState) => state.ingredients);
    const navigate = useNavigate();
    const location = useLocation();

    const images: Array<string> = [];

    for (const ingredientId of props.orderInfo.ingredients) {
        const ingredient = ingredients?.get(ingredientId);

        if (!ingredient) {
            continue;
        }

        images.push(ingredient.image_mobile);
    }

    const onClickOnCard = useCallback(() => {
        navigate(`${props.orderInfo.number}`, { state: { background: location } });
    }, [location, navigate, props.orderInfo.number])

    return (
        ingredients
            ? <section onClick={onClickOnCard} className={`${orderFeedCardStyles.orderCard} pl-4 pr-4 pt-6 pb-6`}>
                <div className={`${orderFeedCardStyles.header} text text_type_digits-default mb-6`}>
                    <span>#{props.orderInfo.number}</span>
                    <span className="text text_color_inactive text_type_main-default">
                        <FormattedDate date={new Date(props.orderInfo.updatedAt)} />
                    </span>
                </div>
                <span className="text text_type_main-medium">{props.orderInfo.name}</span>
                {
                    props.needShowStatus
                    && <span
                        className={`${props.orderInfo.status !== "done" ? orderFeedCardStyles.satusPanding : ""} text text_type_digits-default mt-2`}
                    >
                        {props.orderInfo.status}
                    </span>
                }
                <div className={`${orderFeedCardStyles.imagesRowWrapper} mt-6 mb-6`}>
                    <ImagesRow images={images} />
                    <div className={`${orderFeedCardStyles.totalCount} text text_type_digits-default`}>
                        {getTotalCaunt(props.orderInfo.ingredients, ingredients)}
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </section>
            : null
    );
}