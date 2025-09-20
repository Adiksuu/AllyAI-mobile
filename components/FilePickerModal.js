import React from "react";
import BottomSheetModal from "./BottomSheetModal";
import FilePickerModalContent from "./FilePickerModalContent";

const FilePickerModal = ({
    visible,
    onClose,
    onSelectImage,
    onSelectFile,
    onSelectWebSearch,
    userSettings,
}) => {
    const handleImageSelect = () => {
        onSelectImage();
        onClose();
    };

    const handleFileSelect = () => {
        onSelectFile();
        onClose();
    };

    const handleWebSearchSelect = () => {
        onSelectWebSearch();
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <BottomSheetModal visible={visible} onClose={onClose} showHandle={true}>
            <FilePickerModalContent
                onSelectImage={handleImageSelect}
                onSelectFile={handleFileSelect}
                onSelectWebSearch={handleWebSearchSelect}
                onCancel={handleCancel}
                userSettings={userSettings}
            />
        </BottomSheetModal>
    );
};

export default FilePickerModal;