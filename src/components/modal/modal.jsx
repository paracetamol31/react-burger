import PropTypes from "prop-types";
import { useEffect, useCallback } from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("root");

const Modal = ({ label, canClose = true, children }) => {
    const navigane = useNavigate();

    const closeModal = useCallback(() => {
        if (canClose) {
            navigane("/");
        }
    }, [navigane, canClose]);

    useEffect(() => {
        const onEscDown = (event) => {
            if (event.code === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", onEscDown)
        return (() => window.removeEventListener("keydown", onEscDown))
    }, [closeModal])

    const stopPropagationClick = (event) => {
        event.stopPropagation();
    }

    return ReactDOM.createPortal(
        <section className={modalStyles.modalContainer}>
            <div onClick={stopPropagationClick} className={`${modalStyles.modalWindow} pl-10 pt-10 pr-10 pb-15`}>
                <header className={modalStyles.header}>
                    <span className={`${modalStyles.label} text text text_type_main-large`}>{label}</span>
                    <CloseIcon onClick={closeModal} type="primary" />
                </header>
                <main className={modalStyles.main}>
                    {children}
                </main>
            </div>
            <ModalOverlay closeModal={closeModal} />
        </section>,
        modalRoot
    )
}

Modal.propTypes = {
    canClose: PropTypes.bool,
    label: PropTypes.string
}

export default Modal;