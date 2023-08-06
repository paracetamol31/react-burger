import PropTypes from "prop-types";
import ReactDOM from 'react-dom';

import ModalOverlay from "../modal-overlay/modal-overlay"
import Modal from "../modal/modal";
import modalPortalStyles from "./modal-portal.module.css";

const modalRoot = document.getElementById("root");

const ModalPortal = ({ label, setVisibleModalWindow, children }) => {
    return ReactDOM.createPortal(
        <section className={modalPortalStyles.modalContainer}>
            <ModalOverlay setVisibleModalWindow={setVisibleModalWindow}>
                <Modal label={label} setVisibleModalWindow={setVisibleModalWindow}>
                    {children}
                </Modal>
            </ModalOverlay>
        </section>,
        modalRoot
    )
}

ModalPortal.propTypes = {
    label: PropTypes.string,
    setVisibleModalWindow: PropTypes.func
}

export default ModalPortal;