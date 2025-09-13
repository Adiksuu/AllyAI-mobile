import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    ImageBackground,
} from "react-native";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const PremiumUpgrade = ({ onPress }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const styles = getStyles(colors);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <ImageBackground
                source={require("../assets/images/upgrade.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{t("premium.title")}</Text>
                        <Text style={styles.subtitle}>
                            {t("premium.subtitle")}
                        </Text>
                        <TouchableOpacity
                            style={styles.upgradeButton}
                            onPress={onPress}
                        >
                            <Text style={styles.upgradeButtonText}>
                                {t("premium.upgradeButton")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
        container: {
            marginBottom: 20,
            borderRadius: 16,
            overflow: "hidden",
        },
        backgroundImage: {
            width: "100%",
            height: 200,
            justifyContent: "center",
        },
        overlay: {
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            justifyContent: "center",
            paddingHorizontal: 20,
        },
        content: {
            flex: 1,
            justifyContent: "center",
        },
        title: {
            fontSize: 28,
            fontWeight: "700",
            color: colors.text.primary,
            marginBottom: 8,
        },
        subtitle: {
            fontSize: 16,
            color: colors.text.primary,
            marginBottom: 24,
            lineHeight: 22,
        },
        upgradeButton: {
            backgroundColor: colors.text.primary,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 25,
            alignSelf: "flex-start",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        upgradeButtonText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.background.primary,
            textAlign: "center",
        },
    });

export default PremiumUpgrade;
