import React from "react";
import BottomSheetModal from "./BottomSheetModal";
import NotificationsModalContent from "./NotificationsModalContent";

const NotificationsModal = ({ visible, onClose, onEnable }) => {
    const handleEnable = () => {
        onEnable();
        onClose();
    };

    const handleNotNow = () => {
        onClose();
    };

    return (
        <BottomSheetModal visible={visible} onClose={onClose} showHandle={true}>
            <NotificationsModalContent
                onEnable={handleEnable}
                onNotNow={handleNotNow}
            />
        </BottomSheetModal>
    );
};

export default NotificationsModal;
