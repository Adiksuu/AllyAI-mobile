import React from "react";
import BottomSheetModal from "./BottomSheetModal";
import UpdateModalContent from "./UpdateModalContent";

const UpdateModal = ({ visible, onClose, updateData }) => {
    const handleUpdateNow = () => {
        onClose();
    };

    const handleLater = () => {
        onClose();
    };

    return (
        <BottomSheetModal visible={visible} onClose={onClose} showHandle={true}>
            <UpdateModalContent
                onUpdateNow={handleUpdateNow}
                onLater={handleLater}
                updateData={updateData}
            />
        </BottomSheetModal>
    );
};

export default UpdateModal;