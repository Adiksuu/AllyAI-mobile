import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../api/theme/colors";

const ResetAISettings = () => {
    const [isResetting, setIsResetting] = useState(false);

    const handleResetSettings = () => {
        Alert.alert(
            "Reset AI Settings",
            "Are you sure you want to reset all AI settings to their default values? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Reset",
                    style: "destructive",
                    onPress: () => {
                        setIsResetting(true);
                        // TODO: Implement reset functionality
                        setTimeout(() => {
                            setIsResetting(false);
                            console.log("AI settings reset to defaults");
                        }, 2000);
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="refresh-outline"
                        size={24}
                        color={colors.status.warning}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Reset Settings</Text>
                    <Text style={styles.subtitle}>
                        Restore all AI settings to defaults
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={[
                    styles.resetButton,
                    isResetting && styles.resetButtonDisabled,
                ]}
                onPress={handleResetSettings}
                disabled={isResetting}
            >
                <Ionicons
                    name={isResetting ? "hourglass-outline" : "refresh-outline"}
                    size={20}
                    color={
                        isResetting ? colors.text.muted : colors.status.warning
                    }
                />
                <Text
                    style={[
                        styles.resetButtonText,
                        isResetting && styles.resetButtonTextDisabled,
                    ]}
                >
                    {isResetting ? "Resetting..." : "Reset to Defaults"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.card,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border.primary,
        marginBottom: 12,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.background.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 14,
        color: colors.text.secondary,
    },
    resetButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.status.warning,
        backgroundColor: colors.background.secondary,
    },
    resetButtonDisabled: {
        opacity: 0.6,
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.status.warning,
        marginLeft: 8,
    },
    resetButtonTextDisabled: {
        color: colors.text.muted,
    },
});

export default ResetAISettings;
