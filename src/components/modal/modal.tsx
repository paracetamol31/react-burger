import { useEffect, useCallback, FC, MouseEventHandler } from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useNavigate } from "react-router-dom";

interface IPropsModal {
    children: JSX.Element,
    canClose?: boolean,
    onClose?: Function,
    label?: string,
    pathToBack?: string
}

const modalRoot: HTMLElement | null = document.getElementById("root");

const Modal: FC<IPropsModal> = ({ children, canClose = true, onClose = () => { }, label, pathToBack = "/" }) => {
    const navigane = useNavigate();

    const closeModal = useCallback(() => {
        if (canClose) {
            onClose();
            navigane(pathToBack);
        }
    }, [canClose, onClose, navigane, pathToBack]);

    useEffect(() => {
        const onEscDown = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", onEscDown)
        return (() => window.removeEventListener("keydown", onEscDown))
    }, [closeModal])

    if (!modalRoot) {
        return null;
    }

    const stopPropagationClick: MouseEventHandler<HTMLDivElement> = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

export default Modal;