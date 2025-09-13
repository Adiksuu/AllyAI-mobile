import React from "react";
import BottomSheetModal from "./BottomSheetModal";
import ThemeModalContent from "./ThemeModalContent";

const ThemeModal = ({ visible, onClose, onThemeSelect, currentTheme }) => {
    const handleThemeSelect = (theme) => {
        onThemeSelect(theme);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <BottomSheetModal visible={visible} onClose={onClose} showHandle={true}>
            <ThemeModalContent
                onThemeSelect={handleThemeSelect}
                onCancel={handleCancel}
                currentTheme={currentTheme}
            />
        </BottomSheetModal>
    );
};

export default ThemeModal;
