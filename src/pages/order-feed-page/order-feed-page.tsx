import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hocks";
import { wcConnectionStart } from "../../services/actions/orderFeed";
import { setCurrentMenuHeader, orderFeed } from "../../services/actions/header";
import { WSPathOrdersAll } from "../../services/middleware";
import { RootState } from "../../services/types";

export const OrderFeedPage: FC = () => {
    const dispatch = useDispatch();
    const { orderData } = useSelector((state: RootState) => state.orderFeed);
    useEffect(() => {
        dispatch(setCurrentMenuHeader({ currentMenuItem: orderFeed }));
        dispatch(wcConnectionStart({ url: WSPathOrdersAll }));
    }, [dispatch])
    return (
        orderData
            ? <>{JSON.stringify(orderData)}</>
            : null
    );
}