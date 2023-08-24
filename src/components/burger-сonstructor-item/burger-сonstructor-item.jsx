import burgerConstructorItemStyles from "./burger-сonstructor-item.module.css";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import {
    REDUCE_COUNTER
} from "../../services/actions/ingredients";

import {
    REMOVE_CONSTRUCTOR_ITEM,
    CREATE_EMPTY_ITEM,
    SET_DRAG,
    SAVE_START_DRAG_POSITION,
    CLEAR_INDEX_EMPTY_ITEM,
    ADD_CONSTRUCTOR_ITEM,
    CLEAR_START_DRAG_POSITION
} from "../../services/actions/burgerConstructor";
import { useEffect } from "react";

const BurgerConstructorItem = (props) => {
    const { constructorItems, startDragPosition } = useSelector(state => state.burgerConstructor);
    const dispatch = useDispatch();
    const [{ isDrag, initialClientOffset }, dragRef] = useDrag({
        type: "ingredient",
        item: constructorItems[props.index],
        canDrag: props.itemType !== "bun",
        collect: monitor => ({
            isDrag: monitor.isDragging(),
            initialClientOffset: monitor.getInitialClientOffset(),
            clientOffset: monitor.getClientOffset()
        }),
        // TODO: end работает не совсем корректно - не выполняется пока пользователь
        // не произведет какое-нибудь взаимодействаие с gui. Достаточно просто подвинуть
        // курсор. В давнном случае это заметно, если вытащить элемент за пределы блока 
        // со свойством dropadle  
        end: (item, monitor) => {
            if (!monitor.didDrop()) {
                dispatch({ type: CLEAR_INDEX_EMPTY_ITEM });
                dispatch({
                    type: ADD_CONSTRUCTOR_ITEM,
                    image: item.image,
                    price: item.price,
                    id: item.id,
                    name: item.name,
                    itemType: item.itemType,
                    index: startDragPosition
                });
                dispatch({ type: CLEAR_START_DRAG_POSITION });
            }
        }
    }
    );

    useEffect(() => {
        if (isDrag) {
            dispatch({
                type: SAVE_START_DRAG_POSITION,
                index: props.index
            })
            dispatch({
                type: CREATE_EMPTY_ITEM,
                index: props.index,
                yPoint: initialClientOffset.y
            })
            dispatch({
                type: SET_DRAG,
                isDrag: true
            })
        }
    }, [isDrag, dispatch, initialClientOffset, props.index]);

    const handleClose = () => {
        dispatch({
            type: REDUCE_COUNTER,
            id: props.id
        })
        dispatch({
            type: REMOVE_CONSTRUCTOR_ITEM,
            index: props.index
        })
    }

    return <div
        ref={dragRef} className={burgerConstructorItemStyles.wrapperConstructorElement}>
        {props.itemType === "empty"
            ? <div className={burgerConstructorItemStyles.emptyItem}></div>
            : <>
                {!props.isLocked && <DragIcon />}
                <ConstructorElement
                    {...props}
                    handleClose={handleClose}
                />
            </>
        }
    </div>
}

BurgerConstructorItem.propTypes = {
    text: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    isLocked: PropTypes.bool,
    extraClass: PropTypes.string,
    index: PropTypes.number,
    itemType: PropTypes.string,
    id: PropTypes.string
}

export default BurgerConstructorItem;