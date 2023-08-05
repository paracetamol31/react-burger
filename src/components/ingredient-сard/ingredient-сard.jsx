import ingredientСardStyles from "./ingredient-сard.module.css";
import {
    CurrencyIcon,
    Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const IngredientСard = (props) => {
    return <div className={`${ingredientСardStyles.card} pl-4 pr-4`}>
        {/* TODO: Значение count временно захардкожено*/}
        <Counter count={1} size="default" extraClass="m-1" />
        <img src={props.image} alt="Картина ингредиента" />
        <div className={`${ingredientСardStyles.priceFrame} mt-1 mb-1`}>
            <span className="mr-2 text text_type_main-medium">{props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
        <span className={`${ingredientСardStyles.ingredientName} text text_type_main-default`}>{props.name}</span>
    </div>
}

IngredientСard.propTypes = {
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string
}

export default IngredientСard;