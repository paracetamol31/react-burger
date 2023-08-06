import PropTypes from "prop-types";
import React from "react";

import modalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ setVisibleModalWindow, children }) => {
    const closeModal = React.useCallback((event) => {
        event.stopPropagation();
        setVisibleModalWindow(false);
    }, [setVisibleModalWindow])

    const onEscDown = React.useCallback((event) => {
        if (event.code === "Escape") {
            closeModal(event);
        }
    }, [closeModal])

    React.useEffect(() => {
        window.addEventListener("keydown", onEscDown)
        return (() => window.removeEventListener("keydown", onEscDown))
    }, [onEscDown])

    return (
        <section onClick={closeModal} className={modalOverlayStyles.modalOverlay}>
            {children}
        </section>
    )
}

ModalOverlay.propTypes = {
    setVisibleModalWindow: PropTypes.func
}

export default ModalOverlay;