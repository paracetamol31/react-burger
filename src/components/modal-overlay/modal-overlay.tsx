import { FC, MouseEventHandler } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

interface IPropsModalOverlay {
    closeModal: MouseEventHandler<HTMLElement>
}

const ModalOverlay: FC<IPropsModalOverlay> = ({ closeModal }) => {
    return (
        <section onClick={closeModal} className={modalOverlayStyles.modalOverlay} />
    )
}

export default ModalOverlay;