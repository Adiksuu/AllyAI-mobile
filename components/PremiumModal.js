import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import BottomSheetModal from "./BottomSheetModal";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const PremiumModal = ({ visible, onClose, currentPlan = "Free" }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const styles = getStyles(colors);

    return (
        <BottomSheetModal visible={visible} onClose={onClose} showHandle={true}>
            <View style={styles.content}>
                <Text style={styles.introducingLabel}>
                    {t("premiumModal.intro")}
                </Text>
                <Text style={styles.title}>{t("premiumModal.title")}</Text>
                <View style={styles.currentPlanCard}>
                    <Text style={styles.currentPlanLabel}>
                        {t("premiumModal.currentPlan")}
                    </Text>
                    <Text style={styles.currentPlanName}>
                        {t(
                            `premiumModal.plans.${currentPlan.toLowerCase()}.name`
                        )}
                    </Text>
                    <Text style={styles.currentPlanDesc}>
                        {t(
                            `premiumModal.plans.${currentPlan.toLowerCase()}.desc`
                        )}
                    </Text>
                </View>
                <ImageBackground
                    source={require("../assets/images/upgrade.png")}
                    style={styles.premiumCardBg}
                    imageStyle={{ borderRadius: 16 }}
                    resizeMode="cover"
                >
                    <View style={styles.premiumCardOverlay}>
                        <Text style={styles.premiumPlanLabel}>
                            {t("premiumModal.premiumPlan")}
                        </Text>
                        <Text style={styles.premiumPlanName}>
                            {t("premiumModal.plans.premium.name")}
                        </Text>
                        <Text style={styles.premiumPlanDesc}>
                            {t("premiumModal.plans.premium.desc")}
                        </Text>
                        <Text style={styles.premiumPrice}>
                            {t("premiumModal.price")}
                        </Text>
                        <TouchableOpacity style={styles.upgradeButton}>
                            <Text style={styles.upgradeButtonText}>
                                {t("premiumModal.upgradeButton")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </BottomSheetModal>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
        content: {
            paddingHorizontal: 24,
            paddingBottom: 24,
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
        currentPlanCard: {
            backgroundColor: colors.background.card,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.border.primary,
        },
        currentPlanLabel: {
            fontSize: 14,
            color: colors.text.secondary,
            marginBottom: 4,
        },
        currentPlanName: {
            fontSize: 20,
            fontWeight: "700",
            color: colors.text.primary,
            marginBottom: 4,
        },
        currentPlanDesc: {
            fontSize: 14,
            color: colors.text.secondary,
            textAlign: "center",
        },
        premiumCardBg: {
            width: "100%",
            minHeight: 250,
            marginBottom: 24,
            borderRadius: 16,
            overflow: "hidden",
            justifyContent: "center",
        },
        premiumCardOverlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
        },
        premiumPlanLabel: {
            fontSize: 14,
            color: colors.text.secondary,
            marginBottom: 4,
        },
        premiumPlanName: {
            fontSize: 24,
            fontWeight: "700",
            color: colors.text.primary,
            marginBottom: 4,
        },
        premiumPlanDesc: {
            fontSize: 16,
            color: colors.text.primary,
            textAlign: "center",
            marginBottom: 12,
        },
        premiumPrice: {
            fontSize: 22,
            fontWeight: "bold",
            color: colors.accent.lightBlue,
            marginBottom: 16,
        },
        upgradeButton: {
            backgroundColor: colors.text.primary,
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 25,
            alignSelf: "center",
        },
        upgradeButtonText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.background.primary,
            textAlign: "center",
        },

    });

export default PremiumModal;
