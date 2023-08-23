import burgerConstructorItemStyles from "./burger-сonstructor-item.module.css";
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import { REMOVE_CONSTRUCTOR_ITEM } from "../../services/actions/burgerConstructor";

const BurgerConstructorItem = (props) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch({
            type: REMOVE_CONSTRUCTOR_ITEM,
            index: props.index
        })
    }

    return <div className={burgerConstructorItemStyles.wrapperConstructorElement}>
        {!props.isLocked && <DragIcon />}
        <ConstructorElement
            {...props}
            handleClose={handleClose}
        />
    </div>
}

BurgerConstructorItem.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    isLocked: PropTypes.bool,
    extraClass: PropTypes.string,
    index: PropTypes.number
}

export default BurgerConstructorItem;