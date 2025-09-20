import React from "react";
import BottomSheetModal from "./BottomSheetModal";
import FilePickerModalContent from "./FilePickerModalContent";

const FilePickerModal = ({
    visible,
    onClose,
    onSelectImage,
    onSelectFile,
}) => {
    const handleImageSelect = () => {
        onSelectImage();
        onClose();
    };

    const handleFileSelect = () => {
        onSelectFile();
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
                onCancel={handleCancel}
            />
        </BottomSheetModal>
    );
};

export default FilePickerModal;