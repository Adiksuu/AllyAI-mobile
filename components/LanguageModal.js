import React from "react";
import BottomSheetModal from "./BottomSheetModal";
import LanguageModalContent from "./LanguageModalContent";

const LanguageModal = ({
    visible,
    onClose,
    onLanguageSelect,
    currentLanguage,
}) => {
    const handleLanguageSelect = (language) => {
        onLanguageSelect(language);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <BottomSheetModal visible={visible} onClose={onClose} showHandle={true}>
            <LanguageModalContent
                onLanguageSelect={handleLanguageSelect}
                onCancel={handleCancel}
                currentLanguage={currentLanguage}
            />
        </BottomSheetModal>
    );
};

export default LanguageModal;
