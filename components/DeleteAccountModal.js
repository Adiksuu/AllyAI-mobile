import React from "react";
import BottomSheetModal from "./BottomSheetModal";
import DeleteAccountModalContent from "./DeleteAccountModalContent";

const DeleteAccountModal = ({ visible, onClose, onConfirm }) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <BottomSheetModal visible={visible} onClose={onClose} showHandle={true}>
            <DeleteAccountModalContent
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </BottomSheetModal>
    );
};

export default DeleteAccountModal;