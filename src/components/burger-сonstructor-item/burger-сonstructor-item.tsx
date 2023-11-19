import burgerConstructorItemStyles from "./burger-сonstructor-item.module.css";
import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DragSourceMonitor, XYCoord, useDrag } from "react-dnd";

import {
    reduceCounter
} from "../../services/actions/ingredients";

import {
    removeConstructorItem,
    createEmptyItem,
    setDrag,
    clearIndexEmptyItem,
    insertConstructorItem,
    IInsertConstructorItemPayload
} from "../../services/actions/burgerConstructor";
import { FC, useEffect } from "react";
import { useSelector } from "../../services/hooks";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

interface IPropsBurgerConstructorItem {
    itemType: string,
    id: string,
    price: number,
    text: string,
    thumbnail: string,
    type?: "top" | "bottom",
    isLocked?: boolean,
    extraClass?: string,
    index?: number,
}

export interface ICollectedProps {
    isDrag: boolean,
    initialClientOffset: XYCoord | null
}


const BurgerConstructorItem: FC<IPropsBurgerConstructorItem> = (props) => {
    const { constructorItems } = useSelector(state => state.burgerConstructor);
    const dispatch = useDispatch();
    const [{ isDrag, initialClientOffset }, dragRef] = useDrag<IInsertConstructorItemPayload, unknown, ICollectedProps>({
        type: "ingredient",
        item: props.index !== undefined && props.index >= 0 ? constructorItems[props.index] : undefined,
        canDrag: props.itemType !== "bun" && props.index !== undefined && props.index >= 0,
        collect: monitor => ({
            isDrag: monitor.isDragging(),
            initialClientOffset: monitor.getInitialClientOffset(),
            clientOffset: monitor.getClientOffset()
        }),
        // TODO: end работает не совсем корректно - не выполняется пока пользователь
        // не произведет какое-нибудь взаимодействаие с gui. Достаточно просто подвинуть
        // курсор. В давнном случае это заметно, если вытащить элемент за пределы блока 
        // со свойством dropadle  
        end: (item: IInsertConstructorItemPayload, monitor: DragSourceMonitor<IInsertConstructorItemPayload, unknown>) => {
            if (!monitor.didDrop()) {
                dispatch(clearIndexEmptyItem());
                dispatch(insertConstructorItem({
                    image: item.image,
                    price: item.price,
                    id: item.id,
                    name: item.name,
                    itemType: item.itemType,
                    index: props.index ?? null
                }));
            }
        }
    });

    useEffect(() => {
        if (isDrag && initialClientOffset && props.index !== undefined) {
            dispatch(createEmptyItem({
                index: props.index,
                yPoint: initialClientOffset.y
            }))

            dispatch(setDrag({
                isDrag: true
            }))
        }
    }, [isDrag, dispatch, initialClientOffset, props.index]);

    const handleClose = () => {
        dispatch(reduceCounter({
            id: props.id
        }))
        if (props.index !== undefined) {
            dispatch(removeConstructorItem({
                index: props.index
            }))
        }
    }

    return <div
        ref={dragRef} className={burgerConstructorItemStyles.wrapperConstructorElement}>
        {props.itemType === "empty"
            ? <div className={burgerConstructorItemStyles.emptyItem}></div>
            : <>
                {!props.isLocked && <DragIcon type="primary" />}
                <ConstructorElement
                    type={props.type}
                    thumbnail={props.thumbnail}
                    text={props.text}
                    price={props.price}
                    handleClose={handleClose}
                    isLocked={props.isLocked}
                    extraClass={props.extraClass}
                />
            </>
        }
    </div>
}

export default BurgerConstructorItem;