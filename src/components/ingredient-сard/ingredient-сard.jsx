import React from "react";
import PropTypes from "prop-types";

import {
    CurrencyIcon,
    Counter
} from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientСardStyles from "./ingredient-сard.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const IngredientСard = (props) => {
    const [isOpenModal, setOpenModal] = React.useState(false);

    const openModal = React.useCallback(() => {
        setOpenModal(true)
    }, [setOpenModal]);

    return <div onClick={openModal} className={`${ingredientСardStyles.card} pl-4 pr-4`}>
        {/* TODO: Значение count временно захардкожено*/}
        <Counter count={1} size="default" extraClass="m-1" />
        <img src={props.image} alt="Картина ингредиента" />
        <div className={`${ingredientСardStyles.priceFrame} mt-1 mb-1`}>
            <span className="mr-2 text text_type_main-medium">{props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
        <span className={`${ingredientСardStyles.ingredientName} text text_type_main-default`}>{props.name}</span>
        {/* TODO: Принял во внимание замечания по улучшению работы с модальными окнами, проведу реффакторинг в ветке sprint-2/step-2 */}
        {isOpenModal
            && <Modal setVisibleModalWindow={setOpenModal} label={"Детали ингредиента"}>
                <IngredientDetails {...props} />
            </Modal>}
    </div>
}

IngredientСard.propTypes = {
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string
}

export default IngredientСard;