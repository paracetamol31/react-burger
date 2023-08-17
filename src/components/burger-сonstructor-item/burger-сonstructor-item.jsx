import burgerConstructorItemStyles from "./burger-сonstructor-item.module.css";
import PropTypes from "prop-types";
import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructorItem = (props) => {
    return <div className={burgerConstructorItemStyles.wrapperConstructorElement}>
        {!props.isLocked && <DragIcon />}
        <ConstructorElement
            {...props}
        />
    </div>
}

BurgerConstructorItem.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    isLocked: PropTypes.bool,
    extraClass: PropTypes.string
}

export default BurgerConstructorItem;