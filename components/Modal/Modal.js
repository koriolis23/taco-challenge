import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from './Modal.module.scss'

function Modal({ show, onClose }) {
    const [isBrowser, setIsBrowser] = useState(false);
    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (show && ref.current && !ref.current.contains(e.target)) {
                onClose()
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }

    }, [show])

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = show ? (
        <div className={styles.modalOverlay}>
            <div className={styles.modal} ref={ref}>
                <div className={styles.modalHeader}>{'Success'}</div>
                <div className={styles.modalBody}>
                    {'Your order has been placed! Leave the rest up to the chefs and our drivers!'}
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.btnOk} onClick={handleCloseClick}>{'Ok'}</button>
                </div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }

}

export default Modal;