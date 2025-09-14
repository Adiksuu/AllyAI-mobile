import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const SocialLoginButtons = ({ onGooglePress, onFacebookPress }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.socialButton, styles.googleButton]}
                    onPress={onGooglePress}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name="logo-google"
                        size={20}
                        color={colors.text.primary}
                    />
                    <Text style={[styles.socialButtonText, styles.googleText]}>
                        {t("auth.google")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.socialButton, styles.facebookButton]}
                    onPress={onFacebookPress}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name="logo-facebook"
                        size={20}
                        color="#ffffff"
                    />
                    <Text style={[styles.socialButtonText, styles.facebookText]}>
                        {t("auth.facebook")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
        container: {
            marginVertical: 20,
        },
        orText: {
            textAlign: "center",
            fontSize: 14,
            color: colors.text.secondary,
            marginBottom: 16,
        },
        buttonContainer: {
            gap: 12,
        },
        socialButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
        },
        googleButton: {
            backgroundColor: colors.background.secondary,
        },
        facebookButton: {
            backgroundColor: "#1877F2",
            borderColor: "#1877F2",
        },
        socialButtonText: {
            fontSize: 16,
            fontWeight: "600",
            marginLeft: 12,
        },
        googleText: {
            color: colors.text.primary,
        },
        facebookText: {
            color: "#ffffff",
        },
    });

export default SocialLoginButtons;