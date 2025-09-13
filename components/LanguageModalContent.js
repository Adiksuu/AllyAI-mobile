import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../api/theme/colors";
import { useTranslation } from "../contexts/TranslationContext";

const LanguageModalContent = ({
    onLanguageSelect,
    onCancel,
    currentLanguage,
}) => {
    const { t, getLanguages } = useTranslation();
    const languages = getLanguages();

    const handleLanguagePress = (language) => {
        onLanguageSelect(language);
    };

    return (
        <View style={styles.content}>
            <Text style={styles.introducingLabel}>
                {t("languageModal.selectLanguage")}
            </Text>
            <Text style={styles.title}>{t("languageModal.title")}</Text>

            <ScrollView
                style={styles.languagesList}
                showsVerticalScrollIndicator={false}
            >
                {languages.map((language, index) => (
                    <TouchableOpacity
                        key={language.code}
                        style={[
                            styles.languageItem,
                            currentLanguage === language.code &&
                                styles.selectedLanguageItem,
                        ]}
                        onPress={() => handleLanguagePress(language)}
                    >
                        <View style={styles.languageInfo}>
                            <Text style={styles.flag}>{language.flag}</Text>
                            <Text
                                style={[
                                    styles.languageName,
                                    currentLanguage === language.code &&
                                        styles.selectedLanguageName,
                                ]}
                            >
                                {t(`languageModal.languages.${language.code}`)}
                            </Text>
                        </View>
                        {currentLanguage === language.code && (
                            <Ionicons
                                name="checkmark-circle"
                                size={24}
                                color={colors.accent.lightBlue}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
                >
                    <Text style={styles.cancelButtonText}>
                        {t("common.cancel")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 24,
        maxHeight: 500,
    },
    introducingLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.text.secondary,
        textAlign: "center",
        letterSpacing: 1,
        marginBottom: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.text.primary,
        textAlign: "center",
        marginBottom: 24,
    },
    languagesList: {
        marginBottom: 24,
        maxHeight: 300,
    },
    languageItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 8,
        borderRadius: 12,
        backgroundColor: colors.background.secondary,
        borderWidth: 1,
        borderColor: "transparent",
    },
    selectedLanguageItem: {
        backgroundColor: colors.background.card,
        borderColor: colors.accent.lightBlue,
    },
    languageInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    flag: {
        fontSize: 24,
        marginRight: 16,
    },
    languageName: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.text.primary,
    },
    selectedLanguageName: {
        color: colors.accent.lightBlue,
        fontWeight: "600",
    },
    buttonsContainer: {
        gap: 12,
    },
    cancelButton: {
        alignItems: "center",
        paddingVertical: 12,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.text.secondary,
    },
});

export default LanguageModalContent;
