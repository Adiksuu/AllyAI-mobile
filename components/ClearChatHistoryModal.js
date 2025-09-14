import React from "react";
import BottomSheetModal from "./BottomSheetModal";
import ClearChatHistoryModalContent from "./ClearChatHistoryModalContent";

const ClearChatHistoryModal = ({ visible, onClose, onConfirm }) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <BottomSheetModal visible={visible} onClose={onClose} showHandle={true}>
            <ClearChatHistoryModalContent
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </BottomSheetModal>
    );
};

export default ClearChatHistoryModal;