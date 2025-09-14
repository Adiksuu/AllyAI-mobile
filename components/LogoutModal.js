import React from "react";
import BottomSheetModal from "./BottomSheetModal";
import LogoutModalContent from "./LogoutModalContent";

const LogoutModal = ({ visible, onClose, onConfirm }) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <BottomSheetModal visible={visible} onClose={onClose} showHandle={true}>
            <LogoutModalContent
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </BottomSheetModal>
    );
};

export default LogoutModal;