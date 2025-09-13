import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const NewChatButton = ({ onPress }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const styles = getStyles(colors);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.iconContainer}>
                <Ionicons
                    name="chatbubble"
                    size={20}
                    color={colors.accent.lightBlue}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{t("home.newChat")}</Text>
                <Text style={styles.subtitle}>{t("home.newChatSubtitle")}</Text>
            </View>
            <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.text.muted}
            />
        </TouchableOpacity>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.background.card,
            padding: 20,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border.primary,
            marginBottom: 20,
        },
        iconContainer: {
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.background.secondary,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
        },
        textContainer: {
            flex: 1,
        },
        title: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.text.primary,
            marginBottom: 4,
        },
        subtitle: {
            fontSize: 14,
            color: colors.text.secondary,
        },
    });

export default NewChatButton;
