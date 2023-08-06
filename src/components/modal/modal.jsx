import PropTypes from "prop-types";
import React from "react";

import {
    CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";

const Modal = ({ setVisibleModalWindow, label, children }) => {
    const closeModal = React.useCallback((event) => {
        event.stopPropagation();
        setVisibleModalWindow(false);
    }, [setVisibleModalWindow])

    const stopPropagationClick = (event) => {
        event.stopPropagation();
    }

    return (
        <section onClick={stopPropagationClick} className={`${modalStyles.modal} pl-10 pt-10 pr-10 pb-15`}>
            <header className={modalStyles.header}>
                <span className={`${modalStyles.label} text text text_type_main-large`}>{label}</span>
                <CloseIcon onClick={closeModal} type="primary" />
            </header>
            <main className={modalStyles.main}>
                {children}
            </main>
        </section>
    )
}

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string
}

export default Modal;