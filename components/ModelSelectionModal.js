import React from "react";
import BottomSheetModal from "./BottomSheetModal";
import ModelSelectionModalContent from "./ModelSelectionModalContent";

const ModelSelectionModal = ({
    visible,
    onClose,
    onModelSelect,
    currentModel,
}) => {
    const handleModelSelect = (model) => {
        onModelSelect(model);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <BottomSheetModal visible={visible} onClose={onClose} showHandle={true}>
            <ModelSelectionModalContent
                onModelSelect={handleModelSelect}
                onCancel={handleCancel}
                currentModel={currentModel}
            />
        </BottomSheetModal>
    );
};

export default ModelSelectionModal;