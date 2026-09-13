import { useEffect } from "react";
import { X } from "lucide-react";

function Modal({
    open,
    onClose,
    title,
    children,
    showClose = true,
    closeOnOverlay = true,
}) {
    useEffect(() => {
        if (!open) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        // Prevent background scrolling
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open) return null;

    const handleOverlayClick = (event) => {
        if (
            closeOnOverlay &&
            event.target === event.currentTarget
        ) {
            onClose();
        }
    };

    return (
        <div
            className="modal-overlay"
            onMouseDown={handleOverlayClick}
        >
            <div
                className="modal-container"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {(title || showClose) && (
                    <div className="modal-header">
                        {title && (
                            <h2
                                id="modal-title"
                                className="modal-title"
                            >
                                {title}
                            </h2>
                        )}

                        {showClose && (
                            <button
                                type="button"
                                className="modal-close"
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                )}

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
