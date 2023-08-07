import PropTypes from "prop-types";
import React from "react";

import modalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ setVisibleModalWindow, children }) => {
    return (
        <section onClick={setVisibleModalWindow} className={modalOverlayStyles.modalOverlay}>
            {children}
        </section>
    )
}

ModalOverlay.propTypes = {
    setVisibleModalWindow: PropTypes.func
}

export default ModalOverlay;