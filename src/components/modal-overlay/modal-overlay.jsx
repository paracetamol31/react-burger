import PropTypes from "prop-types";
import React from "react";

import modalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ closeModal, children }) => {
    return (
        <section onClick={closeModal} className={modalOverlayStyles.modalOverlay}>
            {children}
        </section>
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func
}

export default ModalOverlay;