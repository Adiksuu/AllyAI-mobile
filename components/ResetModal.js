import React from "react";
import BottomSheetModal from "./BottomSheetModal";
import ResetModalContent from "./ResetModalContent";

const ResetModal = ({ visible, onClose, onConfirm }) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <BottomSheetModal visible={visible} onClose={onClose} showHandle={true}>
            <ResetModalContent
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </BottomSheetModal>
    );
};

export default ResetModal;